import type { GalleryData } from '../../types';
import { optimizeImage } from '@shared/media';
import { getFile, loadJsonFromGh, putBinary, putJson } from '../github';
import { isLocalDevMode, saveLocalGallery } from '../localData';
import { publicUrl } from '../../lib/assets';
import { openPhotoPicker } from './PhotoPicker';

export interface GalleryEditorState {
  gallery: GalleryData;
  gallerySha: string;
  pendingImages: Map<string, { blob: Blob; path: string }>;
}

export async function loadGalleryState(): Promise<GalleryEditorState> {
  if (isLocalDevMode()) {
    const res = await fetch(publicUrl('/data/gallery.json'));
    const data = (await res.json()) as GalleryData;
    return { gallery: data, gallerySha: 'local', pendingImages: new Map() };
  }
  const { data, sha } = await loadJsonFromGh<GalleryData>('data/gallery.json');
  return { gallery: data, gallerySha: sha, pendingImages: new Map() };
}

export function renderSignatureEditor(
  state: GalleryEditorState,
  mediaPool: string[],
  onChange: () => void,
): HTMLElement {
  const el = document.createElement('div');
  el.className = 'admin-section';

  const render = () => {
    const items = state.gallery.signature.map((path, index) => {
      const pending = state.pendingImages.has(path);
      const imgSrc = pending ? '' : publicUrl(path);
      const img = pending
        ? `<img src="" alt="" class="admin-sig-item__thumb" data-pending-path="${escapeAttr(path)}" />`
        : `<img src="${imgSrc}" alt="" class="admin-sig-item__thumb" />`;
      const pendingLabel = pending ? ' (새 사진)' : '';

      return `
        <div class="admin-sig-item" data-index="${index}">
          <span class="admin-sig-item__num">${index + 1}</span>
          ${img}
          <div class="admin-sig-item__actions">
            <button type="button" class="admin-btn admin-btn--small" data-photo-sig data-index="${index}">
              사진 바꾸기${pendingLabel}
            </button>
            <button type="button" class="admin-btn admin-btn--small admin-btn--ghost" data-move="up" data-index="${index}"
              ${index === 0 ? 'disabled' : ''}>↑</button>
            <button type="button" class="admin-btn admin-btn--small admin-btn--ghost" data-move="down" data-index="${index}"
              ${index === state.gallery.signature.length - 1 ? 'disabled' : ''}>↓</button>
            <button type="button" class="admin-btn admin-btn--danger admin-btn--small" data-delete-sig data-index="${index}">삭제</button>
          </div>
        </div>
      `;
    }).join('');

    el.innerHTML = `
      <h2 class="admin-section__title">시그니처</h2>
      <p class="admin-note">홈페이지 상단 가로 스크롤 영역에 표시되는 사진입니다.</p>
      <div class="admin-sig-list">${items}</div>
      <button type="button" class="admin-btn admin-btn--ghost" data-add-sig>+ 이미지 추가</button>
    `;

    el.querySelectorAll<HTMLImageElement>('[data-pending-path]').forEach((img) => {
      const path = img.dataset.pendingPath!;
      const p = state.pendingImages.get(path);
      if (p) img.src = URL.createObjectURL(p.blob);
    });

    el.querySelectorAll<HTMLButtonElement>('[data-photo-sig]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index!, 10);
        const oldPath = state.gallery.signature[index]!;
        openPhotoPicker({
          images: mediaPool,
          onSelectExisting: (path) => {
            state.pendingImages.delete(oldPath);
            state.gallery.signature[index] = path;
            onChange();
            render();
          },
          onSelectFile: async (file) => {
            btn.textContent = '최적화 중…';
            try {
              const { blob } = await optimizeImage(file);
              const path = `media/sig-${Date.now()}.webp`;
              state.pendingImages.delete(oldPath);
              state.pendingImages.set(path, { blob, path });
              state.gallery.signature[index] = path;
              onChange();
              render();
            } catch (e) {
              alert(e instanceof Error ? e.message : '이미지 변환 실패');
              btn.textContent = '사진 바꾸기';
            }
          },
        });
      });
    });

    el.querySelectorAll<HTMLButtonElement>('[data-delete-sig]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index!, 10);
        if (state.gallery.signature.length <= 1) {
          alert('시그니처는 최소 1장이 필요합니다.');
          return;
        }
        if (!confirm('이 사진을 시그니처에서 제거할까요?')) return;
        const path = state.gallery.signature[index]!;
        state.pendingImages.delete(path);
        state.gallery.signature.splice(index, 1);
        onChange();
        render();
      });
    });

    el.querySelectorAll<HTMLButtonElement>('[data-move]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index!, 10);
        const dir = btn.dataset.move as 'up' | 'down';
        const target = dir === 'up' ? index - 1 : index + 1;
        if (target < 0 || target >= state.gallery.signature.length) return;
        const arr = state.gallery.signature;
        [arr[index], arr[target]] = [arr[target]!, arr[index]!];
        onChange();
        render();
      });
    });

    el.querySelector('[data-add-sig]')?.addEventListener('click', () => {
      const fallback = mediaPool.find((p) => !state.gallery.signature.includes(p)) ?? mediaPool[0];
      if (!fallback) {
        alert('추가할 이미지가 없습니다. 새 사진을 업로드해 주세요.');
        return;
      }
      state.gallery.signature.push(fallback);
      onChange();
      render();
    });
  };

  render();
  return el;
}

function escapeAttr(s: string): string {
  return s.replace(/"/g, '&quot;');
}

export async function saveGalleryState(state: GalleryEditorState): Promise<void> {
  if (isLocalDevMode()) {
    saveLocalGallery(state.gallery);
    state.pendingImages.clear();
    return;
  }
  for (const [, { blob, path }] of state.pendingImages) {
    const existing = await getFile(path);
    await putBinary(path, blob, existing?.sha);
  }
  await putJson('data/gallery.json', state.gallery, state.gallerySha);
  const { sha } = await loadJsonFromGh<GalleryData>('data/gallery.json');
  state.gallerySha = sha;
  state.pendingImages.clear();
}

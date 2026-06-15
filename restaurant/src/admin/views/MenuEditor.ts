import type { MenuCategory, MenuData, MenuItem } from '../../types';
import { formatPrice } from '../../types';
import { optimizeImage } from '@shared/media';
import { getFile, loadJsonFromGh, putBinary, putJson } from '../github';
import { isLocalDevMode, saveLocalMenu } from '../localData';
import { publicUrl } from '../../lib/assets';

export interface MenuEditorState {
  menu: MenuData;
  menuSha: string;
  pendingImages: Map<string, { blob: Blob; path: string }>;
}

export async function loadMenuState(): Promise<MenuEditorState> {
  if (isLocalDevMode()) {
    const res = await fetch(publicUrl('/data/menu.json'));
    const data = (await res.json()) as MenuData;
    return { menu: data, menuSha: 'local', pendingImages: new Map() };
  }
  const { data, sha } = await loadJsonFromGh<MenuData>('data/menu.json');
  return { menu: data, menuSha: sha, pendingImages: new Map() };
}

export function renderMenuEditor(
  state: MenuEditorState,
  onChange: () => void,
): HTMLElement {
  const el = document.createElement('div');
  el.className = 'admin-section';

  const render = () => {
    const ts = state.menu.tableSetting;
    let html = `
      <h2 class="admin-section__title">메뉴 관리</h2>
      <p class="admin-note">${ts.label}: 대인 ${formatPrice(ts.adult)} / 소인 ${formatPrice(ts.child)}</p>
    `;

    for (const cat of state.menu.categories) {
      html += `
        <details class="admin-accordion" open>
          <summary class="admin-accordion__title">${cat.name}</summary>
          <div class="admin-accordion__body">
      `;
      for (const item of cat.items) {
        html += renderItem(cat, item, state);
      }
      html += `
            <button type="button" class="admin-btn admin-btn--ghost" data-add="${cat.id}">+ 메뉴 추가</button>
          </div>
        </details>
      `;
    }

    el.innerHTML = html;

    el.querySelectorAll<HTMLInputElement>('[data-field]').forEach((input) => {
      input.addEventListener('input', () => {
        const { catId, itemId, field } = input.dataset;
        const item = findItem(state.menu, catId!, itemId!);
        if (!item) return;
        if (field === 'name') item.name = input.value;
        if (field === 'price') item.price = parseInt(input.value, 10) || 0;
        onChange();
      });
    });

    el.querySelectorAll<HTMLButtonElement>('[data-delete]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const { catId, itemId } = btn.dataset;
        if (!confirm('이 메뉴를 삭제할까요?')) return;
        const cat = state.menu.categories.find((c) => c.id === catId);
        if (cat) cat.items = cat.items.filter((i) => i.id !== itemId);
        onChange();
        render();
      });
    });

    el.querySelectorAll<HTMLButtonElement>('[data-photo]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const { catId, itemId } = btn.dataset;
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.capture = 'environment';
        input.addEventListener('change', async () => {
          const file = input.files?.[0];
          if (!file) return;
          const item = findItem(state.menu, catId!, itemId!);
          if (!item) return;
          btn.textContent = '최적화 중…';
          try {
            const { blob } = await optimizeImage(file);
            const path = `media/menu-${itemId}-${Date.now()}.webp`;
            state.pendingImages.set(itemId!, { blob, path });
            item.image = path;
            onChange();
            render();
          } catch (e) {
            alert(e instanceof Error ? e.message : '이미지 변환 실패');
            btn.textContent = '사진 바꾸기';
          }
        });
        input.click();
      });
    });

    el.querySelectorAll<HTMLButtonElement>('[data-add]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const catId = btn.dataset.add!;
        const cat = state.menu.categories.find((c) => c.id === catId);
        if (!cat) return;
        const id = `item-${Date.now()}`;
        cat.items.push({ id, name: '새 메뉴', price: 0, image: null });
        onChange();
        render();
      });
    });

    setPendingPreviews();
  };

  const setPendingPreviews = () => {
    el.querySelectorAll<HTMLImageElement>('[data-pending]').forEach((img) => {
      const id = img.dataset.pending!;
      const p = state.pendingImages.get(id);
      if (p) img.src = URL.createObjectURL(p.blob);
    });
  };

  render();
  return el;
}

function renderItem(cat: MenuCategory, item: MenuItem, state: MenuEditorState): string {
  const pending = state.pendingImages.get(item.id);
  const imgSrc = pending ? '' : (item.image ? publicUrl(item.image) : '');
  const img = pending
    ? `<img src="" alt="" class="admin-item__thumb" data-pending="${item.id}" />`
    : item.image
      ? `<img src="${imgSrc}" alt="" class="admin-item__thumb" />`
      : '<div class="admin-item__thumb admin-item__thumb--empty">사진 없음</div>';
  const pendingLabel = pending ? ' (새 사진)' : '';

  return `
    <div class="admin-item">
      ${img}
      <div class="admin-item__fields">
        <input class="admin-input" data-field="name" data-cat-id="${cat.id}" data-item-id="${item.id}"
          value="${escapeAttr(item.name)}" placeholder="메뉴명" />
        <input class="admin-input" type="number" inputmode="numeric" data-field="price"
          data-cat-id="${cat.id}" data-item-id="${item.id}" value="${item.price}" placeholder="가격" />
        <button type="button" class="admin-btn admin-btn--small" data-photo data-cat-id="${cat.id}" data-item-id="${item.id}">
          사진 바꾸기${pendingLabel}
        </button>
        <button type="button" class="admin-btn admin-btn--danger admin-btn--small"
          data-delete data-cat-id="${cat.id}" data-item-id="${item.id}">삭제</button>
      </div>
    </div>
  `;
}

function findItem(menu: MenuData, catId: string, itemId: string): MenuItem | undefined {
  return menu.categories.find((c) => c.id === catId)?.items.find((i) => i.id === itemId);
}

function escapeAttr(s: string): string {
  return s.replace(/"/g, '&quot;');
}

export async function saveMenuState(state: MenuEditorState): Promise<void> {
  if (isLocalDevMode()) {
    saveLocalMenu(state.menu);
    state.pendingImages.clear();
    return;
  }
  for (const [, { blob, path }] of state.pendingImages) {
    const existing = await getFile(path);
    await putBinary(path, blob, existing?.sha);
  }
  await putJson('data/menu.json', state.menu, state.menuSha);
  const { sha } = await loadJsonFromGh<MenuData>('data/menu.json');
  state.menuSha = sha;
  state.pendingImages.clear();
}

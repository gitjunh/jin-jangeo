import { publicUrl } from '../../lib/assets';

export interface PhotoPickerOptions {
  images: string[];
  onSelectExisting: (path: string) => void;
  onSelectFile: (file: File) => void | Promise<void>;
}

export function openPhotoPicker(options: PhotoPickerOptions): void {
  const { images, onSelectExisting, onSelectFile } = options;

  const backdrop = document.createElement('div');
  backdrop.className = 'photo-sheet-backdrop';

  const sheet = document.createElement('div');
  sheet.className = 'photo-sheet';
  sheet.setAttribute('role', 'dialog');
  sheet.setAttribute('aria-label', '사진 선택');

  const thumbs = images.length > 0
    ? images.map((path) => `
        <button type="button" class="photo-sheet__thumb-btn" data-path="${escapeAttr(path)}">
          <img class="photo-sheet__thumb" src="${publicUrl(path)}" alt="" loading="lazy" />
        </button>
      `).join('')
    : '<p class="photo-sheet__empty">등록된 사진이 없습니다.</p>';

  sheet.innerHTML = `
    <div class="photo-sheet__handle" aria-hidden="true"></div>
    <h3 class="photo-sheet__title">사진 선택</h3>
    <p class="photo-sheet__sub">갤러리에서 선택</p>
    <div class="photo-sheet__grid">${thumbs}</div>
    <button type="button" class="admin-btn admin-btn--primary admin-btn--block photo-sheet__upload">새 사진 업로드</button>
    <button type="button" class="admin-btn admin-btn--ghost admin-btn--block photo-sheet__cancel">취소</button>
    <input type="file" class="photo-sheet__file" accept="image/*" hidden />
  `;

  const fileInput = sheet.querySelector<HTMLInputElement>('.photo-sheet__file')!;
  let closed = false;

  const close = () => {
    if (closed) return;
    closed = true;
    backdrop.remove();
    document.body.style.overflow = '';
  };

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) close();
  });

  sheet.querySelector('.photo-sheet__cancel')?.addEventListener('click', close);

  sheet.querySelectorAll<HTMLButtonElement>('.photo-sheet__thumb-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const path = btn.dataset.path;
      if (!path) return;
      onSelectExisting(path);
      close();
    });
  });

  const uploadBtn = sheet.querySelector<HTMLButtonElement>('.photo-sheet__upload')!;
  uploadBtn.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', async () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    close();
    await onSelectFile(file);
  });

  backdrop.append(sheet);
  document.body.style.overflow = 'hidden';
  document.body.append(backdrop);
}

function escapeAttr(s: string): string {
  return s.replace(/"/g, '&quot;');
}

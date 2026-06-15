export function createFileDropzone(onFiles: (files: File[]) => void): HTMLElement {
  const el = document.createElement('div');
  el.className = 'dropzone';
  el.innerHTML = `
    <div class="dropzone__inner">
      <p class="dropzone__title">사진·영상을 여기에 놓거나 선택하세요</p>
      <p class="dropzone__hint">이미지 → WebP · 영상 → MP4 (H.264) · 파일은 서버로 전송되지 않습니다</p>
      <button type="button" class="btn btn--primary">파일 선택</button>
      <input type="file" class="dropzone__input" accept="image/*,video/*" multiple hidden />
    </div>
  `;

  const input = el.querySelector<HTMLInputElement>('.dropzone__input')!;
  const btn = el.querySelector<HTMLButtonElement>('.btn')!;

  const handleFiles = (files: FileList | null) => {
    if (!files?.length) return;
    onFiles(Array.from(files));
    input.value = '';
  };

  btn.addEventListener('click', () => input.click());
  input.addEventListener('change', () => handleFiles(input.files));

  el.addEventListener('dragover', (e) => {
    e.preventDefault();
    el.classList.add('dropzone--active');
  });
  el.addEventListener('dragleave', () => el.classList.remove('dropzone--active'));
  el.addEventListener('drop', (e) => {
    e.preventDefault();
    el.classList.remove('dropzone--active');
    handleFiles(e.dataTransfer?.files ?? null);
  });

  return el;
}

export function renderGalleryGrid(
  images: string[],
  onImageClick: (src: string) => void,
): HTMLElement {
  const section = document.createElement('section');
  section.className = 'section gallery';
  section.id = 'gallery';
  section.innerHTML = `
    <h2 class="section__title">갤러리</h2>
    <div class="gallery__grid">
      ${images.map((src) => `
        <button type="button" class="gallery__item" data-src="/${src}" aria-label="사진 크게 보기">
          <img src="/${src}" alt="매장 음식 사진" loading="lazy" decoding="async" />
        </button>
      `).join('')}
    </div>
  `;

  section.querySelectorAll('.gallery__item').forEach((btn) => {
    btn.addEventListener('click', () => {
      const src = (btn as HTMLElement).dataset.src;
      if (src) onImageClick(src);
    });
  });

  return section;
}

export function createLightbox(): { el: HTMLElement; open: (src: string) => void; close: () => void } {
  const el = document.createElement('div');
  el.className = 'lightbox';
  el.hidden = true;
  el.innerHTML = `
    <button type="button" class="lightbox__close" aria-label="닫기">×</button>
    <img class="lightbox__img" alt="" />
  `;

  const img = el.querySelector<HTMLImageElement>('.lightbox__img')!;
  const close = () => { el.hidden = true; document.body.classList.remove('lightbox-open'); };
  const open = (src: string) => {
    img.src = src;
    el.hidden = false;
    document.body.classList.add('lightbox-open');
  };

  el.querySelector('.lightbox__close')?.addEventListener('click', close);
  el.addEventListener('click', (e) => { if (e.target === el) close(); });

  return { el, open, close };
}

import type { MenuData } from '../types';
import { formatPrice } from '../types';

export function renderMenuSection(
  menu: MenuData,
  onImageClick: (src: string) => void,
): HTMLElement {
  const section = document.createElement('section');
  section.className = 'section menu';
  section.id = 'menu';

  const ts = menu.tableSetting;
  let html = `
    <h2 class="section__title">메뉴</h2>
    <p class="menu__note">${ts.label} — 대인 ${formatPrice(ts.adult)} / 소인 ${formatPrice(ts.child)}</p>
    <button type="button" class="menu__board-btn" data-board="/${menu.menuBoardImage}">
      📋 메뉴판 전체 보기
    </button>
  `;

  for (const cat of menu.categories) {
    html += `<div class="menu__category">
      <h3 class="menu__cat-title">${cat.name}</h3>
      ${cat.subtitle ? `<p class="menu__cat-sub">${cat.subtitle}</p>` : ''}
      <div class="menu__list">`;

    for (const item of cat.items) {
      const featured = item.featured ? ' menu__item--featured' : '';
      const img = item.image
        ? `<img class="menu__item-img" src="/${item.image}" alt="${item.name}" loading="lazy" data-lightbox="/${item.image}" />`
        : '';
      html += `
        <article class="menu__item${featured}">
          ${img}
          <div class="menu__item-body">
            <span class="menu__item-name">${item.name}</span>
            <span class="menu__item-price">${formatPrice(item.price)}</span>
          </div>
        </article>`;
    }
    html += `</div></div>`;
  }

  section.innerHTML = html;

  section.querySelector('[data-board]')?.addEventListener('click', (e) => {
    const src = (e.currentTarget as HTMLElement).dataset.board;
    if (src) onImageClick(src);
  });
  section.querySelectorAll('[data-lightbox]').forEach((el) => {
    el.addEventListener('click', () => {
      const src = (el as HTMLElement).dataset.lightbox;
      if (src) onImageClick(src);
    });
  });

  return section;
}

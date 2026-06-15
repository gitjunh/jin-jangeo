import type { RestaurantInfo } from '../types';

export function renderStickyCta(
  restaurant: RestaurantInfo,
  onHoursClick: () => void,
): HTMLElement {
  const bar = document.createElement('nav');
  bar.className = 'cta-bar';
  bar.setAttribute('aria-label', '빠른 메뉴');

  bar.innerHTML = `
    <a href="tel:${restaurant.phone.replace(/-/g, '')}" class="cta-bar__btn">
      <span class="cta-bar__icon" aria-hidden="true">📞</span>
      <span>전화</span>
    </a>
    <a href="${restaurant.naverMapUrl}" target="_blank" rel="noopener" class="cta-bar__btn">
      <span class="cta-bar__icon" aria-hidden="true">📍</span>
      <span>오시는 길</span>
    </a>
    <button type="button" class="cta-bar__btn" data-hours>
      <span class="cta-bar__icon" aria-hidden="true">🕐</span>
      <span>영업시간</span>
    </button>
  `;

  bar.querySelector('[data-hours]')?.addEventListener('click', onHoursClick);
  return bar;
}

export function renderHoursSheet(restaurant: RestaurantInfo): HTMLElement {
  const sheet = document.createElement('div');
  sheet.className = 'sheet';
  sheet.hidden = true;
  sheet.innerHTML = `
    <div class="sheet__backdrop" data-close></div>
    <div class="sheet__panel" role="dialog" aria-label="영업시간">
      <button type="button" class="sheet__close" data-close aria-label="닫기">×</button>
      <h2 class="sheet__title">영업시간</h2>
      <dl class="sheet__list">
        <dt>영업</dt><dd>${restaurant.hoursLabel}</dd>
        <dt>휴무</dt><dd>${restaurant.closed}</dd>
        <dt>전화</dt><dd><a href="tel:${restaurant.phone.replace(/-/g, '')}">${restaurant.phone}</a></dd>
        <dt>휴대폰</dt><dd><a href="tel:${restaurant.mobile.replace(/-/g, '')}">${restaurant.mobile}</a></dd>
      </dl>
    </div>
  `;

  const close = () => { sheet.hidden = true; document.body.classList.remove('sheet-open'); };
  sheet.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', close));
  return sheet;
}

export function openHoursSheet(sheet: HTMLElement): void {
  sheet.hidden = false;
  document.body.classList.add('sheet-open');
}

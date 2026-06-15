import type { RestaurantInfo } from '../types';
import { isClosedToday } from '../types';

export function renderStoreInfo(restaurant: RestaurantInfo): HTMLElement {
  const section = document.createElement('section');
  section.className = 'section info';
  section.id = 'info';

  const todayNote = isClosedToday()
    ? '<p class="info__alert">오늘은 휴무일입니다.</p>'
    : '';

  section.innerHTML = `
    <h2 class="section__title">매장 안내</h2>
    ${todayNote}
    <dl class="info__list">
      <dt>주소</dt>
      <dd>${restaurant.address}</dd>
      <dt>전화</dt>
      <dd><a href="tel:${restaurant.phone.replace(/-/g, '')}">${restaurant.phone}</a></dd>
      <dt>휴대폰</dt>
      <dd><a href="tel:${restaurant.mobile.replace(/-/g, '')}">${restaurant.mobile}</a></dd>
      <dt>영업</dt>
      <dd>${restaurant.hoursLabel}</dd>
      <dt>휴무</dt>
      <dd>${restaurant.closed}</dd>
    </dl>
    <div class="info__actions">
      <a href="${restaurant.naverMapUrl}" class="btn btn--outline" target="_blank" rel="noopener">네이버 지도</a>
      <a href="${restaurant.mapUrl}" class="btn btn--outline" target="_blank" rel="noopener">카카오 지도</a>
    </div>
  `;

  return section;
}

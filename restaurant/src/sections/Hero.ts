import type { RestaurantInfo } from '../types';
import { isClosedToday } from '../types';

export function renderHero(
  restaurant: RestaurantInfo,
  videos: { src: string; poster: string }[],
  poster: string,
): HTMLElement {
  const section = document.createElement('section');
  section.className = 'hero';
  section.id = 'top';

  const closed = isClosedToday();
  const statusBadge = closed
    ? '<span class="hero__badge hero__badge--closed">오늘 휴무</span>'
    : '<span class="hero__badge hero__badge--open">영업 중</span>';

  section.innerHTML = `
    <div class="hero__video-wrap">
      <video class="hero__video" muted playsinline autoplay loop preload="metadata"
        poster="/${poster}"></video>
      <div class="hero__overlay"></div>
    </div>
    <div class="hero__content">
      ${statusBadge}
      <h1 class="hero__title">${restaurant.name}</h1>
      <p class="hero__tagline">${restaurant.tagline}</p>
      <div class="hero__scroll" aria-hidden="true">⌄</div>
    </div>
  `;

  const video = section.querySelector<HTMLVideoElement>('.hero__video')!;
  let idx = 0;
  const sources = videos.length > 0 ? videos : [{ src: '', poster }];

  const play = (i: number) => {
    const v = sources[i];
    video.src = `/${v.src}`;
    video.poster = `/${v.poster}`;
    void video.play().catch(() => {});
  };

  play(0);
  if (sources.length > 1) {
    setInterval(() => {
      idx = (idx + 1) % sources.length;
      play(idx);
    }, 8000);
  }

  return section;
}

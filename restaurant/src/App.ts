import type { GalleryData, MenuData, RestaurantInfo, VideosData } from './types';
import { loadJson } from './lib/dataLoader';
import { renderHero } from './sections/Hero';
import { openHoursSheet, renderHoursSheet, renderStickyCta } from './sections/StickyCta';
import { renderSignatureScroll } from './sections/SignatureScroll';
import { renderMenuSection } from './sections/MenuSection';
import { createLightbox, renderGalleryGrid } from './sections/GalleryGrid';
import { renderStoreInfo } from './sections/StoreInfo';

export async function initApp(root: HTMLElement): Promise<void> {
  root.innerHTML = '<p class="loading">불러오는 중…</p>';

  const [info, menuData, galleryData, videosData] = await Promise.all([
    loadJson<RestaurantInfo>('/data/restaurant.json'),
    loadJson<MenuData>('/data/menu.json'),
    loadJson<GalleryData>('/data/gallery.json'),
    loadJson<VideosData>('/data/videos.json'),
  ]);

  const hoursSheet = renderHoursSheet(info);
  const { el: lightbox, open: openLightbox } = createLightbox();

  root.innerHTML = '';
  const main = document.createElement('main');
  main.className = 'page';

  main.append(
    renderHero(info, videosData.hero, galleryData.heroPoster),
    renderSignatureScroll(galleryData.signature),
    renderMenuSection(menuData, openLightbox),
    renderGalleryGrid(galleryData.grid, openLightbox),
    renderStoreInfo(info),
  );

  root.append(main, renderStickyCta(info, () => openHoursSheet(hoursSheet)), hoursSheet, lightbox);
}

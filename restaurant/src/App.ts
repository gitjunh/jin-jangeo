import restaurant from '../data/restaurant.json';
import menu from '../data/menu.json';
import gallery from '../data/gallery.json';
import videos from '../data/videos.json';
import type { GalleryData, MenuData, RestaurantInfo, VideosData } from './types';
import { renderHero } from './sections/Hero';
import { openHoursSheet, renderHoursSheet, renderStickyCta } from './sections/StickyCta';
import { renderSignatureScroll } from './sections/SignatureScroll';
import { renderMenuSection } from './sections/MenuSection';
import { createLightbox, renderGalleryGrid } from './sections/GalleryGrid';
import { renderStoreInfo } from './sections/StoreInfo';

export function initApp(root: HTMLElement): void {
  const info = restaurant as RestaurantInfo;
  const menuData = menu as MenuData;
  const galleryData = gallery as GalleryData;
  const videosData = videos as VideosData;

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

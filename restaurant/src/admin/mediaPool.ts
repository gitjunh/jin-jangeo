import type { GalleryData, MenuData } from '../types';

/** gallery + menu에서 사용 중인 media 경로를 중복 없이 수집 */
export function collectMediaPool(gallery: GalleryData, menu: MenuData): string[] {
  const paths = new Set<string>();

  if (gallery.heroPoster) paths.add(gallery.heroPoster);
  for (const src of gallery.signature) paths.add(src);
  for (const src of gallery.grid) paths.add(src);

  if (menu.menuBoardImage) paths.add(menu.menuBoardImage);
  for (const cat of menu.categories) {
    for (const item of cat.items) {
      if (item.image) paths.add(item.image);
    }
  }

  return [...paths].sort();
}

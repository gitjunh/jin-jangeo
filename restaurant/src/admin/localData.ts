import type { RestaurantInfo } from '../types';
import type { MenuData } from '../types';

const KEY_MENU = 'jin_dev_menu';
const KEY_RESTAURANT = 'jin_dev_restaurant';

export function isLocalDevMode(): boolean {
  return import.meta.env.DEV && sessionStorage.getItem('jin_local_dev') === '1';
}

export function enableLocalDevMode(): void {
  sessionStorage.setItem('jin_local_dev', '1');
}

export function saveLocalMenu(menu: MenuData): void {
  localStorage.setItem(KEY_MENU, JSON.stringify(menu));
}

export function saveLocalRestaurant(info: RestaurantInfo): void {
  localStorage.setItem(KEY_RESTAURANT, JSON.stringify(info));
}

export function readLocalMenu(): MenuData | null {
  const raw = localStorage.getItem(KEY_MENU);
  return raw ? (JSON.parse(raw) as MenuData) : null;
}

export function readLocalRestaurant(): RestaurantInfo | null {
  const raw = localStorage.getItem(KEY_RESTAURANT);
  return raw ? (JSON.parse(raw) as RestaurantInfo) : null;
}

/** 공개 페이지용 — 로컬 어드민 저장분 */
export function readLocalJson<T>(path: string): T | null {
  if (path.includes('menu.json')) return readLocalMenu() as T | null;
  if (path.includes('restaurant.json')) return readLocalRestaurant() as T | null;
  return null;
}

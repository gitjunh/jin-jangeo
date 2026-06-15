export interface RestaurantInfo {
  name: string;
  tagline: string;
  phone: string;
  mobile: string;
  address: string;
  hours: string;
  hoursLabel: string;
  closed: string;
  mapUrl: string;
  naverMapUrl: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image?: string | null;
  description?: string;
  featured?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  subtitle?: string;
  items: MenuItem[];
}

export interface MenuData {
  tableSetting: { label: string; adult: number; child: number };
  menuBoardImage: string;
  categories: MenuCategory[];
}

export interface GalleryData {
  heroPoster: string;
  signature: string[];
  grid: string[];
}

export interface HeroVideo {
  src: string;
  poster: string;
}

export interface VideosData {
  hero: HeroVideo[];
}

export function formatPrice(won: number): string {
  return `${won.toLocaleString('ko-KR')}원`;
}

/** 매월 1째주·3째주 월요일 휴무 */
export function isClosedToday(date = new Date()): boolean {
  if (date.getDay() !== 1) return false;
  const week = Math.ceil(date.getDate() / 7);
  return week === 1 || week === 3;
}

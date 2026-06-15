import { publicUrl } from './assets';

export async function loadJson<T>(path: string): Promise<T> {
  if (import.meta.env.DEV) {
    const { readLocalJson } = await import('../admin/localData');
    const local = readLocalJson<T>(path);
    if (local) return local;
  }
  const url = publicUrl(path);
  const res = await fetch(`${url}?t=${Date.now()}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`데이터를 불러올 수 없습니다: ${path}`);
  return res.json() as Promise<T>;
}

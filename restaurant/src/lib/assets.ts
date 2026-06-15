/** public/ 아래 경로 → 배포 base 포함 URL */
export function publicUrl(path: string): string {
  const clean = path.replace(/^\//, '');
  return `${import.meta.env.BASE_URL}${clean}`;
}

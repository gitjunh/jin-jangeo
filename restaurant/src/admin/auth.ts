export const GITHUB_OWNER = import.meta.env.VITE_GITHUB_OWNER ?? 'gitjunh';
export const GITHUB_REPO = import.meta.env.VITE_GITHUB_REPO ?? 'jin-jangeo';
export const GITHUB_BRANCH = import.meta.env.VITE_GITHUB_BRANCH ?? 'gh-pages';
export const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN ?? '3140';

const TOKEN_KEY = 'jin_admin_github_token';
const UNLOCK_KEY = 'jin_admin_unlocked';

export function isUnlocked(): boolean {
  return sessionStorage.getItem(UNLOCK_KEY) === '1';
}

export function getToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  sessionStorage.setItem(TOKEN_KEY, token.trim());
}

export function unlockSession(): void {
  sessionStorage.setItem(UNLOCK_KEY, '1');
}

export function logout(): void {
  sessionStorage.removeItem(UNLOCK_KEY);
}

export function verifyPin(pin: string): boolean {
  return pin === ADMIN_PIN;
}

export function hasToken(): boolean {
  return !!getToken();
}

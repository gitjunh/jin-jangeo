import { hasToken, isUnlocked, logout, setToken, unlockSession, verifyPin } from '../auth';
import { enableLocalDevMode, isLocalDevMode } from '../localData';

export function renderPinLogin(onSuccess: () => void): HTMLElement {
  const el = document.createElement('div');
  el.className = 'admin-login';
  let pin = '';

  const render = () => {
    el.innerHTML = `
      <h1 class="admin-login__title">관리자</h1>
      <p class="admin-login__sub">PIN 번호를 입력하세요</p>
      <div class="admin-login__dots">${'•'.repeat(pin.length)}${'○'.repeat(Math.max(0, 4 - pin.length))}</div>
      <p class="admin-login__error" hidden></p>
      <div class="pin-pad">
        ${[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '⌫'].map((d) => {
          if (d === '') return '<span class="pin-pad__empty"></span>';
          return `<button type="button" class="pin-pad__key" data-key="${d}">${d}</button>`;
        }).join('')}
      </div>
    `;

    const err = el.querySelector<HTMLElement>('.admin-login__error')!;
    el.querySelectorAll<HTMLButtonElement>('.pin-pad__key').forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key!;
        if (key === '⌫') {
          pin = pin.slice(0, -1);
        } else if (pin.length < 6) {
          pin += key;
        }
        if (pin.length >= 4) {
          if (verifyPin(pin)) {
            unlockSession();
            err.hidden = true;
            onSuccess();
            return;
          }
          if (pin.length >= 6) {
            err.textContent = 'PIN이 올바르지 않습니다.';
            err.hidden = false;
            pin = '';
          }
        }
        render();
      });
    });
  };

  render();
  return el;
}

export function renderSetupToken(onDone: () => void): HTMLElement {
  const el = document.createElement('div');
  el.className = 'admin-setup';
  el.innerHTML = `
    <h1 class="admin-setup__title">GitHub 토큰 등록</h1>
    <p class="admin-setup__sub">최초 1회만 설정합니다. 저장 시 홈페이지에 바로 반영됩니다.</p>
    <p class="admin-setup__link">
      <a href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noopener noreferrer">
        토큰 발급 페이지 열기 ↗
      </a>
    </p>
    <ol class="admin-setup__steps">
      <li>우측 상단 <strong>프로필 사진</strong> → <strong>Settings</strong> (저장소 설정 ❌)</li>
      <li>왼쪽 <strong>Developer settings</strong> → <strong>Personal access tokens</strong> → <strong>Fine-grained tokens</strong></li>
      <li><strong>Generate new token</strong> → Repository access: <strong>jin-jangeo</strong>만 선택</li>
      <li>Permissions → <strong>Contents</strong>: <strong>Read and write</strong></li>
    </ol>
    <p class="admin-setup__note">※ <code>gh-pages</code>는 토큰 옵션이 아니라 배포 브랜치입니다. Pages 배포 후 사용하세요.</p>
    <label class="admin-field">
      <span>토큰</span>
      <input type="password" class="admin-input" placeholder="github_pat_..." autocomplete="off" />
    </label>
    <p class="admin-setup__error" hidden></p>
    <button type="button" class="admin-btn admin-btn--primary">등록하기</button>
    ${import.meta.env.DEV ? `
      <p class="admin-setup__dev">배포 전 로컬 테스트</p>
      <button type="button" class="admin-btn admin-btn--ghost admin-btn--block" data-local-dev>토큰 없이 로컬 편집</button>
    ` : ''}
  `;

  const input = el.querySelector<HTMLInputElement>('.admin-input')!;
  const err = el.querySelector<HTMLElement>('.admin-setup__error')!;
  el.querySelector('.admin-btn')?.addEventListener('click', () => {
    const token = input.value.trim();
    if (!token.startsWith('github_pat_') && !token.startsWith('ghp_')) {
      err.textContent = '올바른 GitHub 토큰을 입력하세요.';
      err.hidden = false;
      return;
    }
    setToken(token);
    onDone();
  });

  el.querySelector('[data-local-dev]')?.addEventListener('click', () => {
    enableLocalDevMode();
    onDone();
  });

  return el;
}

export function renderAdminHeader(onLogout: () => void): HTMLElement {
  const el = document.createElement('header');
  el.className = 'admin-header';
  el.innerHTML = `
    <h1>장어명가 진 관리</h1>
    <button type="button" class="admin-header__logout">나가기</button>
  `;
  el.querySelector('.admin-header__logout')?.addEventListener('click', () => {
    logout();
    onLogout();
  });
  return el;
}

export function checkAuthState(): 'login' | 'setup' | 'app' {
  if (isLocalDevMode()) {
    return isUnlocked() ? 'app' : 'login';
  }
  if (!hasToken()) return 'setup';
  if (!isUnlocked()) return 'login';
  return 'app';
}

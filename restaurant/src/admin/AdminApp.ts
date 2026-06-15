import {
  checkAuthState,
  renderAdminHeader,
  renderPinLogin,
  renderSetupToken,
} from './views/PinLogin';
import {
  loadMenuState,
  renderMenuEditor,
  saveMenuState,
  type MenuEditorState,
} from './views/MenuEditor';
import {
  loadStoreState,
  renderStoreEditor,
  saveStoreState,
  type StoreEditorState,
} from './views/StoreEditor';
import {
  loadGalleryState,
  renderSignatureEditor,
  saveGalleryState,
  type GalleryEditorState,
} from './views/SignatureEditor';
import { isLocalDevMode } from './localData';
import { collectMediaPool } from './mediaPool';

export async function initAdminApp(root: HTMLElement): Promise<void> {
  const boot = () => void bootApp(root);
  showAuth(root, boot);
}

function showAuth(root: HTMLElement, onReady: () => void): void {
  const state = checkAuthState();
  root.innerHTML = '';

  if (state === 'setup') {
    root.append(renderSetupToken(onReady));
    return;
  }
  if (state === 'login') {
    root.append(renderPinLogin(onReady));
    return;
  }
  onReady();
}

async function bootApp(root: HTMLElement): Promise<void> {
  root.innerHTML = '<p class="loading">불러오는 중…</p>';

  let menuState: MenuEditorState;
  let storeState: StoreEditorState;
  let galleryState: GalleryEditorState;
  let mediaPool: string[];
  let dirty = false;

  try {
    [menuState, storeState, galleryState] = await Promise.all([
      loadMenuState(),
      loadStoreState(),
      loadGalleryState(),
    ]);
    mediaPool = collectMediaPool(galleryState.gallery, menuState.menu);
  } catch (e) {
    root.innerHTML = `<p class="admin-error">${e instanceof Error ? e.message : '로드 실패'}</p>`;
    return;
  }

  const shell = document.createElement('div');
  shell.className = 'admin-app';

  const tabs = document.createElement('nav');
  tabs.className = 'admin-tabs';
  tabs.innerHTML = `
    <button type="button" class="admin-tabs__btn admin-tabs__btn--active" data-tab="menu">메뉴</button>
    <button type="button" class="admin-tabs__btn" data-tab="signature">시그니처</button>
    <button type="button" class="admin-tabs__btn" data-tab="store">매장</button>
  `;

  const content = document.createElement('div');
  content.className = 'admin-content';

  const menuEl = renderMenuEditor(menuState, mediaPool, () => { dirty = true; });
  const signatureEl = renderSignatureEditor(galleryState, mediaPool, () => { dirty = true; });
  const storeEl = renderStoreEditor(storeState, () => { dirty = true; });
  signatureEl.hidden = true;
  storeEl.hidden = true;

  content.append(menuEl, signatureEl, storeEl);

  const saveBar = document.createElement('div');
  saveBar.className = 'admin-save-bar';
  saveBar.innerHTML = `
    <p class="admin-save-bar__msg" hidden></p>
    <button type="button" class="admin-btn admin-btn--primary admin-btn--block">저장하기</button>
  `;

  const msg = saveBar.querySelector<HTMLElement>('.admin-save-bar__msg')!;
  const saveBtn = saveBar.querySelector<HTMLButtonElement>('.admin-btn')!;

  saveBtn.addEventListener('click', async () => {
    saveBtn.disabled = true;
    saveBtn.textContent = '저장 중…';
    msg.hidden = true;
    try {
      await saveMenuState(menuState);
      await saveGalleryState(galleryState);
      await saveStoreState(storeState);
      dirty = false;
      msg.textContent = isLocalDevMode()
        ? '저장됐어요! 홈페이지(/)를 새로고침하면 바로 보입니다. (로컬 테스트)'
        : '저장됐어요! 홈페이지에서 새로고침하면 바로 보입니다.';
      msg.className = 'admin-save-bar__msg admin-save-bar__msg--ok';
      msg.hidden = false;
    } catch (e) {
      msg.textContent = e instanceof Error ? e.message : '저장 실패';
      msg.className = 'admin-save-bar__msg admin-save-bar__msg--err';
      msg.hidden = false;
    } finally {
      saveBtn.disabled = false;
      saveBtn.textContent = '저장하기';
    }
  });

  tabs.querySelectorAll<HTMLButtonElement>('.admin-tabs__btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      tabs.querySelectorAll('.admin-tabs__btn').forEach((b) => b.classList.remove('admin-tabs__btn--active'));
      btn.classList.add('admin-tabs__btn--active');
      const tab = btn.dataset.tab;
      menuEl.hidden = tab !== 'menu';
      signatureEl.hidden = tab !== 'signature';
      storeEl.hidden = tab !== 'store';
    });
  });

  root.innerHTML = '';
  shell.append(
    renderAdminHeader(() => showAuth(root, () => bootApp(root))),
    tabs,
    content,
    saveBar,
  );
  root.append(shell);

  window.addEventListener('beforeunload', (e) => {
    if (dirty) {
      e.preventDefault();
    }
  });
}

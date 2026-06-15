import type { RestaurantInfo } from '../../types';
import { loadJsonFromGh, putJson } from '../github';
import { isLocalDevMode, saveLocalRestaurant } from '../localData';
import { publicUrl } from '../../lib/assets';

export interface StoreEditorState {
  info: RestaurantInfo;
  sha: string;
}

export async function loadStoreState(): Promise<StoreEditorState> {
  if (isLocalDevMode()) {
    const res = await fetch(publicUrl('/data/restaurant.json'));
    const data = (await res.json()) as RestaurantInfo;
    return { info: data, sha: 'local' };
  }
  const { data, sha } = await loadJsonFromGh<RestaurantInfo>('data/restaurant.json');
  return { info: data, sha };
}

export function renderStoreEditor(
  state: StoreEditorState,
  onChange: () => void,
): HTMLElement {
  const el = document.createElement('div');
  el.className = 'admin-section';

  const fields: { key: keyof RestaurantInfo; label: string }[] = [
    { key: 'name', label: '식당명' },
    { key: 'tagline', label: '한 줄 소개' },
    { key: 'phone', label: '전화번호' },
    { key: 'mobile', label: '휴대폰' },
    { key: 'address', label: '주소' },
    { key: 'hoursLabel', label: '영업시간' },
    { key: 'closed', label: '휴무일' },
  ];

  el.innerHTML = `
    <h2 class="admin-section__title">매장 정보</h2>
    ${fields.map((f) => `
      <label class="admin-field">
        <span>${f.label}</span>
        <input class="admin-input" data-key="${f.key}" value="${escapeAttr(String(state.info[f.key] ?? ''))}" />
      </label>
    `).join('')}
  `;

  el.querySelectorAll<HTMLInputElement>('.admin-input').forEach((input) => {
    input.addEventListener('input', () => {
      const key = input.dataset.key as keyof RestaurantInfo;
      state.info[key] = input.value as never;
      if (key === 'hoursLabel') state.info.hours = input.value;
      onChange();
    });
  });

  return el;
}

function escapeAttr(s: string): string {
  return s.replace(/"/g, '&quot;');
}

export async function saveStoreState(state: StoreEditorState): Promise<void> {
  if (isLocalDevMode()) {
    saveLocalRestaurant(state.info);
    return;
  }
  await putJson('data/restaurant.json', state.info, state.sha);
  const { sha } = await loadJsonFromGh<RestaurantInfo>('data/restaurant.json');
  state.sha = sha;
}

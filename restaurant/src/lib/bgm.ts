import { publicUrl } from './assets';

const STORAGE_KEY = 'jin_bgm_enabled';

export function initBgm(): void {
  const audio = new Audio(publicUrl('media/bgm.mp3'));
  audio.loop = true;
  audio.volume = 0.18;
  audio.preload = 'none';

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'bgm-btn';
  btn.setAttribute('aria-label', '배경음악');
  btn.textContent = '♪';

  const sync = (on: boolean) => {
    btn.classList.toggle('bgm-btn--on', on);
    btn.title = on ? '음악 끄기' : '잔잔한 음악 켜기';
  };

  sync(localStorage.getItem(STORAGE_KEY) === '1');

  btn.addEventListener('click', () => {
    if (audio.paused) {
      void audio.play().then(() => {
        localStorage.setItem(STORAGE_KEY, '1');
        sync(true);
      }).catch(() => {});
    } else {
      audio.pause();
      localStorage.removeItem(STORAGE_KEY);
      sync(false);
    }
  });

  if (localStorage.getItem(STORAGE_KEY) === '1') {
    const resume = () => {
      void audio.play().then(() => sync(true)).catch(() => {});
      document.removeEventListener('pointerdown', resume);
    };
    document.addEventListener('pointerdown', resume, { once: true });
  }

  document.body.append(btn);
}

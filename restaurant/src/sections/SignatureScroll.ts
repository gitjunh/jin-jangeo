import { publicUrl } from '../lib/assets';

export function renderSignatureScroll(images: string[]): HTMLElement {
  const section = document.createElement('section');
  section.className = 'section signature';
  section.innerHTML = `
    <h2 class="section__title">시그니처</h2>
    <div class="signature__scroll" tabindex="0">
      ${images.map((src) => `
        <figure class="signature__card">
          <img src="${publicUrl(src)}" alt="장어 요리" loading="lazy" decoding="async" />
        </figure>
      `).join('')}
    </div>
  `;
  return section;
}

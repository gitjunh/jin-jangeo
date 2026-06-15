export function createProgressBar(progress: number, label: string): HTMLElement {
  const el = document.createElement('div');
  el.className = 'progress';
  el.innerHTML = `
    <div class="progress__label">${label}</div>
    <div class="progress__track">
      <div class="progress__bar" style="width: ${progress}%"></div>
    </div>
    <div class="progress__pct">${progress}%</div>
  `;
  return el;
}

export function updateProgressBar(el: HTMLElement, progress: number, label?: string): void {
  const bar = el.querySelector<HTMLElement>('.progress__bar');
  const pct = el.querySelector<HTMLElement>('.progress__pct');
  const lbl = el.querySelector<HTMLElement>('.progress__label');
  if (bar) bar.style.width = `${progress}%`;
  if (pct) pct.textContent = `${progress}%`;
  if (label && lbl) lbl.textContent = label;
}

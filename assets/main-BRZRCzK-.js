import{p as i,i as m,f as u}from"./assets-DZw7ZkS0.js";async function _(e){const a=i(e),t=await fetch(`${a}?t=${Date.now()}`,{cache:"no-store"});if(!t.ok)throw new Error(`데이터를 불러올 수 없습니다: ${e}`);return t.json()}function g(e,a,t){const n=document.createElement("section");n.className="hero",n.id="top";const l=m()?'<span class="hero__badge hero__badge--closed">오늘 휴무</span>':'<span class="hero__badge hero__badge--open">영업 중</span>';n.innerHTML=`
    <div class="hero__video-wrap">
      <video class="hero__video" muted playsinline autoplay loop preload="metadata"
        poster="${i(t)}"></video>
      <div class="hero__overlay"></div>
    </div>
    <div class="hero__content">
      ${l}
      <h1 class="hero__title">${e.name}</h1>
      <p class="hero__tagline">${e.tagline}</p>
      <div class="hero__scroll" aria-hidden="true">⌄</div>
    </div>
  `;const o=n.querySelector(".hero__video");let s=0;const d=a.length>0?a:[{src:"",poster:t}],r=b=>{const h=d[b];o.src=i(h.src),o.poster=i(h.poster),o.play().catch(()=>{})};return r(0),d.length>1&&setInterval(()=>{s=(s+1)%d.length,r(s)},8e3),n}function f(e,a){var n;const t=document.createElement("nav");return t.className="cta-bar",t.setAttribute("aria-label","빠른 메뉴"),t.innerHTML=`
    <a href="tel:${e.phone.replace(/-/g,"")}" class="cta-bar__btn">
      <span class="cta-bar__icon" aria-hidden="true">📞</span>
      <span>전화</span>
    </a>
    <a href="${e.naverMapUrl}" target="_blank" rel="noopener" class="cta-bar__btn">
      <span class="cta-bar__icon" aria-hidden="true">📍</span>
      <span>오시는 길</span>
    </a>
    <button type="button" class="cta-bar__btn" data-hours>
      <span class="cta-bar__icon" aria-hidden="true">🕐</span>
      <span>영업시간</span>
    </button>
  `,(n=t.querySelector("[data-hours]"))==null||n.addEventListener("click",a),t}function v(e){const a=document.createElement("div");a.className="sheet",a.hidden=!0,a.innerHTML=`
    <div class="sheet__backdrop" data-close></div>
    <div class="sheet__panel" role="dialog" aria-label="영업시간">
      <button type="button" class="sheet__close" data-close aria-label="닫기">×</button>
      <h2 class="sheet__title">영업시간</h2>
      <dl class="sheet__list">
        <dt>영업</dt><dd>${e.hoursLabel}</dd>
        <dt>휴무</dt><dd>${e.closed}</dd>
        <dt>전화</dt><dd><a href="tel:${e.phone.replace(/-/g,"")}">${e.phone}</a></dd>
        <dt>휴대폰</dt><dd><a href="tel:${e.mobile.replace(/-/g,"")}">${e.mobile}</a></dd>
      </dl>
    </div>
  `;const t=()=>{a.hidden=!0,document.body.classList.remove("sheet-open")};return a.querySelectorAll("[data-close]").forEach(n=>n.addEventListener("click",t)),a}function $(e){e.hidden=!1,document.body.classList.add("sheet-open")}function y(e){const a=document.createElement("section");return a.className="section signature",a.innerHTML=`
    <h2 class="section__title">시그니처</h2>
    <div class="signature__scroll" tabindex="0">
      ${e.map(t=>`
        <figure class="signature__card">
          <img src="${i(t)}" alt="장어 요리" loading="lazy" decoding="async" />
        </figure>
      `).join("")}
    </div>
  `,a}function L(e,a){var l;const t=document.createElement("section");t.className="section menu",t.id="menu";const n=e.tableSetting;let c=`
    <h2 class="section__title">메뉴</h2>
    <p class="menu__note">${n.label} — 대인 ${u(n.adult)} / 소인 ${u(n.child)}</p>
    <button type="button" class="menu__board-btn" data-board="${i(e.menuBoardImage)}">
      📋 메뉴판 전체 보기
    </button>
  `;for(const o of e.categories){c+=`<div class="menu__category">
      <h3 class="menu__cat-title">${o.name}</h3>
      ${o.subtitle?`<p class="menu__cat-sub">${o.subtitle}</p>`:""}
      <div class="menu__list">`;for(const s of o.items){const d=s.featured?" menu__item--featured":"",r=s.image?`<img class="menu__item-img" src="${i(s.image)}" alt="${s.name}" loading="lazy" data-lightbox="${i(s.image)}" />`:"";c+=`
        <article class="menu__item${d}">
          ${r}
          <div class="menu__item-body">
            <span class="menu__item-name">${s.name}</span>
            <span class="menu__item-price">${u(s.price)}</span>
          </div>
        </article>`}c+="</div></div>"}return t.innerHTML=c,(l=t.querySelector("[data-board]"))==null||l.addEventListener("click",o=>{const s=o.currentTarget.dataset.board;s&&a(s)}),t.querySelectorAll("[data-lightbox]").forEach(o=>{o.addEventListener("click",()=>{const s=o.dataset.lightbox;s&&a(s)})}),t}function E(e,a){const t=document.createElement("section");return t.className="section gallery",t.id="gallery",t.innerHTML=`
    <h2 class="section__title">갤러리</h2>
    <div class="gallery__grid">
      ${e.map(n=>`
        <button type="button" class="gallery__item" data-src="${i(n)}" aria-label="사진 크게 보기">
          <img src="${i(n)}" alt="매장 음식 사진" loading="lazy" decoding="async" />
        </button>
      `).join("")}
    </div>
  `,t.querySelectorAll(".gallery__item").forEach(n=>{n.addEventListener("click",()=>{const c=n.dataset.src;c&&a(c)})}),t}function S(){var c;const e=document.createElement("div");e.className="lightbox",e.hidden=!0,e.innerHTML=`
    <button type="button" class="lightbox__close" aria-label="닫기">×</button>
    <img class="lightbox__img" alt="" />
  `;const a=e.querySelector(".lightbox__img"),t=()=>{e.hidden=!0,document.body.classList.remove("lightbox-open")},n=l=>{a.src=l,e.hidden=!1,document.body.classList.add("lightbox-open")};return(c=e.querySelector(".lightbox__close"))==null||c.addEventListener("click",t),e.addEventListener("click",l=>{l.target===e&&t()}),{el:e,open:n,close:t}}function x(e){const a=document.createElement("section");a.className="section info",a.id="info";const t=m()?'<p class="info__alert">오늘은 휴무일입니다.</p>':"";return a.innerHTML=`
    <h2 class="section__title">매장 안내</h2>
    ${t}
    <dl class="info__list">
      <dt>주소</dt>
      <dd>${e.address}</dd>
      <dt>전화</dt>
      <dd><a href="tel:${e.phone.replace(/-/g,"")}">${e.phone}</a></dd>
      <dt>휴대폰</dt>
      <dd><a href="tel:${e.mobile.replace(/-/g,"")}">${e.mobile}</a></dd>
      <dt>영업</dt>
      <dd>${e.hoursLabel}</dd>
      <dt>휴무</dt>
      <dd>${e.closed}</dd>
    </dl>
    <div class="info__actions">
      <a href="${e.naverMapUrl}" class="btn btn--outline" target="_blank" rel="noopener">네이버 지도</a>
      <a href="${e.mapUrl}" class="btn btn--outline" target="_blank" rel="noopener">카카오 지도</a>
    </div>
  `,a}async function H(e){e.innerHTML='<p class="loading">불러오는 중…</p>';const[a,t,n,c]=await Promise.all([_("/data/restaurant.json"),_("/data/menu.json"),_("/data/gallery.json"),_("/data/videos.json")]),l=v(a),{el:o,open:s}=S();e.innerHTML="";const d=document.createElement("main");d.className="page",d.append(g(a,c.hero,n.heroPoster),y(n.signature),L(t,s),E(n.grid,s),x(a)),e.append(d,f(a,()=>$(l)),l,o)}const p=document.getElementById("app");if(!p)throw new Error("#app not found");H(p);

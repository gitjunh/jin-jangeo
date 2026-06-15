import{i as h,f as _}from"./types-bc62W2C5.js";async function r(e){const t=await fetch(`${e}?t=${Date.now()}`,{cache:"no-store"});if(!t.ok)throw new Error(`데이터를 불러올 수 없습니다: ${e}`);return t.json()}function b(e,t,a){const n=document.createElement("section");n.className="hero",n.id="top";const l=h()?'<span class="hero__badge hero__badge--closed">오늘 휴무</span>':'<span class="hero__badge hero__badge--open">영업 중</span>';n.innerHTML=`
    <div class="hero__video-wrap">
      <video class="hero__video" muted playsinline autoplay loop preload="metadata"
        poster="/${a}"></video>
      <div class="hero__overlay"></div>
    </div>
    <div class="hero__content">
      ${l}
      <h1 class="hero__title">${e.name}</h1>
      <p class="hero__tagline">${e.tagline}</p>
      <div class="hero__scroll" aria-hidden="true">⌄</div>
    </div>
  `;const o=n.querySelector(".hero__video");let s=0;const i=t.length>0?t:[{src:"",poster:a}],d=p=>{const u=i[p];o.src=`/${u.src}`,o.poster=`/${u.poster}`,o.play().catch(()=>{})};return d(0),i.length>1&&setInterval(()=>{s=(s+1)%i.length,d(s)},8e3),n}function g(e,t){var n;const a=document.createElement("nav");return a.className="cta-bar",a.setAttribute("aria-label","빠른 메뉴"),a.innerHTML=`
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
  `,(n=a.querySelector("[data-hours]"))==null||n.addEventListener("click",t),a}function f(e){const t=document.createElement("div");t.className="sheet",t.hidden=!0,t.innerHTML=`
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
  `;const a=()=>{t.hidden=!0,document.body.classList.remove("sheet-open")};return t.querySelectorAll("[data-close]").forEach(n=>n.addEventListener("click",a)),t}function v(e){e.hidden=!1,document.body.classList.add("sheet-open")}function $(e){const t=document.createElement("section");return t.className="section signature",t.innerHTML=`
    <h2 class="section__title">시그니처</h2>
    <div class="signature__scroll" tabindex="0">
      ${e.map(a=>`
        <figure class="signature__card">
          <img src="/${a}" alt="장어 요리" loading="lazy" decoding="async" />
        </figure>
      `).join("")}
    </div>
  `,t}function y(e,t){var l;const a=document.createElement("section");a.className="section menu",a.id="menu";const n=e.tableSetting;let c=`
    <h2 class="section__title">메뉴</h2>
    <p class="menu__note">${n.label} — 대인 ${_(n.adult)} / 소인 ${_(n.child)}</p>
    <button type="button" class="menu__board-btn" data-board="/${e.menuBoardImage}">
      📋 메뉴판 전체 보기
    </button>
  `;for(const o of e.categories){c+=`<div class="menu__category">
      <h3 class="menu__cat-title">${o.name}</h3>
      ${o.subtitle?`<p class="menu__cat-sub">${o.subtitle}</p>`:""}
      <div class="menu__list">`;for(const s of o.items){const i=s.featured?" menu__item--featured":"",d=s.image?`<img class="menu__item-img" src="/${s.image}" alt="${s.name}" loading="lazy" data-lightbox="/${s.image}" />`:"";c+=`
        <article class="menu__item${i}">
          ${d}
          <div class="menu__item-body">
            <span class="menu__item-name">${s.name}</span>
            <span class="menu__item-price">${_(s.price)}</span>
          </div>
        </article>`}c+="</div></div>"}return a.innerHTML=c,(l=a.querySelector("[data-board]"))==null||l.addEventListener("click",o=>{const s=o.currentTarget.dataset.board;s&&t(s)}),a.querySelectorAll("[data-lightbox]").forEach(o=>{o.addEventListener("click",()=>{const s=o.dataset.lightbox;s&&t(s)})}),a}function L(e,t){const a=document.createElement("section");return a.className="section gallery",a.id="gallery",a.innerHTML=`
    <h2 class="section__title">갤러리</h2>
    <div class="gallery__grid">
      ${e.map(n=>`
        <button type="button" class="gallery__item" data-src="/${n}" aria-label="사진 크게 보기">
          <img src="/${n}" alt="매장 음식 사진" loading="lazy" decoding="async" />
        </button>
      `).join("")}
    </div>
  `,a.querySelectorAll(".gallery__item").forEach(n=>{n.addEventListener("click",()=>{const c=n.dataset.src;c&&t(c)})}),a}function E(){var c;const e=document.createElement("div");e.className="lightbox",e.hidden=!0,e.innerHTML=`
    <button type="button" class="lightbox__close" aria-label="닫기">×</button>
    <img class="lightbox__img" alt="" />
  `;const t=e.querySelector(".lightbox__img"),a=()=>{e.hidden=!0,document.body.classList.remove("lightbox-open")},n=l=>{t.src=l,e.hidden=!1,document.body.classList.add("lightbox-open")};return(c=e.querySelector(".lightbox__close"))==null||c.addEventListener("click",a),e.addEventListener("click",l=>{l.target===e&&a()}),{el:e,open:n,close:a}}function S(e){const t=document.createElement("section");t.className="section info",t.id="info";const a=h()?'<p class="info__alert">오늘은 휴무일입니다.</p>':"";return t.innerHTML=`
    <h2 class="section__title">매장 안내</h2>
    ${a}
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
  `,t}async function x(e){e.innerHTML='<p class="loading">불러오는 중…</p>';const[t,a,n,c]=await Promise.all([r("/data/restaurant.json"),r("/data/menu.json"),r("/data/gallery.json"),r("/data/videos.json")]),l=f(t),{el:o,open:s}=E();e.innerHTML="";const i=document.createElement("main");i.className="page",i.append(b(t,c.hero,n.heroPoster),$(n.signature),y(a,s),L(n.grid,s),S(t)),e.append(i,g(t,()=>v(l)),l,o)}const m=document.getElementById("app");if(!m)throw new Error("#app not found");x(m);

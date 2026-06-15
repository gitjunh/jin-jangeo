import{f as _,p as j}from"./assets-DZw7ZkS0.js";const q="gitjunh",H="jin-jangeo",v="gh-pages",x="3140",E="jin_admin_github_token",g="jin_admin_unlocked";function C(){return sessionStorage.getItem(g)==="1"}function w(){return sessionStorage.getItem(E)}function P(e){sessionStorage.setItem(E,e.trim())}function B(){sessionStorage.setItem(g,"1")}function U(){sessionStorage.removeItem(g)}function G(e){return e===x}function O(){return!!w()}function D(){return!1}function R(){sessionStorage.setItem("jin_local_dev","1")}function J(e){const t=document.createElement("div");t.className="admin-login";let n="";const i=()=>{t.innerHTML=`
      <h1 class="admin-login__title">관리자</h1>
      <p class="admin-login__sub">PIN 번호를 입력하세요</p>
      <div class="admin-login__dots">${"•".repeat(n.length)}${"○".repeat(Math.max(0,4-n.length))}</div>
      <p class="admin-login__error" hidden></p>
      <div class="pin-pad">
        ${[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map(s=>s===""?'<span class="pin-pad__empty"></span>':`<button type="button" class="pin-pad__key" data-key="${s}">${s}</button>`).join("")}
      </div>
    `;const a=t.querySelector(".admin-login__error");t.querySelectorAll(".pin-pad__key").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.key;if(r==="⌫"?n=n.slice(0,-1):n.length<6&&(n+=r),n.length>=4){if(G(n)){B(),a.hidden=!0,e();return}n.length>=6&&(a.textContent="PIN이 올바르지 않습니다.",a.hidden=!1,n="")}i()})})};return i(),t}function W(e){var a,s;const t=document.createElement("div");t.className="admin-setup",t.innerHTML=`
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
    
  `;const n=t.querySelector(".admin-input"),i=t.querySelector(".admin-setup__error");return(a=t.querySelector(".admin-btn"))==null||a.addEventListener("click",()=>{const r=n.value.trim();if(!r.startsWith("github_pat_")&&!r.startsWith("ghp_")){i.textContent="올바른 GitHub 토큰을 입력하세요.",i.hidden=!1;return}P(r),e()}),(s=t.querySelector("[data-local-dev]"))==null||s.addEventListener("click",()=>{R(),e()}),t}function F(e){var n;const t=document.createElement("header");return t.className="admin-header",t.innerHTML=`
    <h1>장어명가 진 관리</h1>
    <button type="button" class="admin-header__logout">나가기</button>
  `,(n=t.querySelector(".admin-header__logout"))==null||n.addEventListener("click",()=>{U(),e()}),t}function K(){return O()?C()?"app":"login":"setup"}const z={maxWidth:1280,imageQuality:.72,videoCrf:30,videoMaxWidth:1280,audioBitrate:"96k"};function Q(e,t,n){const i=Math.max(e,t);if(i<=n)return{width:e,height:t};const a=n/i;return{width:Math.round(e*a),height:Math.round(t*a)}}async function Y(e,t=z,n){const i=await createImageBitmap(e),{width:a,height:s}=Q(i.width,i.height,t.maxWidth),r=new OffscreenCanvas(a,s),o=r.getContext("2d");if(!o)throw new Error("Canvas 2D context를 사용할 수 없습니다.");return o.drawImage(i,0,0,a,s),i.close(),{blob:await r.convertToBlob({type:"image/webp",quality:t.imageQuality}),width:a,height:s}}function S(e){return`https://api.github.com/repos/${q}/${H}/contents/${e}`}function k(){const e=w();if(!e)throw new Error("GitHub 토큰이 없습니다.");return{Authorization:`Bearer ${e}`,Accept:"application/vnd.github+json","X-GitHub-Api-Version":"2022-11-28"}}async function $(e){try{return(await e.json()).message??e.statusText}catch{return e.statusText}}async function L(e){const t=await fetch(`${S(e)}?ref=${v}`,{headers:k()});if(t.status===404)return null;if(!t.ok)throw new Error(await $(t));const n=await t.json();return{sha:n.sha,content:atob(n.content.replace(/\n/g,""))}}async function I(e,t,n){const i=btoa(unescape(encodeURIComponent(JSON.stringify(t,null,2))));await T(e,i,n)}async function V(e,t,n){const i=await t.arrayBuffer(),a=new Uint8Array(i);let s="";for(let r=0;r<a.length;r++)s+=String.fromCharCode(a[r]);await T(e,btoa(s),n)}async function T(e,t,n){const i={message:`admin: update ${e}`,content:t,branch:v};n&&(i.sha=n);const a=await fetch(S(e),{method:"PUT",headers:{...k(),"Content-Type":"application/json"},body:JSON.stringify(i)});if(!a.ok)throw new Error(await $(a))}async function b(e){const t=await L(e);if(!t)throw new Error(`${e} 파일이 없습니다. 먼저 배포해 주세요.`);return{data:JSON.parse(t.content),sha:t.sha}}async function X(){const{data:e,sha:t}=await b("data/menu.json");return{menu:e,menuSha:t,pendingImages:new Map}}function Z(e,t){const n=document.createElement("div");n.className="admin-section";const i=()=>{const s=e.menu.tableSetting;let r=`
      <h2 class="admin-section__title">메뉴 관리</h2>
      <p class="admin-note">${s.label}: 대인 ${_(s.adult)} / 소인 ${_(s.child)}</p>
    `;for(const o of e.menu.categories){r+=`
        <details class="admin-accordion" open>
          <summary class="admin-accordion__title">${o.name}</summary>
          <div class="admin-accordion__body">
      `;for(const u of o.items)r+=ee(o,u,e);r+=`
            <button type="button" class="admin-btn admin-btn--ghost" data-add="${o.id}">+ 메뉴 추가</button>
          </div>
        </details>
      `}n.innerHTML=r,n.querySelectorAll("[data-field]").forEach(o=>{o.addEventListener("input",()=>{const{catId:u,itemId:l,field:c}=o.dataset,d=y(e.menu,u,l);d&&(c==="name"&&(d.name=o.value),c==="price"&&(d.price=parseInt(o.value,10)||0),t())})}),n.querySelectorAll("[data-delete]").forEach(o=>{o.addEventListener("click",()=>{const{catId:u,itemId:l}=o.dataset;if(!confirm("이 메뉴를 삭제할까요?"))return;const c=e.menu.categories.find(d=>d.id===u);c&&(c.items=c.items.filter(d=>d.id!==l)),t(),i()})}),n.querySelectorAll("[data-photo]").forEach(o=>{o.addEventListener("click",()=>{const{catId:u,itemId:l}=o.dataset,c=document.createElement("input");c.type="file",c.accept="image/*",c.capture="environment",c.addEventListener("change",async()=>{var f;const d=(f=c.files)==null?void 0:f[0];if(!d)return;const m=y(e.menu,u,l);if(m){o.textContent="최적화 중…";try{const{blob:p}=await Y(d),h=`media/menu-${l}-${Date.now()}.webp`;e.pendingImages.set(l,{blob:p,path:h}),m.image=h,t(),i()}catch(p){alert(p instanceof Error?p.message:"이미지 변환 실패"),o.textContent="사진 바꾸기"}}}),c.click()})}),n.querySelectorAll("[data-add]").forEach(o=>{o.addEventListener("click",()=>{const u=o.dataset.add,l=e.menu.categories.find(d=>d.id===u);if(!l)return;const c=`item-${Date.now()}`;l.items.push({id:c,name:"새 메뉴",price:0,image:null}),t(),i()})}),a()},a=()=>{n.querySelectorAll("[data-pending]").forEach(s=>{const r=s.dataset.pending,o=e.pendingImages.get(r);o&&(s.src=URL.createObjectURL(o.blob))})};return i(),n}function ee(e,t,n){const i=n.pendingImages.get(t.id),a=i?"":t.image?j(t.image):"",s=i?`<img src="" alt="" class="admin-item__thumb" data-pending="${t.id}" />`:t.image?`<img src="${a}" alt="" class="admin-item__thumb" />`:'<div class="admin-item__thumb admin-item__thumb--empty">사진 없음</div>',r=i?" (새 사진)":"";return`
    <div class="admin-item">
      ${s}
      <div class="admin-item__fields">
        <input class="admin-input" data-field="name" data-cat-id="${e.id}" data-item-id="${t.id}"
          value="${te(t.name)}" placeholder="메뉴명" />
        <input class="admin-input" type="number" inputmode="numeric" data-field="price"
          data-cat-id="${e.id}" data-item-id="${t.id}" value="${t.price}" placeholder="가격" />
        <button type="button" class="admin-btn admin-btn--small" data-photo data-cat-id="${e.id}" data-item-id="${t.id}">
          사진 바꾸기${r}
        </button>
        <button type="button" class="admin-btn admin-btn--danger admin-btn--small"
          data-delete data-cat-id="${e.id}" data-item-id="${t.id}">삭제</button>
      </div>
    </div>
  `}function y(e,t,n){var i;return(i=e.categories.find(a=>a.id===t))==null?void 0:i.items.find(a=>a.id===n)}function te(e){return e.replace(/"/g,"&quot;")}async function ne(e){for(const[,{blob:n,path:i}]of e.pendingImages){const a=await L(i);await V(i,n,a==null?void 0:a.sha)}await I("data/menu.json",e.menu,e.menuSha);const{sha:t}=await b("data/menu.json");e.menuSha=t,e.pendingImages.clear()}async function ae(){const{data:e,sha:t}=await b("data/restaurant.json");return{info:e,sha:t}}function ie(e,t){const n=document.createElement("div");n.className="admin-section";const i=[{key:"name",label:"식당명"},{key:"tagline",label:"한 줄 소개"},{key:"phone",label:"전화번호"},{key:"mobile",label:"휴대폰"},{key:"address",label:"주소"},{key:"hoursLabel",label:"영업시간"},{key:"closed",label:"휴무일"}];return n.innerHTML=`
    <h2 class="admin-section__title">매장 정보</h2>
    ${i.map(a=>`
      <label class="admin-field">
        <span>${a.label}</span>
        <input class="admin-input" data-key="${a.key}" value="${se(String(e.info[a.key]??""))}" />
      </label>
    `).join("")}
  `,n.querySelectorAll(".admin-input").forEach(a=>{a.addEventListener("input",()=>{const s=a.dataset.key;e.info[s]=a.value,s==="hoursLabel"&&(e.info.hours=a.value),t()})}),n}function se(e){return e.replace(/"/g,"&quot;")}async function oe(e){await I("data/restaurant.json",e.info,e.sha);const{sha:t}=await b("data/restaurant.json");e.sha=t}async function re(e){A(e,()=>void M(e))}function A(e,t){const n=K();if(e.innerHTML="",n==="setup"){e.append(W(t));return}if(n==="login"){e.append(J(t));return}t()}async function M(e){e.innerHTML='<p class="loading">불러오는 중…</p>';let t,n,i=!1;try{[t,n]=await Promise.all([X(),ae()])}catch(m){e.innerHTML=`<p class="admin-error">${m instanceof Error?m.message:"로드 실패"}</p>`;return}const a=document.createElement("div");a.className="admin-app";const s=document.createElement("nav");s.className="admin-tabs",s.innerHTML=`
    <button type="button" class="admin-tabs__btn admin-tabs__btn--active" data-tab="menu">메뉴</button>
    <button type="button" class="admin-tabs__btn" data-tab="store">매장</button>
  `;const r=document.createElement("div");r.className="admin-content";const o=Z(t,()=>{i=!0}),u=ie(n,()=>{i=!0});u.hidden=!0,r.append(o,u);const l=document.createElement("div");l.className="admin-save-bar",l.innerHTML=`
    <p class="admin-save-bar__msg" hidden></p>
    <button type="button" class="admin-btn admin-btn--primary admin-btn--block">저장하기</button>
  `;const c=l.querySelector(".admin-save-bar__msg"),d=l.querySelector(".admin-btn");d.addEventListener("click",async()=>{d.disabled=!0,d.textContent="저장 중…",c.hidden=!0;try{await ne(t),await oe(n),i=!1,c.textContent=D()?"저장됐어요! 홈페이지(/)를 새로고침하면 바로 보입니다. (로컬 테스트)":"저장됐어요! 홈페이지에서 새로고침하면 바로 보입니다.",c.className="admin-save-bar__msg admin-save-bar__msg--ok",c.hidden=!1}catch(m){c.textContent=m instanceof Error?m.message:"저장 실패",c.className="admin-save-bar__msg admin-save-bar__msg--err",c.hidden=!1}finally{d.disabled=!1,d.textContent="저장하기"}}),s.querySelectorAll(".admin-tabs__btn").forEach(m=>{m.addEventListener("click",()=>{s.querySelectorAll(".admin-tabs__btn").forEach(p=>p.classList.remove("admin-tabs__btn--active")),m.classList.add("admin-tabs__btn--active");const f=m.dataset.tab;o.hidden=f!=="menu",u.hidden=f!=="store"})}),e.innerHTML="",a.append(F(()=>A(e,()=>M(e))),s,r,l),e.append(a),window.addEventListener("beforeunload",m=>{i&&m.preventDefault()})}const N=document.getElementById("admin-app");if(!N)throw new Error("#admin-app not found");re(N);

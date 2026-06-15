import{p as y,f as _,l as j}from"./dataLoader-BmDoleCj.js";const P="gitjunh",x="jin-jangeo",v="gh-pages",H="3140",E="jin_admin_github_token",g="jin_admin_unlocked";function B(){return sessionStorage.getItem(g)==="1"}function w(){return sessionStorage.getItem(E)}function C(e){sessionStorage.setItem(E,e.trim())}function U(){sessionStorage.setItem(g,"1")}function D(){sessionStorage.removeItem(g)}function G(e){return e===H}function O(){return!!w()}function R(){return!1}function F(){sessionStorage.setItem("jin_local_dev","1")}function J(e){const t=document.createElement("div");t.className="admin-login";let n="";const a=()=>{t.innerHTML=`
      <h1 class="admin-login__title">관리자</h1>
      <p class="admin-login__sub">PIN 번호를 입력하세요</p>
      <div class="admin-login__dots">${"•".repeat(n.length)}${"○".repeat(Math.max(0,4-n.length))}</div>
      <p class="admin-login__error" hidden></p>
      <div class="pin-pad">
        ${[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map(o=>o===""?'<span class="pin-pad__empty"></span>':`<button type="button" class="pin-pad__key" data-key="${o}">${o}</button>`).join("")}
      </div>
    `;const i=t.querySelector(".admin-login__error");t.querySelectorAll(".pin-pad__key").forEach(o=>{o.addEventListener("click",()=>{const r=o.dataset.key;if(r==="⌫"?n=n.slice(0,-1):n.length<6&&(n+=r),n.length>=4){if(G(n)){U(),i.hidden=!0,e();return}n.length>=6&&(i.textContent="PIN이 올바르지 않습니다.",i.hidden=!1,n="")}a()})})};return a(),t}function W(e){var i,o;const t=document.createElement("div");t.className="admin-setup",t.innerHTML=`
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
    
  `;const n=t.querySelector(".admin-input"),a=t.querySelector(".admin-setup__error");return(i=t.querySelector(".admin-btn"))==null||i.addEventListener("click",()=>{const r=n.value.trim();if(!r.startsWith("github_pat_")&&!r.startsWith("ghp_")){a.textContent="올바른 GitHub 토큰을 입력하세요.",a.hidden=!1;return}C(r),e()}),(o=t.querySelector("[data-local-dev]"))==null||o.addEventListener("click",()=>{F(),e()}),t}function z(e){var n;const t=document.createElement("header");return t.className="admin-header",t.innerHTML=`
    <h1>장어명가 진 관리</h1>
    <button type="button" class="admin-header__logout">나가기</button>
  `,(n=t.querySelector(".admin-header__logout"))==null||n.addEventListener("click",()=>{D(),e()}),t}function K(){return O()?B()?"app":"login":"setup"}const Q={maxWidth:1280,imageQuality:.72,videoCrf:30,videoMaxWidth:1280,audioBitrate:"96k"};function Y(e,t,n){const a=Math.max(e,t);if(a<=n)return{width:e,height:t};const i=n/a;return{width:Math.round(e*i),height:Math.round(t*i)}}async function V(e,t=Q,n){const a=await createImageBitmap(e),{width:i,height:o}=Y(a.width,a.height,t.maxWidth),r=new OffscreenCanvas(i,o),p=r.getContext("2d");if(!p)throw new Error("Canvas 2D context를 사용할 수 없습니다.");return p.drawImage(a,0,0,i,o),a.close(),{blob:await r.convertToBlob({type:"image/webp",quality:t.imageQuality}),width:i,height:o}}function S(e){return`https://api.github.com/repos/${P}/${x}/contents/${e}`}function k(){const e=w();if(!e)throw new Error("GitHub 토큰이 없습니다.");return{Authorization:`Bearer ${e}`,Accept:"application/vnd.github+json","X-GitHub-Api-Version":"2022-11-28"}}async function $(e){try{return(await e.json()).message??e.statusText}catch{return e.statusText}}function X(e){const t=atob(e.replace(/\s/g,"")),n=new Uint8Array(t.length);for(let a=0;a<t.length;a++)n[a]=t.charCodeAt(a);return new TextDecoder("utf-8").decode(n)}function Z(e){const t=new TextEncoder().encode(e);let n="";for(let a=0;a<t.length;a++)n+=String.fromCharCode(t[a]);return btoa(n)}async function L(e){const t=await fetch(`${S(e)}?ref=${v}`,{headers:k()});if(t.status===404)return null;if(!t.ok)throw new Error(await $(t));const n=await t.json();return{sha:n.sha,content:X(n.content)}}async function I(e,t,n){const a=Z(JSON.stringify(t,null,2));await A(e,a,n)}async function ee(e,t,n){const a=await t.arrayBuffer(),i=new Uint8Array(a);let o="";for(let r=0;r<i.length;r++)o+=String.fromCharCode(i[r]);await A(e,btoa(o),n)}async function A(e,t,n){const a={message:`admin: update ${e}`,content:t,branch:v};n&&(a.sha=n);const i=await fetch(S(e),{method:"PUT",headers:{...k(),"Content-Type":"application/json"},body:JSON.stringify(a)});if(!i.ok)throw new Error(await $(i))}async function f(e){const t=await L(e);if(!t)throw new Error(`${e} 파일이 없습니다. 먼저 배포해 주세요.`);return{data:JSON.parse(t.content),sha:t.sha}}function te(e){var l;const{images:t,onSelectExisting:n,onSelectFile:a}=e,i=document.createElement("div");i.className="photo-sheet-backdrop";const o=document.createElement("div");o.className="photo-sheet",o.setAttribute("role","dialog"),o.setAttribute("aria-label","사진 선택");const r=t.length>0?t.map(s=>`
        <button type="button" class="photo-sheet__thumb-btn" data-path="${ne(s)}">
          <img class="photo-sheet__thumb" src="${y(s)}" alt="" loading="lazy" />
        </button>
      `).join(""):'<p class="photo-sheet__empty">등록된 사진이 없습니다.</p>';o.innerHTML=`
    <div class="photo-sheet__handle" aria-hidden="true"></div>
    <h3 class="photo-sheet__title">사진 선택</h3>
    <p class="photo-sheet__sub">갤러리에서 선택</p>
    <div class="photo-sheet__grid">${r}</div>
    <button type="button" class="admin-btn admin-btn--primary admin-btn--block photo-sheet__upload">새 사진 업로드</button>
    <button type="button" class="admin-btn admin-btn--ghost admin-btn--block photo-sheet__cancel">취소</button>
    <input type="file" class="photo-sheet__file" accept="image/*" hidden />
  `;const p=o.querySelector(".photo-sheet__file");let c=!1;const u=()=>{c||(c=!0,i.remove(),document.body.style.overflow="")};i.addEventListener("click",s=>{s.target===i&&u()}),(l=o.querySelector(".photo-sheet__cancel"))==null||l.addEventListener("click",u),o.querySelectorAll(".photo-sheet__thumb-btn").forEach(s=>{s.addEventListener("click",()=>{const d=s.dataset.path;d&&(n(d),u())})}),o.querySelector(".photo-sheet__upload").addEventListener("click",()=>p.click()),p.addEventListener("change",async()=>{var d;const s=(d=p.files)==null?void 0:d[0];s&&(u(),await a(s))}),i.append(o),document.body.style.overflow="hidden",document.body.append(i)}function ne(e){return e.replace(/"/g,"&quot;")}async function ae(){const{data:e,sha:t}=await f("data/menu.json");return{menu:e,menuSha:t,pendingImages:new Map}}function ie(e,t,n){const a=document.createElement("div");a.className="admin-section";const i=()=>{const r=e.menu.tableSetting;let p=`
      <h2 class="admin-section__title">메뉴 관리</h2>
      <p class="admin-note">${r.label}: 대인 ${_(r.adult)} / 소인 ${_(r.child)}</p>
    `;for(const c of e.menu.categories){p+=`
        <details class="admin-accordion" open>
          <summary class="admin-accordion__title">${c.name}</summary>
          <div class="admin-accordion__body">
      `;for(const u of c.items)p+=oe(c,u,e);p+=`
            <button type="button" class="admin-btn admin-btn--ghost" data-add="${c.id}">+ 메뉴 추가</button>
          </div>
        </details>
      `}a.innerHTML=p,a.querySelectorAll("[data-field]").forEach(c=>{c.addEventListener("input",()=>{const{catId:u,itemId:m,field:l}=c.dataset,s=b(e.menu,u,m);s&&(l==="name"&&(s.name=c.value),l==="price"&&(s.price=parseInt(c.value,10)||0),n())})}),a.querySelectorAll("[data-delete]").forEach(c=>{c.addEventListener("click",()=>{const{catId:u,itemId:m}=c.dataset;if(!confirm("이 메뉴를 삭제할까요?"))return;const l=e.menu.categories.find(s=>s.id===u);l&&(l.items=l.items.filter(s=>s.id!==m)),n(),i()})}),a.querySelectorAll("[data-photo]").forEach(c=>{c.addEventListener("click",()=>{const{catId:u,itemId:m}=c.dataset;te({images:t,onSelectExisting:l=>{const s=b(e.menu,u,m);s&&(e.pendingImages.delete(m),s.image=l,n(),i())},onSelectFile:async l=>{const s=b(e.menu,u,m);if(s){c.textContent="최적화 중…";try{const{blob:d}=await V(l),h=`media/menu-${m}-${Date.now()}.webp`;e.pendingImages.set(m,{blob:d,path:h}),s.image=h,n(),i()}catch(d){alert(d instanceof Error?d.message:"이미지 변환 실패"),c.textContent="사진 바꾸기"}}}})})}),a.querySelectorAll("[data-add]").forEach(c=>{c.addEventListener("click",()=>{const u=c.dataset.add,m=e.menu.categories.find(s=>s.id===u);if(!m)return;const l=`item-${Date.now()}`;m.items.push({id:l,name:"새 메뉴",price:0,image:null}),n(),i()})}),o()},o=()=>{a.querySelectorAll("[data-pending]").forEach(r=>{const p=r.dataset.pending,c=e.pendingImages.get(p);c&&(r.src=URL.createObjectURL(c.blob))})};return i(),a}function oe(e,t,n){const a=n.pendingImages.get(t.id),i=a?"":t.image?y(t.image):"",o=a?`<img src="" alt="" class="admin-item__thumb" data-pending="${t.id}" />`:t.image?`<img src="${i}" alt="" class="admin-item__thumb" />`:'<div class="admin-item__thumb admin-item__thumb--empty">사진 없음</div>',r=a?" (새 사진)":"";return`
    <div class="admin-item">
      ${o}
      <div class="admin-item__fields">
        <input class="admin-input" data-field="name" data-cat-id="${e.id}" data-item-id="${t.id}"
          value="${se(t.name)}" placeholder="메뉴명" />
        <input class="admin-input" type="number" inputmode="numeric" data-field="price"
          data-cat-id="${e.id}" data-item-id="${t.id}" value="${t.price}" placeholder="가격" />
        <button type="button" class="admin-btn admin-btn--small" data-photo data-cat-id="${e.id}" data-item-id="${t.id}">
          사진 바꾸기${r}
        </button>
        <button type="button" class="admin-btn admin-btn--danger admin-btn--small"
          data-delete data-cat-id="${e.id}" data-item-id="${t.id}">삭제</button>
      </div>
    </div>
  `}function b(e,t,n){var a;return(a=e.categories.find(i=>i.id===t))==null?void 0:a.items.find(i=>i.id===n)}function se(e){return e.replace(/"/g,"&quot;")}async function re(e){for(const[,{blob:n,path:a}]of e.pendingImages){const i=await L(a);await ee(a,n,i==null?void 0:i.sha)}await I("data/menu.json",e.menu,e.menuSha);const{sha:t}=await f("data/menu.json");e.menuSha=t,e.pendingImages.clear()}async function ce(){const{data:e,sha:t}=await f("data/restaurant.json");return{info:e,sha:t}}function de(e,t){const n=document.createElement("div");n.className="admin-section";const a=[{key:"name",label:"식당명"},{key:"tagline",label:"한 줄 소개"},{key:"phone",label:"전화번호"},{key:"mobile",label:"휴대폰"},{key:"address",label:"주소"},{key:"hoursLabel",label:"영업시간"},{key:"closed",label:"휴무일"}];return n.innerHTML=`
    <h2 class="admin-section__title">매장 정보</h2>
    ${a.map(i=>`
      <label class="admin-field">
        <span>${i.label}</span>
        <input class="admin-input" data-key="${i.key}" value="${le(String(e.info[i.key]??""))}" />
      </label>
    `).join("")}
  `,n.querySelectorAll(".admin-input").forEach(i=>{i.addEventListener("input",()=>{const o=i.dataset.key;e.info[o]=i.value,o==="hoursLabel"&&(e.info.hours=i.value),t()})}),n}function le(e){return e.replace(/"/g,"&quot;")}async function ue(e){await I("data/restaurant.json",e.info,e.sha);const{sha:t}=await f("data/restaurant.json");e.sha=t}function me(e,t){const n=new Set;e.heroPoster&&n.add(e.heroPoster);for(const a of e.signature)n.add(a);for(const a of e.grid)n.add(a);t.menuBoardImage&&n.add(t.menuBoardImage);for(const a of t.categories)for(const i of a.items)i.image&&n.add(i.image);return[...n].sort()}async function pe(e){T(e,()=>void q(e))}function T(e,t){const n=K();if(e.innerHTML="",n==="setup"){e.append(W(t));return}if(n==="login"){e.append(J(t));return}t()}async function q(e){e.innerHTML='<p class="loading">불러오는 중…</p>';let t,n,a,i=!1;try{const d=await j("/data/gallery.json");[t,n]=await Promise.all([ae(),ce()]),a=me(d,t.menu)}catch(d){e.innerHTML=`<p class="admin-error">${d instanceof Error?d.message:"로드 실패"}</p>`;return}const o=document.createElement("div");o.className="admin-app";const r=document.createElement("nav");r.className="admin-tabs",r.innerHTML=`
    <button type="button" class="admin-tabs__btn admin-tabs__btn--active" data-tab="menu">메뉴</button>
    <button type="button" class="admin-tabs__btn" data-tab="store">매장</button>
  `;const p=document.createElement("div");p.className="admin-content";const c=ie(t,a,()=>{i=!0}),u=de(n,()=>{i=!0});u.hidden=!0,p.append(c,u);const m=document.createElement("div");m.className="admin-save-bar",m.innerHTML=`
    <p class="admin-save-bar__msg" hidden></p>
    <button type="button" class="admin-btn admin-btn--primary admin-btn--block">저장하기</button>
  `;const l=m.querySelector(".admin-save-bar__msg"),s=m.querySelector(".admin-btn");s.addEventListener("click",async()=>{s.disabled=!0,s.textContent="저장 중…",l.hidden=!0;try{await re(t),await ue(n),i=!1,l.textContent=R()?"저장됐어요! 홈페이지(/)를 새로고침하면 바로 보입니다. (로컬 테스트)":"저장됐어요! 홈페이지에서 새로고침하면 바로 보입니다.",l.className="admin-save-bar__msg admin-save-bar__msg--ok",l.hidden=!1}catch(d){l.textContent=d instanceof Error?d.message:"저장 실패",l.className="admin-save-bar__msg admin-save-bar__msg--err",l.hidden=!1}finally{s.disabled=!1,s.textContent="저장하기"}}),r.querySelectorAll(".admin-tabs__btn").forEach(d=>{d.addEventListener("click",()=>{r.querySelectorAll(".admin-tabs__btn").forEach(N=>N.classList.remove("admin-tabs__btn--active")),d.classList.add("admin-tabs__btn--active");const h=d.dataset.tab;c.hidden=h!=="menu",u.hidden=h!=="store"})}),e.innerHTML="",o.append(z(()=>T(e,()=>q(e))),r,p,m),e.append(o),window.addEventListener("beforeunload",d=>{i&&d.preventDefault()})}const M=document.getElementById("admin-app");if(!M)throw new Error("#admin-app not found");pe(M);

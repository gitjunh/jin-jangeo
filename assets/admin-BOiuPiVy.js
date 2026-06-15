import{p as _,f as w}from"./assets-DZw7ZkS0.js";const U="gitjunh",C="jin-jangeo",k="gh-pages",G="3140",$="jin_admin_github_token",v="jin_admin_unlocked";function D(){return sessionStorage.getItem(v)==="1"}function I(){return sessionStorage.getItem($)}function O(t){sessionStorage.setItem($,t.trim())}function R(){sessionStorage.setItem(v,"1")}function F(){sessionStorage.removeItem(v)}function J(t){return t===G}function W(){return!!I()}function z(){return!1}function K(){sessionStorage.setItem("jin_local_dev","1")}function Q(t){const e=document.createElement("div");e.className="admin-login";let n="";const a=()=>{e.innerHTML=`
      <h1 class="admin-login__title">관리자</h1>
      <p class="admin-login__sub">PIN 번호를 입력하세요</p>
      <div class="admin-login__dots">${"•".repeat(n.length)}${"○".repeat(Math.max(0,4-n.length))}</div>
      <p class="admin-login__error" hidden></p>
      <div class="pin-pad">
        ${[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map(o=>o===""?'<span class="pin-pad__empty"></span>':`<button type="button" class="pin-pad__key" data-key="${o}">${o}</button>`).join("")}
      </div>
    `;const i=e.querySelector(".admin-login__error");e.querySelectorAll(".pin-pad__key").forEach(o=>{o.addEventListener("click",()=>{const c=o.dataset.key;if(c==="⌫"?n=n.slice(0,-1):n.length<6&&(n+=c),n.length>=4){if(J(n)){R(),i.hidden=!0,t();return}n.length>=6&&(i.textContent="PIN이 올바르지 않습니다.",i.hidden=!1,n="")}a()})})};return a(),e}function Y(t){var i,o;const e=document.createElement("div");e.className="admin-setup",e.innerHTML=`
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
    
  `;const n=e.querySelector(".admin-input"),a=e.querySelector(".admin-setup__error");return(i=e.querySelector(".admin-btn"))==null||i.addEventListener("click",()=>{const c=n.value.trim();if(!c.startsWith("github_pat_")&&!c.startsWith("ghp_")){a.textContent="올바른 GitHub 토큰을 입력하세요.",a.hidden=!1;return}O(c),t()}),(o=e.querySelector("[data-local-dev]"))==null||o.addEventListener("click",()=>{K(),t()}),e}function V(t){var n;const e=document.createElement("header");return e.className="admin-header",e.innerHTML=`
    <h1>장어명가 진 관리</h1>
    <button type="button" class="admin-header__logout">나가기</button>
  `,(n=e.querySelector(".admin-header__logout"))==null||n.addEventListener("click",()=>{F(),t()}),e}function X(){return W()?D()?"app":"login":"setup"}const Z={maxWidth:1280,imageQuality:.72,videoCrf:30,videoMaxWidth:1280,audioBitrate:"96k"};function tt(t,e,n){const a=Math.max(t,e);if(a<=n)return{width:t,height:e};const i=n/a;return{width:Math.round(t*i),height:Math.round(e*i)}}async function L(t,e=Z,n){const a=await createImageBitmap(t),{width:i,height:o}=tt(a.width,a.height,e.maxWidth),c=new OffscreenCanvas(i,o),r=c.getContext("2d");if(!r)throw new Error("Canvas 2D context를 사용할 수 없습니다.");return r.drawImage(a,0,0,i,o),a.close(),{blob:await c.convertToBlob({type:"image/webp",quality:e.imageQuality}),width:i,height:o}}function A(t){return`https://api.github.com/repos/${U}/${C}/contents/${t}`}function q(){const t=I();if(!t)throw new Error("GitHub 토큰이 없습니다.");return{Authorization:`Bearer ${t}`,Accept:"application/vnd.github+json","X-GitHub-Api-Version":"2022-11-28"}}async function T(t){try{return(await t.json()).message??t.statusText}catch{return t.statusText}}function et(t){const e=atob(t.replace(/\s/g,"")),n=new Uint8Array(e.length);for(let a=0;a<e.length;a++)n[a]=e.charCodeAt(a);return new TextDecoder("utf-8").decode(n)}function nt(t){const e=new TextEncoder().encode(t);let n="";for(let a=0;a<e.length;a++)n+=String.fromCharCode(e[a]);return btoa(n)}async function E(t){const e=await fetch(`${A(t)}?ref=${k}`,{headers:q()});if(e.status===404)return null;if(!e.ok)throw new Error(await T(e));const n=await e.json();return{sha:n.sha,content:et(n.content)}}async function S(t,e,n){const a=nt(JSON.stringify(e,null,2));await x(t,a,n)}async function j(t,e,n){const a=await e.arrayBuffer(),i=new Uint8Array(a);let o="";for(let c=0;c<i.length;c++)o+=String.fromCharCode(i[c]);await x(t,btoa(o),n)}async function x(t,e,n){const a={message:`admin: update ${t}`,content:e,branch:k};n&&(a.sha=n);const i=await fetch(A(t),{method:"PUT",headers:{...q(),"Content-Type":"application/json"},body:JSON.stringify(a)});if(!i.ok)throw new Error(await T(i))}async function h(t){const e=await E(t);if(!e)throw new Error(`${t} 파일이 없습니다. 먼저 배포해 주세요.`);return{data:JSON.parse(e.content),sha:e.sha}}function M(t){var u;const{images:e,onSelectExisting:n,onSelectFile:a}=t,i=document.createElement("div");i.className="photo-sheet-backdrop";const o=document.createElement("div");o.className="photo-sheet",o.setAttribute("role","dialog"),o.setAttribute("aria-label","사진 선택");const c=e.length>0?e.map(d=>`
        <button type="button" class="photo-sheet__thumb-btn" data-path="${at(d)}">
          <img class="photo-sheet__thumb" src="${_(d)}" alt="" loading="lazy" />
        </button>
      `).join(""):'<p class="photo-sheet__empty">등록된 사진이 없습니다.</p>';o.innerHTML=`
    <div class="photo-sheet__handle" aria-hidden="true"></div>
    <h3 class="photo-sheet__title">사진 선택</h3>
    <p class="photo-sheet__sub">갤러리에서 선택</p>
    <div class="photo-sheet__grid">${c}</div>
    <button type="button" class="admin-btn admin-btn--primary admin-btn--block photo-sheet__upload">새 사진 업로드</button>
    <button type="button" class="admin-btn admin-btn--ghost admin-btn--block photo-sheet__cancel">취소</button>
    <input type="file" class="photo-sheet__file" accept="image/*" hidden />
  `;const r=o.querySelector(".photo-sheet__file");let s=!1;const l=()=>{s||(s=!0,i.remove(),document.body.style.overflow="")};i.addEventListener("click",d=>{d.target===i&&l()}),(u=o.querySelector(".photo-sheet__cancel"))==null||u.addEventListener("click",l),o.querySelectorAll(".photo-sheet__thumb-btn").forEach(d=>{d.addEventListener("click",()=>{const p=d.dataset.path;p&&(n(p),l())})}),o.querySelector(".photo-sheet__upload").addEventListener("click",()=>r.click()),r.addEventListener("change",async()=>{var p;const d=(p=r.files)==null?void 0:p[0];d&&(l(),await a(d))}),i.append(o),document.body.style.overflow="hidden",document.body.append(i)}function at(t){return t.replace(/"/g,"&quot;")}async function it(){const{data:t,sha:e}=await h("data/menu.json");return{menu:t,menuSha:e,pendingImages:new Map}}function st(t,e,n){const a=document.createElement("div");a.className="admin-section";const i=()=>{const c=t.menu.tableSetting;let r=`
      <h2 class="admin-section__title">메뉴 관리</h2>
      <p class="admin-note">${c.label}: 대인 ${w(c.adult)} / 소인 ${w(c.child)}</p>
    `;for(const s of t.menu.categories){r+=`
        <details class="admin-accordion" open>
          <summary class="admin-accordion__title">${s.name}</summary>
          <div class="admin-accordion__body">
      `;for(const l of s.items)r+=ot(s,l,t);r+=`
            <button type="button" class="admin-btn admin-btn--ghost" data-add="${s.id}">+ 메뉴 추가</button>
          </div>
        </details>
      `}a.innerHTML=r,a.querySelectorAll("[data-field]").forEach(s=>{s.addEventListener("input",()=>{const{catId:l,itemId:m,field:u}=s.dataset,d=y(t.menu,l,m);d&&(u==="name"&&(d.name=s.value),u==="price"&&(d.price=parseInt(s.value,10)||0),n())})}),a.querySelectorAll("[data-delete]").forEach(s=>{s.addEventListener("click",()=>{const{catId:l,itemId:m}=s.dataset;if(!confirm("이 메뉴를 삭제할까요?"))return;const u=t.menu.categories.find(d=>d.id===l);u&&(u.items=u.items.filter(d=>d.id!==m)),n(),i()})}),a.querySelectorAll("[data-photo]").forEach(s=>{s.addEventListener("click",()=>{const{catId:l,itemId:m}=s.dataset;M({images:e,onSelectExisting:u=>{const d=y(t.menu,l,m);d&&(t.pendingImages.delete(m),d.image=u,n(),i())},onSelectFile:async u=>{const d=y(t.menu,l,m);if(d){s.textContent="최적화 중…";try{const{blob:p}=await L(u),b=`media/menu-${m}-${Date.now()}.webp`;t.pendingImages.set(m,{blob:p,path:b}),d.image=b,n(),i()}catch(p){alert(p instanceof Error?p.message:"이미지 변환 실패"),s.textContent="사진 바꾸기"}}}})})}),a.querySelectorAll("[data-add]").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.add,m=t.menu.categories.find(d=>d.id===l);if(!m)return;const u=`item-${Date.now()}`;m.items.push({id:u,name:"새 메뉴",price:0,image:null}),n(),i()})}),o()},o=()=>{a.querySelectorAll("[data-pending]").forEach(c=>{const r=c.dataset.pending,s=t.pendingImages.get(r);s&&(c.src=URL.createObjectURL(s.blob))})};return i(),a}function ot(t,e,n){const a=n.pendingImages.get(e.id),i=a?"":e.image?_(e.image):"",o=a?`<img src="" alt="" class="admin-item__thumb" data-pending="${e.id}" />`:e.image?`<img src="${i}" alt="" class="admin-item__thumb" />`:'<div class="admin-item__thumb admin-item__thumb--empty">사진 없음</div>',c=a?" (새 사진)":"";return`
    <div class="admin-item">
      ${o}
      <div class="admin-item__fields">
        <input class="admin-input" data-field="name" data-cat-id="${t.id}" data-item-id="${e.id}"
          value="${rt(e.name)}" placeholder="메뉴명" />
        <input class="admin-input" type="number" inputmode="numeric" data-field="price"
          data-cat-id="${t.id}" data-item-id="${e.id}" value="${e.price}" placeholder="가격" />
        <button type="button" class="admin-btn admin-btn--small" data-photo data-cat-id="${t.id}" data-item-id="${e.id}">
          사진 바꾸기${c}
        </button>
        <button type="button" class="admin-btn admin-btn--danger admin-btn--small"
          data-delete data-cat-id="${t.id}" data-item-id="${e.id}">삭제</button>
      </div>
    </div>
  `}function y(t,e,n){var a;return(a=t.categories.find(i=>i.id===e))==null?void 0:a.items.find(i=>i.id===n)}function rt(t){return t.replace(/"/g,"&quot;")}async function dt(t){for(const[,{blob:n,path:a}]of t.pendingImages){const i=await E(a);await j(a,n,i==null?void 0:i.sha)}await S("data/menu.json",t.menu,t.menuSha);const{sha:e}=await h("data/menu.json");t.menuSha=e,t.pendingImages.clear()}async function ct(){const{data:t,sha:e}=await h("data/restaurant.json");return{info:t,sha:e}}function lt(t,e){const n=document.createElement("div");n.className="admin-section";const a=[{key:"name",label:"식당명"},{key:"tagline",label:"한 줄 소개"},{key:"phone",label:"전화번호"},{key:"mobile",label:"휴대폰"},{key:"address",label:"주소"},{key:"hoursLabel",label:"영업시간"},{key:"closed",label:"휴무일"}];return n.innerHTML=`
    <h2 class="admin-section__title">매장 정보</h2>
    ${a.map(i=>`
      <label class="admin-field">
        <span>${i.label}</span>
        <input class="admin-input" data-key="${i.key}" value="${ut(String(t.info[i.key]??""))}" />
      </label>
    `).join("")}
  `,n.querySelectorAll(".admin-input").forEach(i=>{i.addEventListener("input",()=>{const o=i.dataset.key;t.info[o]=i.value,o==="hoursLabel"&&(t.info.hours=i.value),e()})}),n}function ut(t){return t.replace(/"/g,"&quot;")}async function mt(t){await S("data/restaurant.json",t.info,t.sha);const{sha:e}=await h("data/restaurant.json");t.sha=e}async function pt(){const{data:t,sha:e}=await h("data/gallery.json");return{gallery:t,gallerySha:e,pendingImages:new Map}}function gt(t,e,n){const a=document.createElement("div");a.className="admin-section";const i=()=>{var c;const o=t.gallery.signature.map((r,s)=>{const l=t.pendingImages.has(r),m=l?"":_(r),u=l?`<img src="" alt="" class="admin-sig-item__thumb" data-pending-path="${bt(r)}" />`:`<img src="${m}" alt="" class="admin-sig-item__thumb" />`,d=l?" (새 사진)":"";return`
        <div class="admin-sig-item" data-index="${s}">
          <span class="admin-sig-item__num">${s+1}</span>
          ${u}
          <div class="admin-sig-item__actions">
            <button type="button" class="admin-btn admin-btn--small" data-photo-sig data-index="${s}">
              사진 바꾸기${d}
            </button>
            <button type="button" class="admin-btn admin-btn--small admin-btn--ghost" data-move="up" data-index="${s}"
              ${s===0?"disabled":""}>↑</button>
            <button type="button" class="admin-btn admin-btn--small admin-btn--ghost" data-move="down" data-index="${s}"
              ${s===t.gallery.signature.length-1?"disabled":""}>↓</button>
            <button type="button" class="admin-btn admin-btn--danger admin-btn--small" data-delete-sig data-index="${s}">삭제</button>
          </div>
        </div>
      `}).join("");a.innerHTML=`
      <h2 class="admin-section__title">시그니처</h2>
      <p class="admin-note">홈페이지 상단 가로 스크롤 영역에 표시되는 사진입니다.</p>
      <div class="admin-sig-list">${o}</div>
      <button type="button" class="admin-btn admin-btn--ghost" data-add-sig>+ 이미지 추가</button>
    `,a.querySelectorAll("[data-pending-path]").forEach(r=>{const s=r.dataset.pendingPath,l=t.pendingImages.get(s);l&&(r.src=URL.createObjectURL(l.blob))}),a.querySelectorAll("[data-photo-sig]").forEach(r=>{r.addEventListener("click",()=>{const s=parseInt(r.dataset.index,10),l=t.gallery.signature[s];M({images:e,onSelectExisting:m=>{t.pendingImages.delete(l),t.gallery.signature[s]=m,n(),i()},onSelectFile:async m=>{r.textContent="최적화 중…";try{const{blob:u}=await L(m),d=`media/sig-${Date.now()}.webp`;t.pendingImages.delete(l),t.pendingImages.set(d,{blob:u,path:d}),t.gallery.signature[s]=d,n(),i()}catch(u){alert(u instanceof Error?u.message:"이미지 변환 실패"),r.textContent="사진 바꾸기"}}})})}),a.querySelectorAll("[data-delete-sig]").forEach(r=>{r.addEventListener("click",()=>{const s=parseInt(r.dataset.index,10);if(t.gallery.signature.length<=1){alert("시그니처는 최소 1장이 필요합니다.");return}if(!confirm("이 사진을 시그니처에서 제거할까요?"))return;const l=t.gallery.signature[s];t.pendingImages.delete(l),t.gallery.signature.splice(s,1),n(),i()})}),a.querySelectorAll("[data-move]").forEach(r=>{r.addEventListener("click",()=>{const s=parseInt(r.dataset.index,10),m=r.dataset.move==="up"?s-1:s+1;if(m<0||m>=t.gallery.signature.length)return;const u=t.gallery.signature;[u[s],u[m]]=[u[m],u[s]],n(),i()})}),(c=a.querySelector("[data-add-sig]"))==null||c.addEventListener("click",()=>{const r=e.find(s=>!t.gallery.signature.includes(s))??e[0];if(!r){alert("추가할 이미지가 없습니다. 새 사진을 업로드해 주세요.");return}t.gallery.signature.push(r),n(),i()})};return i(),a}function bt(t){return t.replace(/"/g,"&quot;")}async function ht(t){for(const[,{blob:n,path:a}]of t.pendingImages){const i=await E(a);await j(a,n,i==null?void 0:i.sha)}await S("data/gallery.json",t.gallery,t.gallerySha);const{sha:e}=await h("data/gallery.json");t.gallerySha=e,t.pendingImages.clear()}function ft(t,e){const n=new Set;t.heroPoster&&n.add(t.heroPoster);for(const a of t.signature)n.add(a);for(const a of t.grid)n.add(a);e.menuBoardImage&&n.add(e.menuBoardImage);for(const a of e.categories)for(const i of a.items)i.image&&n.add(i.image);return[...n].sort()}async function yt(t){N(t,()=>void H(t))}function N(t,e){const n=X();if(t.innerHTML="",n==="setup"){t.append(Y(e));return}if(n==="login"){t.append(Q(e));return}e()}async function H(t){t.innerHTML='<p class="loading">불러오는 중…</p>';let e,n,a,i,o=!1;try{[e,n,a]=await Promise.all([it(),ct(),pt()]),i=ft(a.gallery,e.menu)}catch(g){t.innerHTML=`<p class="admin-error">${g instanceof Error?g.message:"로드 실패"}</p>`;return}const c=document.createElement("div");c.className="admin-app";const r=document.createElement("nav");r.className="admin-tabs",r.innerHTML=`
    <button type="button" class="admin-tabs__btn admin-tabs__btn--active" data-tab="menu">메뉴</button>
    <button type="button" class="admin-tabs__btn" data-tab="signature">시그니처</button>
    <button type="button" class="admin-tabs__btn" data-tab="store">매장</button>
  `;const s=document.createElement("div");s.className="admin-content";const l=st(e,i,()=>{o=!0}),m=gt(a,i,()=>{o=!0}),u=lt(n,()=>{o=!0});m.hidden=!0,u.hidden=!0,s.append(l,m,u);const d=document.createElement("div");d.className="admin-save-bar",d.innerHTML=`
    <p class="admin-save-bar__msg" hidden></p>
    <button type="button" class="admin-btn admin-btn--primary admin-btn--block">저장하기</button>
  `;const p=d.querySelector(".admin-save-bar__msg"),b=d.querySelector(".admin-btn");b.addEventListener("click",async()=>{b.disabled=!0,b.textContent="저장 중…",p.hidden=!0;try{await dt(e),await ht(a),await mt(n),o=!1,p.textContent=z()?"저장됐어요! 홈페이지(/)를 새로고침하면 바로 보입니다. (로컬 테스트)":"저장됐어요! 홈페이지에서 새로고침하면 바로 보입니다.",p.className="admin-save-bar__msg admin-save-bar__msg--ok",p.hidden=!1}catch(g){p.textContent=g instanceof Error?g.message:"저장 실패",p.className="admin-save-bar__msg admin-save-bar__msg--err",p.hidden=!1}finally{b.disabled=!1,b.textContent="저장하기"}}),r.querySelectorAll(".admin-tabs__btn").forEach(g=>{g.addEventListener("click",()=>{r.querySelectorAll(".admin-tabs__btn").forEach(B=>B.classList.remove("admin-tabs__btn--active")),g.classList.add("admin-tabs__btn--active");const f=g.dataset.tab;l.hidden=f!=="menu",m.hidden=f!=="signature",u.hidden=f!=="store"})}),t.innerHTML="",c.append(V(()=>N(t,()=>H(t))),r,s,d),t.append(c),window.addEventListener("beforeunload",g=>{o&&g.preventDefault()})}const P=document.getElementById("admin-app");if(!P)throw new Error("#admin-app not found");yt(P);

import{p as S,f as x}from"./assets-DZw7ZkS0.js";const O="gitjunh",R="jin-jangeo",T="gh-pages",F="3140",N="jin_admin_github_token",I="jin_admin_unlocked";function J(){return sessionStorage.getItem(I)==="1"}function j(){return sessionStorage.getItem(N)}function K(t){sessionStorage.setItem(N,t.trim())}function W(){sessionStorage.setItem(I,"1")}function z(){sessionStorage.removeItem(I)}function Y(t){return t===F}function Q(){return!!j()}function V(){return!1}function X(){sessionStorage.setItem("jin_local_dev","1")}function Z(t){const e=document.createElement("div");e.className="admin-login";let n="";const a=()=>{e.innerHTML=`
      <h1 class="admin-login__title">관리자</h1>
      <p class="admin-login__sub">PIN 번호를 입력하세요</p>
      <div class="admin-login__dots">${"•".repeat(n.length)}${"○".repeat(Math.max(0,4-n.length))}</div>
      <p class="admin-login__error" hidden></p>
      <div class="pin-pad">
        ${[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map(s=>s===""?'<span class="pin-pad__empty"></span>':`<button type="button" class="pin-pad__key" data-key="${s}">${s}</button>`).join("")}
      </div>
    `;const i=e.querySelector(".admin-login__error");e.querySelectorAll(".pin-pad__key").forEach(s=>{s.addEventListener("click",()=>{const d=s.dataset.key;if(d==="⌫"?n=n.slice(0,-1):n.length<6&&(n+=d),n.length>=4){if(Y(n)){W(),i.hidden=!0,t();return}n.length>=6&&(i.textContent="PIN이 올바르지 않습니다.",i.hidden=!1,n="")}a()})})};return a(),e}function tt(t){var i,s;const e=document.createElement("div");e.className="admin-setup",e.innerHTML=`
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
    
  `;const n=e.querySelector(".admin-input"),a=e.querySelector(".admin-setup__error");return(i=e.querySelector(".admin-btn"))==null||i.addEventListener("click",()=>{const d=n.value.trim();if(!d.startsWith("github_pat_")&&!d.startsWith("ghp_")){a.textContent="올바른 GitHub 토큰을 입력하세요.",a.hidden=!1;return}K(d),t()}),(s=e.querySelector("[data-local-dev]"))==null||s.addEventListener("click",()=>{X(),t()}),e}function et(t){var n;const e=document.createElement("header");return e.className="admin-header",e.innerHTML=`
    <h1>장어명가 진 관리</h1>
    <button type="button" class="admin-header__logout">나가기</button>
  `,(n=e.querySelector(".admin-header__logout"))==null||n.addEventListener("click",()=>{z(),t()}),e}function nt(){return Q()?J()?"app":"login":"setup"}const at={maxWidth:1280,imageQuality:.72,videoCrf:30,videoMaxWidth:1280,audioBitrate:"96k"};function it(t,e,n){const a=Math.max(t,e);if(a<=n)return{width:t,height:e};const i=n/a;return{width:Math.round(t*i),height:Math.round(e*i)}}async function $(t,e=at,n){const a=await createImageBitmap(t),{width:i,height:s}=it(a.width,a.height,e.maxWidth),d=new OffscreenCanvas(i,s),r=d.getContext("2d");if(!r)throw new Error("Canvas 2D context를 사용할 수 없습니다.");return r.drawImage(a,0,0,i,s),a.close(),{blob:await d.convertToBlob({type:"image/webp",quality:e.imageQuality}),width:i,height:s}}function M(t){return`https://api.github.com/repos/${O}/${R}/contents/${t}`}function P(){const t=j();if(!t)throw new Error("GitHub 토큰이 없습니다.");return{Authorization:`Bearer ${t}`,Accept:"application/vnd.github+json","X-GitHub-Api-Version":"2022-11-28"}}async function B(t){try{return(await t.json()).message??t.statusText}catch{return t.statusText}}function st(t){const e=atob(t.replace(/\s/g,"")),n=new Uint8Array(e.length);for(let a=0;a<e.length;a++)n[a]=e.charCodeAt(a);return new TextDecoder("utf-8").decode(n)}function ot(t){const e=new TextEncoder().encode(t);let n="";for(let a=0;a<e.length;a++)n+=String.fromCharCode(e[a]);return btoa(n)}async function L(t){const e=await fetch(`${M(t)}?ref=${T}`,{headers:P()});if(e.status===404)return null;if(!e.ok)throw new Error(await B(e));const n=await e.json();return{sha:n.sha,content:st(n.content)}}async function A(t,e,n){const a=ot(JSON.stringify(e,null,2));await U(t,a,n)}async function H(t,e,n){const a=await e.arrayBuffer(),i=new Uint8Array(a);let s="";for(let d=0;d<i.length;d++)s+=String.fromCharCode(i[d]);await U(t,btoa(s),n)}async function U(t,e,n){const a={message:`admin: update ${t}`,content:e,branch:T};n&&(a.sha=n);const i=await fetch(M(t),{method:"PUT",headers:{...P(),"Content-Type":"application/json"},body:JSON.stringify(a)});if(!i.ok)throw new Error(await B(i))}async function v(t){const e=await L(t);if(!e)throw new Error(`${t} 파일이 없습니다. 먼저 배포해 주세요.`);return{data:JSON.parse(e.content),sha:e.sha}}function k(t){var h;const{images:e,onSelectExisting:n,onSelectFile:a}=t,i=document.createElement("div");i.className="photo-sheet-backdrop";const s=document.createElement("div");s.className="photo-sheet",s.setAttribute("role","dialog"),s.setAttribute("aria-label","사진 선택");const d=e.length>0?e.map(m=>`
        <button type="button" class="photo-sheet__thumb-btn" data-path="${rt(m)}">
          <img class="photo-sheet__thumb" src="${S(m)}" alt="" loading="lazy" />
        </button>
      `).join(""):'<p class="photo-sheet__empty">등록된 사진이 없습니다.</p>';s.innerHTML=`
    <div class="photo-sheet__handle" aria-hidden="true"></div>
    <h3 class="photo-sheet__title">사진 선택</h3>
    <p class="photo-sheet__sub">갤러리에서 선택</p>
    <div class="photo-sheet__grid">${d}</div>
    <button type="button" class="admin-btn admin-btn--primary admin-btn--block photo-sheet__upload">새 사진 업로드</button>
    <button type="button" class="admin-btn admin-btn--ghost admin-btn--block photo-sheet__cancel">취소</button>
    <input type="file" class="photo-sheet__file" accept="image/*" hidden />
  `;const r=s.querySelector(".photo-sheet__file");let o=!1;const u=()=>{o||(o=!0,i.remove(),document.body.style.overflow="")};i.addEventListener("click",m=>{m.target===i&&u()}),(h=s.querySelector(".photo-sheet__cancel"))==null||h.addEventListener("click",u),s.querySelectorAll(".photo-sheet__thumb-btn").forEach(m=>{m.addEventListener("click",()=>{const y=m.dataset.path;y&&(n(y),u())})}),s.querySelector(".photo-sheet__upload").addEventListener("click",()=>r.click()),r.addEventListener("change",async()=>{var y;const m=(y=r.files)==null?void 0:y[0];m&&(u(),await a(m))}),i.append(s),document.body.style.overflow="hidden",document.body.append(i)}function rt(t){return t.replace(/"/g,"&quot;")}const E="__menuBoard__";async function dt(){const{data:t,sha:e}=await v("data/menu.json");return{menu:t,menuSha:e,pendingImages:new Map}}function ct(t,e,n){const a=document.createElement("div");a.className="admin-section";const i=()=>{var y;const d=t.menu.tableSetting,r=t.menu.menuBoardImage,o=t.pendingImages.has(E),u=o?"":S(r),f=o?`<img src="" alt="" class="admin-board__thumb" data-pending="${E}" />`:`<img src="${u}" alt="메뉴판" class="admin-board__thumb" />`,h=o?" (새 사진)":"";let m=`
      <h2 class="admin-section__title">메뉴 관리</h2>
      <p class="admin-note">${d.label}: 대인 ${x(d.adult)} / 소인 ${x(d.child)}</p>
      <div class="admin-board">
        <h3 class="admin-board__label">메뉴판 전체 보기</h3>
        <div class="admin-board__row">
          ${f}
          <button type="button" class="admin-btn admin-btn--small" data-photo-board>
            메뉴판 사진 바꾸기${h}
          </button>
        </div>
      </div>
    `;for(const l of t.menu.categories){m+=`
        <details class="admin-accordion" open>
          <summary class="admin-accordion__title">${l.name}</summary>
          <div class="admin-accordion__body">
      `;for(const p of l.items)m+=lt(l,p,t);m+=`
            <button type="button" class="admin-btn admin-btn--ghost" data-add="${l.id}">+ 메뉴 추가</button>
          </div>
        </details>
      `}a.innerHTML=m,(y=a.querySelector("[data-photo-board]"))==null||y.addEventListener("click",l=>{const p=l.currentTarget;k({images:e,onSelectExisting:g=>{t.pendingImages.delete(E),t.menu.menuBoardImage=g,n(),i()},onSelectFile:async g=>{p.textContent="최적화 중…";try{const{blob:c}=await $(g),b=`media/menu-board-${Date.now()}.webp`;t.pendingImages.set(E,{blob:c,path:b}),t.menu.menuBoardImage=b,n(),i()}catch(c){alert(c instanceof Error?c.message:"이미지 변환 실패"),p.textContent="메뉴판 사진 바꾸기"}}})}),a.querySelectorAll("[data-field]").forEach(l=>{l.addEventListener("input",()=>{const{catId:p,itemId:g,field:c}=l.dataset,b=w(t.menu,p,g);b&&(c==="name"&&(b.name=l.value),c==="price"&&(b.price=parseInt(l.value,10)||0),n())})}),a.querySelectorAll("[data-delete]").forEach(l=>{l.addEventListener("click",()=>{const{catId:p,itemId:g}=l.dataset;if(!confirm("이 메뉴를 삭제할까요?"))return;const c=t.menu.categories.find(b=>b.id===p);c&&(c.items=c.items.filter(b=>b.id!==g)),n(),i()})}),a.querySelectorAll("[data-photo]").forEach(l=>{l.addEventListener("click",()=>{const{catId:p,itemId:g}=l.dataset;k({images:e,onSelectExisting:c=>{const b=w(t.menu,p,g);b&&(t.pendingImages.delete(g),b.image=c,n(),i())},onSelectFile:async c=>{const b=w(t.menu,p,g);if(b){l.textContent="최적화 중…";try{const{blob:_}=await $(c),q=`media/menu-${g}-${Date.now()}.webp`;t.pendingImages.set(g,{blob:_,path:q}),b.image=q,n(),i()}catch(_){alert(_ instanceof Error?_.message:"이미지 변환 실패"),l.textContent="사진 바꾸기"}}}})})}),a.querySelectorAll("[data-add]").forEach(l=>{l.addEventListener("click",()=>{const p=l.dataset.add,g=t.menu.categories.find(b=>b.id===p);if(!g)return;const c=`item-${Date.now()}`;g.items.push({id:c,name:"새 메뉴",price:0,image:null}),n(),i()})}),s()},s=()=>{a.querySelectorAll("[data-pending]").forEach(d=>{const r=d.dataset.pending,o=t.pendingImages.get(r);o&&(d.src=URL.createObjectURL(o.blob))})};return i(),a}function lt(t,e,n){const a=n.pendingImages.get(e.id),i=a?"":e.image?S(e.image):"",s=a?`<img src="" alt="" class="admin-item__thumb" data-pending="${e.id}" />`:e.image?`<img src="${i}" alt="" class="admin-item__thumb" />`:'<div class="admin-item__thumb admin-item__thumb--empty">사진 없음</div>',d=a?" (새 사진)":"";return`
    <div class="admin-item">
      ${s}
      <div class="admin-item__fields">
        <input class="admin-input" data-field="name" data-cat-id="${t.id}" data-item-id="${e.id}"
          value="${ut(e.name)}" placeholder="메뉴명" />
        <input class="admin-input" type="number" inputmode="numeric" data-field="price"
          data-cat-id="${t.id}" data-item-id="${e.id}" value="${e.price}" placeholder="가격" />
        <button type="button" class="admin-btn admin-btn--small" data-photo data-cat-id="${t.id}" data-item-id="${e.id}">
          사진 바꾸기${d}
        </button>
        <button type="button" class="admin-btn admin-btn--danger admin-btn--small"
          data-delete data-cat-id="${t.id}" data-item-id="${e.id}">삭제</button>
      </div>
    </div>
  `}function w(t,e,n){var a;return(a=t.categories.find(i=>i.id===e))==null?void 0:a.items.find(i=>i.id===n)}function ut(t){return t.replace(/"/g,"&quot;")}async function mt(t){for(const[,{blob:n,path:a}]of t.pendingImages){const i=await L(a);await H(a,n,i==null?void 0:i.sha)}await A("data/menu.json",t.menu,t.menuSha);const{sha:e}=await v("data/menu.json");t.menuSha=e,t.pendingImages.clear()}async function pt(){const{data:t,sha:e}=await v("data/restaurant.json");return{info:t,sha:e}}function gt(t,e){const n=document.createElement("div");n.className="admin-section";const a=[{key:"name",label:"식당명"},{key:"tagline",label:"한 줄 소개"},{key:"phone",label:"전화번호"},{key:"mobile",label:"휴대폰"},{key:"address",label:"주소"},{key:"hoursLabel",label:"영업시간"},{key:"closed",label:"휴무일"}];return n.innerHTML=`
    <h2 class="admin-section__title">매장 정보</h2>
    ${a.map(i=>`
      <label class="admin-field">
        <span>${i.label}</span>
        <input class="admin-input" data-key="${i.key}" value="${bt(String(t.info[i.key]??""))}" />
      </label>
    `).join("")}
  `,n.querySelectorAll(".admin-input").forEach(i=>{i.addEventListener("input",()=>{const s=i.dataset.key;t.info[s]=i.value,s==="hoursLabel"&&(t.info.hours=i.value),e()})}),n}function bt(t){return t.replace(/"/g,"&quot;")}async function ht(t){await A("data/restaurant.json",t.info,t.sha);const{sha:e}=await v("data/restaurant.json");t.sha=e}async function ft(){const{data:t,sha:e}=await v("data/gallery.json");return{gallery:t,gallerySha:e,pendingImages:new Map}}function yt(t,e,n){const a=document.createElement("div");a.className="admin-section";const i=()=>{var d;const s=t.gallery.signature.map((r,o)=>{const u=t.pendingImages.has(r),f=u?"":S(r),h=u?`<img src="" alt="" class="admin-sig-item__thumb" data-pending-path="${_t(r)}" />`:`<img src="${f}" alt="" class="admin-sig-item__thumb" />`,m=u?" (새 사진)":"";return`
        <div class="admin-sig-item" data-index="${o}">
          <span class="admin-sig-item__num">${o+1}</span>
          ${h}
          <div class="admin-sig-item__actions">
            <button type="button" class="admin-btn admin-btn--small" data-photo-sig data-index="${o}">
              사진 바꾸기${m}
            </button>
            <button type="button" class="admin-btn admin-btn--small admin-btn--ghost" data-move="up" data-index="${o}"
              ${o===0?"disabled":""}>↑</button>
            <button type="button" class="admin-btn admin-btn--small admin-btn--ghost" data-move="down" data-index="${o}"
              ${o===t.gallery.signature.length-1?"disabled":""}>↓</button>
            <button type="button" class="admin-btn admin-btn--danger admin-btn--small" data-delete-sig data-index="${o}">삭제</button>
          </div>
        </div>
      `}).join("");a.innerHTML=`
      <h2 class="admin-section__title">시그니처</h2>
      <p class="admin-note">홈페이지 상단 가로 스크롤 영역에 표시되는 사진입니다.</p>
      <div class="admin-sig-list">${s}</div>
      <button type="button" class="admin-btn admin-btn--ghost" data-add-sig>+ 이미지 추가</button>
    `,a.querySelectorAll("[data-pending-path]").forEach(r=>{const o=r.dataset.pendingPath,u=t.pendingImages.get(o);u&&(r.src=URL.createObjectURL(u.blob))}),a.querySelectorAll("[data-photo-sig]").forEach(r=>{r.addEventListener("click",()=>{const o=parseInt(r.dataset.index,10),u=t.gallery.signature[o];k({images:e,onSelectExisting:f=>{t.pendingImages.delete(u),t.gallery.signature[o]=f,n(),i()},onSelectFile:async f=>{r.textContent="최적화 중…";try{const{blob:h}=await $(f),m=`media/sig-${Date.now()}.webp`;t.pendingImages.delete(u),t.pendingImages.set(m,{blob:h,path:m}),t.gallery.signature[o]=m,n(),i()}catch(h){alert(h instanceof Error?h.message:"이미지 변환 실패"),r.textContent="사진 바꾸기"}}})})}),a.querySelectorAll("[data-delete-sig]").forEach(r=>{r.addEventListener("click",()=>{const o=parseInt(r.dataset.index,10);if(t.gallery.signature.length<=1){alert("시그니처는 최소 1장이 필요합니다.");return}if(!confirm("이 사진을 시그니처에서 제거할까요?"))return;const u=t.gallery.signature[o];t.pendingImages.delete(u),t.gallery.signature.splice(o,1),n(),i()})}),a.querySelectorAll("[data-move]").forEach(r=>{r.addEventListener("click",()=>{const o=parseInt(r.dataset.index,10),f=r.dataset.move==="up"?o-1:o+1;if(f<0||f>=t.gallery.signature.length)return;const h=t.gallery.signature;[h[o],h[f]]=[h[f],h[o]],n(),i()})}),(d=a.querySelector("[data-add-sig]"))==null||d.addEventListener("click",()=>{const r=e.find(o=>!t.gallery.signature.includes(o))??e[0];if(!r){alert("추가할 이미지가 없습니다. 새 사진을 업로드해 주세요.");return}t.gallery.signature.push(r),n(),i()})};return i(),a}function _t(t){return t.replace(/"/g,"&quot;")}async function vt(t){for(const[,{blob:n,path:a}]of t.pendingImages){const i=await L(a);await H(a,n,i==null?void 0:i.sha)}await A("data/gallery.json",t.gallery,t.gallerySha);const{sha:e}=await v("data/gallery.json");t.gallerySha=e,t.pendingImages.clear()}function Et(t,e){const n=new Set;t.heroPoster&&n.add(t.heroPoster);for(const a of t.signature)n.add(a);for(const a of t.grid)n.add(a);e.menuBoardImage&&n.add(e.menuBoardImage);for(const a of e.categories)for(const i of a.items)i.image&&n.add(i.image);return[...n].sort()}async function St(t){C(t,()=>void D(t))}function C(t,e){const n=nt();if(t.innerHTML="",n==="setup"){t.append(tt(e));return}if(n==="login"){t.append(Z(e));return}e()}async function D(t){t.innerHTML='<p class="loading">불러오는 중…</p>';let e,n,a,i,s=!1,d=!1,r=!1;try{[e,n,a]=await Promise.all([dt(),pt(),ft()]),i=Et(a.gallery,e.menu)}catch(c){t.innerHTML=`<p class="admin-error">${c instanceof Error?c.message:"로드 실패"}</p>`;return}const o=document.createElement("div");o.className="admin-app";const u=document.createElement("nav");u.className="admin-tabs",u.innerHTML=`
    <button type="button" class="admin-tabs__btn admin-tabs__btn--active" data-tab="menu">메뉴</button>
    <button type="button" class="admin-tabs__btn" data-tab="signature">시그니처</button>
    <button type="button" class="admin-tabs__btn" data-tab="store">매장</button>
  `;const f=document.createElement("div");f.className="admin-content";const h=ct(e,i,()=>{s=!0}),m=yt(a,i,()=>{d=!0}),y=gt(n,()=>{r=!0});m.hidden=!0,y.hidden=!0,f.append(h,m,y);const l=document.createElement("div");l.className="admin-save-bar",l.innerHTML=`
    <p class="admin-save-bar__msg" hidden></p>
    <button type="button" class="admin-btn admin-btn--primary admin-btn--block">저장하기</button>
  `;const p=l.querySelector(".admin-save-bar__msg"),g=l.querySelector(".admin-btn");g.addEventListener("click",async()=>{g.disabled=!0,g.textContent="저장 중…",p.hidden=!0;try{if(!s&&!d&&!r){p.textContent="변경된 내용이 없습니다.",p.className="admin-save-bar__msg",p.hidden=!1;return}s&&await mt(e),d&&await vt(a),r&&await ht(n),s=!1,d=!1,r=!1,p.textContent=V()?"저장됐어요! 홈페이지(/)를 새로고침하면 바로 보입니다. (로컬 테스트)":"저장됐어요! 홈페이지에서 새로고침하면 바로 보입니다.",p.className="admin-save-bar__msg admin-save-bar__msg--ok",p.hidden=!1}catch(c){p.textContent=c instanceof Error?c.message:"저장 실패",p.className="admin-save-bar__msg admin-save-bar__msg--err",p.hidden=!1}finally{g.disabled=!1,g.textContent="저장하기"}}),u.querySelectorAll(".admin-tabs__btn").forEach(c=>{c.addEventListener("click",()=>{u.querySelectorAll(".admin-tabs__btn").forEach(_=>_.classList.remove("admin-tabs__btn--active")),c.classList.add("admin-tabs__btn--active");const b=c.dataset.tab;h.hidden=b!=="menu",m.hidden=b!=="signature",y.hidden=b!=="store"})}),t.innerHTML="",o.append(et(()=>C(t,()=>D(t))),u,f,l),t.append(o),window.addEventListener("beforeunload",c=>{(s||d||r)&&c.preventDefault()})}const G=document.getElementById("admin-app");if(!G)throw new Error("#admin-app not found");St(G);

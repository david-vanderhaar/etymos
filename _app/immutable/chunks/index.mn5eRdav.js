function v(){}const ct=t=>t;function lt(t,e){for(const n in e)t[n]=e[n];return t}function K(t){return t()}function W(){return Object.create(null)}function E(t){t.forEach(K)}function B(t){return typeof t=="function"}function Lt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function ut(t){return Object.keys(t).length===0}function at(t,...e){if(t==null)return v;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function zt(t,e,n){t.$$.on_destroy.push(at(e,n))}function Bt(t,e,n,i){if(t){const r=Q(t,e,n,i);return t[0](r)}}function Q(t,e,n,i){return t[1]&&i?lt(n.ctx.slice(),t[1](i(e))):n.ctx}function Ht(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const l=[],o=Math.max(e.dirty.length,r.length);for(let s=0;s<o;s+=1)l[s]=e.dirty[s]|r[s];return l}return e.dirty|r}return e.dirty}function qt(t,e,n,i,r,l){if(r){const o=Q(e,n,i,l);t.p(o,r)}}function Ft(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function Wt(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}const U=typeof window<"u";let ft=U?()=>window.performance.now():()=>Date.now(),H=U?t=>requestAnimationFrame(t):v;const x=new Set;function V(t){x.forEach(e=>{e.c(t)||(x.delete(e),e.f())}),x.size!==0&&H(V)}function _t(t){let e;return x.size===0&&H(V),{promise:new Promise(n=>{x.add(e={c:t,f:n})}),abort(){x.delete(e)}}}let O=!1;function dt(){O=!0}function ht(){O=!1}function mt(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function pt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const c=[];for(let u=0;u<e.length;u++){const _=e[u];_.claim_order!==void 0&&c.push(_)}e=c}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let c=0;c<e.length;c++){const u=e[c].claim_order,_=(r>0&&e[n[r]].claim_order<=u?r+1:mt(1,r,h=>e[n[h]].claim_order,u))-1;i[c]=n[_]+1;const a=_+1;n[a]=c,r=Math.max(a,r)}const l=[],o=[];let s=e.length-1;for(let c=n[r]+1;c!=0;c=i[c-1]){for(l.push(e[c-1]);s>=c;s--)o.push(e[s]);s--}for(;s>=0;s--)o.push(e[s]);l.reverse(),o.sort((c,u)=>c.claim_order-u.claim_order);for(let c=0,u=0;c<o.length;c++){for(;u<l.length&&o[c].claim_order>=l[u].claim_order;)u++;const _=u<l.length?l[u]:null;t.insertBefore(o[c],_)}}function yt(t,e){t.appendChild(e)}function X(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function gt(t){const e=Z("style");return bt(X(t),e),e.sheet}function bt(t,e){return yt(t.head||t,e),e.sheet}function $t(t,e){if(O){for(pt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Gt(t,e,n){O&&!n?$t(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function Y(t){t.parentNode&&t.parentNode.removeChild(t)}function It(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function Z(t){return document.createElement(t)}function xt(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function q(t){return document.createTextNode(t)}function Jt(){return q(" ")}function Kt(){return q("")}function Qt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function Ut(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function wt(t){return Array.from(t.childNodes)}function vt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function tt(t,e,n,i,r=!1){vt(t);const l=(()=>{for(let o=t.claim_info.last_index;o<t.length;o++){const s=t[o];if(e(s)){const c=n(s);return c===void 0?t.splice(o,1):t[o]=c,r||(t.claim_info.last_index=o),s}}for(let o=t.claim_info.last_index-1;o>=0;o--){const s=t[o];if(e(s)){const c=n(s);return c===void 0?t.splice(o,1):t[o]=c,r?c===void 0&&t.claim_info.last_index--:t.claim_info.last_index=o,s}}return i()})();return l.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,l}function et(t,e,n,i){return tt(t,r=>r.nodeName===e,r=>{const l=[];for(let o=0;o<r.attributes.length;o++){const s=r.attributes[o];n[s.name]||l.push(s.name)}l.forEach(o=>r.removeAttribute(o))},()=>i(e))}function Vt(t,e,n){return et(t,e,n,Z)}function Xt(t,e,n){return et(t,e,n,xt)}function Et(t,e){return tt(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>q(e),!0)}function Yt(t){return Et(t," ")}function Zt(t,e){e=""+e,t.data!==e&&(t.data=e)}function te(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,"")}function ee(t,e,n){t.classList[n?"add":"remove"](e)}function nt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,i,e),r}function ne(t,e){const n=[];let i=0;for(const r of e.childNodes)if(r.nodeType===8){const l=r.textContent.trim();l===`HEAD_${t}_END`?(i-=1,n.push(r)):l===`HEAD_${t}_START`&&(i+=1,n.push(r))}else i>0&&n.push(r);return n}function ie(t,e){return new t(e)}const C=new Map;let D=0;function Nt(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function kt(t,e){const n={stylesheet:gt(e),rules:{}};return C.set(t,n),n}function G(t,e,n,i,r,l,o,s=0){const c=16.666/i;let u=`{
`;for(let y=0;y<=1;y+=c){const g=e+(n-e)*l(y);u+=y*100+`%{${o(g,1-g)}}
`}const _=u+`100% {${o(n,1-n)}}
}`,a=`__svelte_${Nt(_)}_${s}`,h=X(t),{stylesheet:f,rules:d}=C.get(h)||kt(h,t);d[a]||(d[a]=!0,f.insertRule(`@keyframes ${a} ${_}`,f.cssRules.length));const m=t.style.animation||"";return t.style.animation=`${m?`${m}, `:""}${a} ${i}ms linear ${r}ms 1 both`,D+=1,a}function At(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?l=>l.indexOf(e)<0:l=>l.indexOf("__svelte")===-1),r=n.length-i.length;r&&(t.style.animation=i.join(", "),D-=r,D||St())}function St(){H(()=>{D||(C.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&Y(e)}),C.clear())})}let A;function k(t){A=t}function F(){if(!A)throw new Error("Function called outside component initialization");return A}function re(t){F().$$.on_mount.push(t)}function se(t){F().$$.after_update.push(t)}function oe(){const t=F();return(e,n,{cancelable:i=!1}={})=>{const r=t.$$.callbacks[e];if(r){const l=nt(e,n,{cancelable:i});return r.slice().forEach(o=>{o.call(t,l)}),!l.defaultPrevented}return!0}}const $=[],I=[];let w=[];const J=[],it=Promise.resolve();let z=!1;function rt(){z||(z=!0,it.then(st))}function ce(){return rt(),it}function M(t){w.push(t)}const R=new Set;let b=0;function st(){if(b!==0)return;const t=A;do{try{for(;b<$.length;){const e=$[b];b++,k(e),jt(e.$$)}}catch(e){throw $.length=0,b=0,e}for(k(null),$.length=0,b=0;I.length;)I.pop()();for(let e=0;e<w.length;e+=1){const n=w[e];R.has(n)||(R.add(n),n())}w.length=0}while($.length);for(;J.length;)J.pop()();z=!1,R.clear(),k(t)}function jt(t){if(t.fragment!==null){t.update(),E(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(M)}}function Ct(t){const e=[],n=[];w.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),w=e}let N;function Dt(){return N||(N=Promise.resolve(),N.then(()=>{N=null})),N}function L(t,e,n){t.dispatchEvent(nt(`${e?"intro":"outro"}${n}`))}const j=new Set;let p;function le(){p={r:0,c:[],p}}function ue(){p.r||E(p.c),p=p.p}function Mt(t,e){t&&t.i&&(j.delete(t),t.i(e))}function ae(t,e,n,i){if(t&&t.o){if(j.has(t))return;j.add(t),p.c.push(()=>{j.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const Ot={duration:0};function fe(t,e,n,i){const r={direction:"both"};let l=e(t,n,r),o=i?0:1,s=null,c=null,u=null;function _(){u&&At(t,u)}function a(f,d){const m=f.b-o;return d*=Math.abs(m),{a:o,b:f.b,d:m,duration:d,start:f.start,end:f.start+d,group:f.group}}function h(f){const{delay:d=0,duration:m=300,easing:y=ct,tick:g=v,css:P}=l||Ot,T={start:ft()+d,b:f};f||(T.group=p,p.r+=1),s||c?c=T:(P&&(_(),u=G(t,o,f,m,d,y,P)),f&&g(0,1),s=a(T,m),M(()=>L(t,f,"start")),_t(S=>{if(c&&S>c.start&&(s=a(c,m),c=null,L(t,s.b,"start"),P&&(_(),u=G(t,o,s.b,s.duration,0,y,l.css))),s){if(S>=s.end)g(o=s.b,1-o),L(t,s.b,"end"),c||(s.b?_():--s.group.r||E(s.group.c)),s=null;else if(S>=s.start){const ot=S-s.start;o=s.a+s.d*y(ot/s.duration),g(o,1-o)}}return!!(s||c)}))}return{run(f){B(l)?Dt().then(()=>{l=l(r),h(f)}):h(f)},end(){_(),s=c=null}}}function _e(t,e){const n={},i={},r={$$scope:1};let l=t.length;for(;l--;){const o=t[l],s=e[l];if(s){for(const c in o)c in s||(i[c]=1);for(const c in s)r[c]||(n[c]=s[c],r[c]=1);t[l]=s}else for(const c in o)r[c]=1}for(const o in i)o in n||(n[o]=void 0);return n}function de(t){return typeof t=="object"&&t!==null?t:{}}function he(t){t&&t.c()}function me(t,e){t&&t.l(e)}function Pt(t,e,n,i){const{fragment:r,after_update:l}=t.$$;r&&r.m(e,n),i||M(()=>{const o=t.$$.on_mount.map(K).filter(B);t.$$.on_destroy?t.$$.on_destroy.push(...o):E(o),t.$$.on_mount=[]}),l.forEach(M)}function Tt(t,e){const n=t.$$;n.fragment!==null&&(Ct(n.after_update),E(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Rt(t,e){t.$$.dirty[0]===-1&&($.push(t),rt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function pe(t,e,n,i,r,l,o,s=[-1]){const c=A;k(t);const u=t.$$={fragment:null,ctx:[],props:l,update:v,not_equal:r,bound:W(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:W(),dirty:s,skip_bound:!1,root:e.target||c.$$.root};let _=!1;if(u.ctx=n?n(t,e.props||{},(a,h,...f)=>{const d=f.length?f[0]:h;return u.ctx&&r(u.ctx[a],u.ctx[a]=d)&&(!u.skip_bound&&u.bound[a]&&u.bound[a](d),_&&Rt(t,a)),h}):[],u.update(),_=!0,E(u.before_update),u.fragment=i?i(u.ctx):!1,e.target){if(e.hydrate){dt();const a=wt(e.target);u.fragment&&u.fragment.l(a),a.forEach(Y)}else u.fragment&&u.fragment.c();e.intro&&Mt(t.$$.fragment),Pt(t,e.target,e.anchor,e.customElement),ht(),st()}k(c)}class ye{$destroy(){Tt(this,1),this.$destroy=v}$on(e,n){if(!B(n))return v;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!ut(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{he as A,me as B,Pt as C,Tt as D,ne as E,M as F,fe as G,ce as H,ct as I,Bt as J,qt as K,Ft as L,Ht as M,lt as N,Wt as O,xt as P,Xt as Q,_e as R,ye as S,de as T,It as U,Qt as V,B as W,ee as X,E as Y,oe as Z,Jt as a,wt as b,Vt as c,Et as d,Z as e,Y as f,Yt as g,Gt as h,pe as i,$t as j,Zt as k,zt as l,Kt as m,v as n,ae as o,ue as p,Mt as q,se as r,Lt as s,q as t,re as u,Ut as v,te as w,le as x,I as y,ie as z};

import{n as c,s as g}from"./index.B2EbtJf1.js";const e=[];function d(n,a=c){let o;const i=new Set;function r(t){if(g(n,t)&&(n=t,o)){const b=!e.length;for(const s of i)s[1](),e.push(s,n);if(b){for(let s=0;s<e.length;s+=2)e[s][0](e[s+1]);e.length=0}}}function l(t){r(t(n))}function _(t,b=c){const s=[t,b];return i.add(s),i.size===1&&(o=a(r)||c),t(n),()=>{i.delete(s),i.size===0&&o&&(o(),o=null)}}return{set:r,update:l,subscribe:_}}var f;const h=((f=globalThis.__sveltekit_1f38tge)==null?void 0:f.base)??"/etymos";var u;const m=((u=globalThis.__sveltekit_1f38tge)==null?void 0:u.assets)??h;export{m as a,h as b,d as w};

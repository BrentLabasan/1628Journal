import{D as s,S as e,i as a,s as t,e as r,k as l,E as c,t as v,c as o,a as i,d as f,n as h,g as n,b as d,F as p,f as u,G as m,H as k,I as b,J as g,j as E,m as w,o as $,K as A,v as I,r as L,w as x}from"../chunks/vendor-5f71d5b7.js";const _={subscribe:e=>(()=>{const e=s("__svelte__");return{page:{subscribe:e.page.subscribe},navigating:{subscribe:e.navigating.subscribe},get preloading(){return console.error("stores.preloading is deprecated; use stores.navigating instead"),{subscribe:e.navigating.subscribe}},session:e.session}})().page.subscribe(e)};function B(s){let e,a,t,b,g,E,w,$,A,I,L,x,_,B,D,H,K,M,S,y,T,V,j,C,F,G,N;return{c(){e=r("header"),a=r("div"),t=r("a"),b=r("img"),E=l(),w=r("nav"),$=c("svg"),A=c("path"),I=l(),L=r("ul"),x=r("li"),_=r("a"),B=v("Home"),D=l(),H=r("li"),K=r("a"),M=v("About"),S=l(),y=r("li"),T=r("a"),V=v("Todos"),j=l(),C=c("svg"),F=c("path"),G=l(),N=r("div"),this.h()},l(s){e=o(s,"HEADER",{class:!0});var r=i(e);a=o(r,"DIV",{class:!0});var l=i(a);t=o(l,"A",{href:!0,class:!0});var c=i(t);b=o(c,"IMG",{src:!0,alt:!0,class:!0}),c.forEach(f),l.forEach(f),E=h(r),w=o(r,"NAV",{class:!0});var v=i(w);$=o(v,"svg",{viewBox:!0,"aria-hidden":!0,class:!0},1);var d=i($);A=o(d,"path",{d:!0,class:!0},1),i(A).forEach(f),d.forEach(f),I=h(v),L=o(v,"UL",{class:!0});var p=i(L);x=o(p,"LI",{class:!0});var u=i(x);_=o(u,"A",{"sveltekit:prefetch":!0,href:!0,class:!0});var m=i(_);B=n(m,"Home"),m.forEach(f),u.forEach(f),D=h(p),H=o(p,"LI",{class:!0});var k=i(H);K=o(k,"A",{"sveltekit:prefetch":!0,href:!0,class:!0});var g=i(K);M=n(g,"About"),g.forEach(f),k.forEach(f),S=h(p),y=o(p,"LI",{class:!0});var O=i(y);T=o(O,"A",{"sveltekit:prefetch":!0,href:!0,class:!0});var R=i(T);V=n(R,"Todos"),R.forEach(f),O.forEach(f),p.forEach(f),j=h(v),C=o(v,"svg",{viewBox:!0,"aria-hidden":!0,class:!0},1);var Z=i(C);F=o(Z,"path",{d:!0,class:!0},1),i(F).forEach(f),Z.forEach(f),v.forEach(f),G=h(r),N=o(r,"DIV",{class:!0}),i(N).forEach(f),r.forEach(f),this.h()},h(){b.src!==(g="/_app/assets/svelte-logo.87df40b8.svg")&&d(b,"src","/_app/assets/svelte-logo.87df40b8.svg"),d(b,"alt","SvelteKit"),d(b,"class","svelte-1twf6mk"),d(t,"href","https://kit.svelte.dev"),d(t,"class","svelte-1twf6mk"),d(a,"class","corner svelte-1twf6mk"),d(A,"d","M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z"),d(A,"class","svelte-1twf6mk"),d($,"viewBox","0 0 2 3"),d($,"aria-hidden","true"),d($,"class","svelte-1twf6mk"),d(_,"sveltekit:prefetch",""),d(_,"href","/"),d(_,"class","svelte-1twf6mk"),d(x,"class","svelte-1twf6mk"),p(x,"active","/"===s[0].path),d(K,"sveltekit:prefetch",""),d(K,"href","/about"),d(K,"class","svelte-1twf6mk"),d(H,"class","svelte-1twf6mk"),p(H,"active","/about"===s[0].path),d(T,"sveltekit:prefetch",""),d(T,"href","/todos"),d(T,"class","svelte-1twf6mk"),d(y,"class","svelte-1twf6mk"),p(y,"active","/todos"===s[0].path),d(L,"class","svelte-1twf6mk"),d(F,"d","M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z"),d(F,"class","svelte-1twf6mk"),d(C,"viewBox","0 0 2 3"),d(C,"aria-hidden","true"),d(C,"class","svelte-1twf6mk"),d(w,"class","svelte-1twf6mk"),d(N,"class","corner svelte-1twf6mk"),d(e,"class","svelte-1twf6mk")},m(s,r){u(s,e,r),m(e,a),m(a,t),m(t,b),m(e,E),m(e,w),m(w,$),m($,A),m(w,I),m(w,L),m(L,x),m(x,_),m(_,B),m(L,D),m(L,H),m(H,K),m(K,M),m(L,S),m(L,y),m(y,T),m(T,V),m(w,j),m(w,C),m(C,F),m(e,G),m(e,N)},p(s,[e]){1&e&&p(x,"active","/"===s[0].path),1&e&&p(H,"active","/about"===s[0].path),1&e&&p(y,"active","/todos"===s[0].path)},i:k,o:k,d(s){s&&f(e)}}}function D(s,e,a){let t;return b(s,_,(s=>a(0,t=s))),[t]}class H extends e{constructor(s){super(),a(this,s,D,B,t,{})}}function K(s){let e,a,t,c,p,k,b,_,B,D,K;e=new H({});const M=s[1].default,S=g(M,s,s[0],null);return{c(){E(e.$$.fragment),a=l(),t=r("main"),S&&S.c(),c=l(),p=r("footer"),k=r("p"),b=v("visit "),_=r("a"),B=v("kit.svelte.dev"),D=v(" to learn SvelteKit"),this.h()},l(s){w(e.$$.fragment,s),a=h(s),t=o(s,"MAIN",{class:!0});var r=i(t);S&&S.l(r),r.forEach(f),c=h(s),p=o(s,"FOOTER",{class:!0});var l=i(p);k=o(l,"P",{});var v=i(k);b=n(v,"visit "),_=o(v,"A",{href:!0,class:!0});var d=i(_);B=n(d,"kit.svelte.dev"),d.forEach(f),D=n(v," to learn SvelteKit"),v.forEach(f),l.forEach(f),this.h()},h(){d(t,"class","svelte-fyr0b4"),d(_,"href","https://kit.svelte.dev"),d(_,"class","svelte-fyr0b4"),d(p,"class","svelte-fyr0b4")},m(s,r){$(e,s,r),u(s,a,r),u(s,t,r),S&&S.m(t,null),u(s,c,r),u(s,p,r),m(p,k),m(k,b),m(k,_),m(_,B),m(k,D),K=!0},p(s,[e]){S&&S.p&&(!K||1&e)&&A(S,M,s,s[0],e,null,null)},i(s){K||(I(e.$$.fragment,s),I(S,s),K=!0)},o(s){L(e.$$.fragment,s),L(S,s),K=!1},d(s){x(e,s),s&&f(a),s&&f(t),S&&S.d(s),s&&f(c),s&&f(p)}}}function M(s,e,a){let{$$slots:t={},$$scope:r}=e;return s.$$set=s=>{"$$scope"in s&&a(0,r=s.$$scope)},[r,t]}export default class extends e{constructor(s){super(),a(this,s,M,K,t,{})}}

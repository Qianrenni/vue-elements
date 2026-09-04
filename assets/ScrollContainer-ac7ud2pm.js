import{D as h}from"./DemoBlock-6OThNZgy.js";import{d as y,p as S,ak as x,o as t,c as k,w as u,a as r,e as w,t as s,al as C,b as E,u as p,am as g,f as m,F as B,r as b,g as c,_ as D}from"./index-3RdcHt7C.js";const I={class:"scroll-status"},N=`
\`\`\`html
<template>
  <QScrollContainer scroll-y @scroll="handleScroll" @ended="handleEnded">
    <div v-for="i in 30" :key="i" class="item">列表项 {{ i }}</div>
  </QScrollContainer>
</template>

<script setup>
import { ref } from 'vue';

const scrollPos = ref({ x: 0, y: 0 });
const handleScroll = (pos) => (scrollPos.value = pos);
const handleEnded = () => console.log('已滚动到底部');
<\/script>
\`\`\`
`,P=y({name:"DisplayLayoutScrollContainer",__name:"ScrollContainer",setup(V){const f=Array.from({length:30},(e,d)=>`列表项 ${d+1}`),o=c({x:0,y:0}),a=c(!1),l=c(null);let n=null;const v=e=>{o.value=e},_=()=>{a.value=!0};return S(()=>{l.value&&(n=new IntersectionObserver(e=>{e[0]?.isIntersecting&&window.dispatchEvent(new Event("resize"))}),n.observe(l.value))}),x(()=>{n?.disconnect()}),(e,d)=>(t(),k(h,{code:N},{default:u(()=>[r("div",{ref_key:"wrapRef",ref:l,class:"container-column gap-6"},[r("p",I,[w(" 滚动位置：x="+s(o.value.x)+"，y="+s(o.value.y)+" ",1),r("span",{class:C(a.value?"status-end":"status-normal")},s(a.value?"已到达底部":"滚动中…"),3)]),E(p(g),{"scroll-y":"",class:"scroll-demo",onScroll:v,onEnded:_},{default:u(()=>[(t(!0),m(B,null,b(p(f),i=>(t(),m("div",{key:i,class:"scroll-item"},s(i),1))),128))]),_:1})],512)]),_:1}))}}),L=D(P,[["__scopeId","data-v-9b531218"]]);export{L as default};

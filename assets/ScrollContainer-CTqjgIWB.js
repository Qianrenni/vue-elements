import{D as h}from"./DemoBlock-A_lV7GyA.js";import{d as y,P as S,ay as x,o as t,c as k,w as u,a as r,g as w,t as s,az as C,e as E,u as p,aA as g,h as m,F as B,r as b,k as c,_ as D}from"./index-OW0U782s.js";const P={class:"scroll-status"},z=`
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
`,I=y({name:"DisplayLayoutScrollContainer",__name:"ScrollContainer",setup(N){const f=Array.from({length:30},(e,d)=>`列表项 ${d+1}`),o=c({x:0,y:0}),a=c(!1),l=c(null);let n=null;const v=e=>{o.value=e},_=()=>{a.value=!0};return S(()=>{l.value&&(n=new IntersectionObserver(e=>{e[0]?.isIntersecting&&window.dispatchEvent(new Event("resize"))}),n.observe(l.value))}),x(()=>{n?.disconnect()}),(e,d)=>(t(),k(h,{code:z},{default:u(()=>[r("div",{ref_key:"wrapRef",ref:l,class:"container-column gap-6"},[r("p",P,[w(" 滚动位置：x="+s(o.value.x)+"，y="+s(o.value.y)+" ",1),r("span",{class:C(a.value?"status-end":"status-normal")},s(a.value?"已到达底部":"滚动中…"),3)]),E(p(g),{"scroll-y":"",class:"scroll-demo",onScroll:v,onEnded:_},{default:u(()=>[(t(!0),m(B,null,b(p(f),i=>(t(),m("div",{key:i,class:"scroll-item"},s(i),1))),128))]),_:1})],512)]),_:1}))}}),F=D(I,[["__scopeId","data-v-9b531218"]]);export{F as default};

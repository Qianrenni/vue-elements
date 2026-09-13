import{D as B}from"./DemoBlock-D3lRM5dy.js";import{d as h,O as y,aI as b,o as w,c as m,w as t,a as s,t as v,u as a,aN as _,b as o,T as p,e as d,g as i,_ as k}from"./index-BM7kyQMa.js";const x={class:"swipe-status"},A={class:"action-area"},C={class:"action-area"},D=`
\`\`\`html
<template>
  <QSwiperAction :threshold="50" @swipe="handleSwipe">
    <div class="item">向左滑动显示操作</div>
    <template #action>
      <QButton danger>删除</QButton>
    </template>
  </QSwiperAction>
</template>

<script setup>
const handleSwipe = () => console.log('swipe');
<\/script>
\`\`\`
`,I=h({name:"DisplayLayoutSwiperAction",__name:"SwiperAction",setup(N){const c=i(0),u=i(!1),f=i(0),l=i(null);let r=null;const S=()=>{c.value++},g=n=>{u.value=n};return y(()=>{l.value&&(r=new IntersectionObserver(n=>{n[0]?.isIntersecting&&f.value++}),r.observe(l.value))}),b(()=>{r?.disconnect()}),(n,e)=>(w(),m(B,{code:D},{default:t(()=>[s("div",{ref_key:"wrapRef",ref:l,class:"container-column gap-6 w-400"},[s("p",x," 已触发 swipe "+v(c.value)+" 次，操作区"+v(u.value?"已展开":"已收起"),1),(w(),m(a(_),{key:f.value,threshold:50,onSwipe:S,"onUpdate:open":g},{action:t(()=>[s("div",A,[o(a(p),{danger:""},{default:t(()=>[...e[0]||(e[0]=[d("删除",-1)])]),_:1}),o(a(p),null,{default:t(()=>[...e[1]||(e[1]=[d("置顶",-1)])]),_:1})])]),default:t(()=>[e[2]||(e[2]=s("div",{class:"item"},"左滑我显示操作按钮",-1))]),_:1})),o(a(_),{disabled:""},{action:t(()=>[s("div",C,[o(a(p),{danger:""},{default:t(()=>[...e[3]||(e[3]=[d("删除",-1)])]),_:1})])]),default:t(()=>[e[4]||(e[4]=s("div",{class:"item"},"已禁用滑动",-1))]),_:1})],512)]),_:1}))}}),T=k(I,[["__scopeId","data-v-502ee74a"]]);export{T as default};

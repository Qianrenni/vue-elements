import{D as g}from"./DemoBlock-6OThNZgy.js";import{d as k,p as y,ak as b,o as m,c as w,w as t,a as s,t as v,u as o,ao as _,b as n,E as p,e as d,g as i,_ as h}from"./index-3RdcHt7C.js";const x={class:"swipe-status"},A={class:"action-area"},C={class:"action-area"},D=`
\`\`\`html
<template>
  <QSwiperAction :threshold="50" @swipe="handleSwipe">
    <div class="item">向左滑动显示操作</div>
    <template #action>
      <QFormButton>删除</QFormButton>
    </template>
  </QSwiperAction>
</template>

<script setup>
const handleSwipe = () => console.log('swipe');
<\/script>
\`\`\`
`,Q=k({name:"DisplayLayoutSwiperAction",__name:"SwiperAction",setup(I){const u=i(0),c=i(!1),f=i(0),l=i(null);let r=null;const S=()=>{u.value++},B=a=>{c.value=a};return y(()=>{l.value&&(r=new IntersectionObserver(a=>{a[0]?.isIntersecting&&f.value++}),r.observe(l.value))}),b(()=>{r?.disconnect()}),(a,e)=>(m(),w(g,{code:D},{default:t(()=>[s("div",{ref_key:"wrapRef",ref:l,class:"container-column gap-6 w-400"},[s("p",x," 已触发 swipe "+v(u.value)+" 次，操作区"+v(c.value?"已展开":"已收起"),1),(m(),w(o(_),{key:f.value,threshold:50,onSwipe:S,"onUpdate:open":B},{action:t(()=>[s("div",A,[n(o(p),null,{default:t(()=>[...e[0]||(e[0]=[d("删除",-1)])]),_:1}),n(o(p),null,{default:t(()=>[...e[1]||(e[1]=[d("置顶",-1)])]),_:1})])]),default:t(()=>[e[2]||(e[2]=s("div",{class:"item"},"左滑我显示操作按钮",-1))]),_:1})),n(o(_),{disabled:""},{action:t(()=>[s("div",C,[n(o(p),null,{default:t(()=>[...e[3]||(e[3]=[d("删除",-1)])]),_:1})])]),default:t(()=>[e[4]||(e[4]=s("div",{class:"item"},"已禁用滑动",-1))]),_:1})],512)]),_:1}))}}),V=h(Q,[["__scopeId","data-v-e3ed864f"]]);export{V as default};

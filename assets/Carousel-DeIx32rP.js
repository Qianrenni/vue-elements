import{d as i,o as l,c,w as a,a as n,t as u,e as t,u as s,k as d,b as m,F as p,r as _,y as h,l as f,h as C,_ as g}from"./index-C_3vHk_U.js";import{D as k}from"./DemoBlock-DVF8Cmah.js";const v={class:"container-column gap-8"},x=`
\`\`\`html
<template>
  <QCarousel :width="600" :height="300">
    <QCarouselItem v-for="i in 4" :key="i">
      <div class="carousel-item">Slide {{ i }}</div>
    </QCarouselItem>
  </QCarousel>
</template>
\`\`\`
`,y=i({name:"DisplayCarousel",__name:"Carousel",setup(w){const o=C(0);return(B,r)=>(l(),c(k,{code:x},{default:a(()=>[n("div",v,[n("p",null,"Current Index: "+u(o.value),1),t(s(d),{width:600,height:300,onChange:r[0]||(r[0]=e=>o.value=e)},{default:a(()=>[(l(),m(p,null,_(4,e=>t(s(h),{key:e},{default:a(()=>[t(s(f),{src:"https://picsum.photos/600/300?random={{ i }}",width:600,height:300})]),_:1})),64))]),_:1})])]),_:1}))}}),Q=g(y,[["__scopeId","data-v-60fcd98b"]]);export{Q as default};

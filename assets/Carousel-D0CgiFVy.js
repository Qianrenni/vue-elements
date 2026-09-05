import{d as i,o as n,c,w as a,a as l,t as u,b as t,u as s,E as d,i as m,F as p,r as _,T as f,L as h,j as C,f as g}from"./index-Dsj8pkBt.js";import{D as v}from"./DemoBlock-854NQdRU.js";const k={class:"container-column gap-8"},x=`
\`\`\`html
<template>
  <QCarousel :width="600" :height="300">
    <QCarouselItem v-for="i in 4" :key="i">
      <div class="carousel-item">Slide {{ i }}</div>
    </QCarouselItem>
  </QCarousel>
</template>
\`\`\`
`,w=i({name:"DisplayCarousel",__name:"Carousel",setup(B){const o=C(0);return(I,r)=>(n(),c(v,{code:x},{default:a(()=>[l("div",k,[l("p",null,"Current Index: "+u(o.value),1),t(s(d),{width:600,height:300,onChange:r[0]||(r[0]=e=>o.value=e)},{default:a(()=>[(n(),m(p,null,_(4,e=>t(s(f),{key:e},{default:a(()=>[t(s(h),{src:"https://picsum.photos/600/300?random={{ i }}",width:600,height:300})]),_:1})),64))]),_:1})])]),_:1}))}}),Q=g(w,[["__scopeId","data-v-60fcd98b"]]);export{Q as default};

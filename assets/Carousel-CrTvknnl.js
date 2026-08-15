import{d as i,o as l,c,w as a,a as n,t as u,e as t,u as s,v as d,b as p,F as m,r as _,l as f,p as h,g as C,f as g}from"./index-BgXLKH8R.js";import{D as v}from"./DemoBlock-dKFcTv51.js";const k={class:"container-column gap-8"},x=`
\`\`\`html
<template>
  <QCarousel :width="600" :height="300">
    <QCarouselItem v-for="i in 4" :key="i">
      <div class="carousel-item">Slide {{ i }}</div>
    </QCarouselItem>
  </QCarousel>
</template>
\`\`\`
`,w=i({name:"DisplayCarousel",__name:"Carousel",setup(B){const o=C(0);return(I,r)=>(l(),c(v,{code:x},{default:a(()=>[n("div",k,[n("p",null,"Current Index: "+u(o.value),1),t(s(d),{width:600,height:300,onChange:r[0]||(r[0]=e=>o.value=e)},{default:a(()=>[(l(),p(m,null,_(4,e=>t(s(f),{key:e},{default:a(()=>[t(s(h),{src:"https://picsum.photos/600/300?random={{ i }}",width:600,height:300})]),_:1})),64))]),_:1})])]),_:1}))}}),Q=g(w,[["__scopeId","data-v-60fcd98b"]]);export{Q as default};

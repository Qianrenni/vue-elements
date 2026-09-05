import{d as i,o as n,c,w as a,a as l,t as u,b as t,u as s,T as d,g as m,F as p,r as _,I as h,A as f,h as g,_ as C}from"./index-By5sKUAP.js";import{D as v}from"./DemoBlock-D_0QWcIO.js";const I={class:"container-column gap-8"},k=`
\`\`\`html
<template>
  <QCarousel :width="600" :height="300">
    <QCarouselItem v-for="i in 4" :key="i">
      <div class="carousel-item">Slide {{ i }}</div>
    </QCarouselItem>
  </QCarousel>
</template>
\`\`\`
`,x=i({name:"DisplayCarousel",__name:"Carousel",setup(w){const o=g(0);return(B,r)=>(n(),c(v,{code:k},{default:a(()=>[l("div",I,[l("p",null,"Current Index: "+u(o.value),1),t(s(d),{width:600,height:300,onChange:r[0]||(r[0]=e=>o.value=e)},{default:a(()=>[(n(),m(p,null,_(4,e=>t(s(h),{key:e},{default:a(()=>[t(s(f),{src:"https://picsum.photos/600/300?random={{ i }}",width:600,height:300})]),_:1})),64))]),_:1})])]),_:1}))}}),Q=C(x,[["__scopeId","data-v-60fcd98b"]]);export{Q as default};

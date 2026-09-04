import{d as c,o as n,c as i,w as a,a as l,t as u,b as t,u as s,x as d,f as m,F as p,r as _,C as f,j as h,g as C,_ as g}from"./index-3RdcHt7C.js";import{D as x}from"./DemoBlock-6OThNZgy.js";const v={class:"container-column gap-8"},k=`
\`\`\`html
<template>
  <QCarousel :width="600" :height="300">
    <QCarouselItem v-for="i in 4" :key="i">
      <div class="carousel-item">Slide {{ i }}</div>
    </QCarouselItem>
  </QCarousel>
</template>
\`\`\`
`,w=c({name:"DisplayCarousel",__name:"Carousel",setup(B){const o=C(0);return(I,r)=>(n(),i(x,{code:k},{default:a(()=>[l("div",v,[l("p",null,"Current Index: "+u(o.value),1),t(s(d),{width:600,height:300,onChange:r[0]||(r[0]=e=>o.value=e)},{default:a(()=>[(n(),m(p,null,_(4,e=>t(s(f),{key:e},{default:a(()=>[t(s(h),{src:"https://picsum.photos/600/300?random={{ i }}",width:600,height:300})]),_:1})),64))]),_:1})])]),_:1}))}}),Q=g(w,[["__scopeId","data-v-60fcd98b"]]);export{Q as default};

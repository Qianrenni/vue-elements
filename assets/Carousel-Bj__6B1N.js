import{d as i,o as n,c,w as a,a as l,t as u,e as t,u as s,s as d,h as m,F as p,r as _,x as h,y as f,k as C,_ as g}from"./index-OW0U782s.js";import{D as k}from"./DemoBlock-A_lV7GyA.js";const v={class:"container-column gap-8"},x=`
\`\`\`html
<template>
  <QCarousel :width="600" :height="300">
    <QCarouselItem v-for="i in 4" :key="i">
      <div class="carousel-item">Slide {{ i }}</div>
    </QCarouselItem>
  </QCarousel>
</template>
\`\`\`
`,w=i({name:"DisplayCarousel",__name:"Carousel",setup(y){const o=C(0);return(B,r)=>(n(),c(k,{code:x},{default:a(()=>[l("div",v,[l("p",null,"Current Index: "+u(o.value),1),t(s(d),{width:600,height:300,onChange:r[0]||(r[0]=e=>o.value=e)},{default:a(()=>[(n(),m(p,null,_(4,e=>t(s(h),{key:e},{default:a(()=>[t(s(f),{src:"https://picsum.photos/600/300?random={{ i }}",width:600,height:300})]),_:1})),64))]),_:1})])]),_:1}))}}),Q=g(w,[["__scopeId","data-v-60fcd98b"]]);export{Q as default};

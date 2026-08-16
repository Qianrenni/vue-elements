import{d as i,o as l,c,w as a,a as n,t as u,e as t,u as s,z as d,b as m,F as p,r as _,i as h,Q as f,h as C,_ as g}from"./index-C84iVYcc.js";import{D as v}from"./DemoBlock-Dh67CGSb.js";const k={class:"container-column gap-8"},x=`
\`\`\`html
<template>
  <QCarousel :width="600" :height="300">
    <QCarouselItem v-for="i in 4" :key="i">
      <div class="carousel-item">Slide {{ i }}</div>
    </QCarouselItem>
  </QCarousel>
</template>
\`\`\`
`,Q=i({name:"DisplayCarousel",__name:"Carousel",setup(w){const o=C(0);return(B,r)=>(l(),c(v,{code:x},{default:a(()=>[n("div",k,[n("p",null,"Current Index: "+u(o.value),1),t(s(d),{width:600,height:300,onChange:r[0]||(r[0]=e=>o.value=e)},{default:a(()=>[(l(),m(p,null,_(4,e=>t(s(h),{key:e},{default:a(()=>[t(s(f),{src:"https://picsum.photos/600/300?random={{ i }}",width:600,height:300})]),_:1})),64))]),_:1})])]),_:1}))}}),D=g(Q,[["__scopeId","data-v-60fcd98b"]]);export{D as default};

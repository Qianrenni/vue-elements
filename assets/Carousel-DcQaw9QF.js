import{d as i,o as n,c,w as a,a as l,t as u,e as t,u as s,i as d,b as m,F as p,r as h,E as _,N as f,g as C,_ as g}from"./index-ylzpC7RR.js";import{D as v}from"./DemoBlock-C0d0BQpt.js";const k={class:"container-column gap-8"},x=`
\`\`\`html
<template>
  <QCarousel :width="600" :height="300">
    <QCarouselItem v-for="i in 4" :key="i">
      <div class="carousel-item">Slide {{ i }}</div>
    </QCarouselItem>
  </QCarousel>
</template>
\`\`\`
`,w=i({name:"DisplayCarousel",__name:"Carousel",setup(B){const o=C(0);return(I,r)=>(n(),c(v,{code:x},{default:a(()=>[l("div",k,[l("p",null,"Current Index: "+u(o.value),1),t(s(d),{width:600,height:300,onChange:r[0]||(r[0]=e=>o.value=e)},{default:a(()=>[(n(),m(p,null,h(4,e=>t(s(_),{key:e},{default:a(()=>[t(s(f),{src:"https://picsum.photos/600/300?random={{ i }}",width:600,height:300})]),_:1})),64))]),_:1})])]),_:1}))}}),N=g(w,[["__scopeId","data-v-60fcd98b"]]);export{N as default};

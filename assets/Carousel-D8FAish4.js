import{D as i}from"./DemoBlock-CA-OtkyE.js";import{d as c,o as n,c as u,w as a,a as l,t as d,b as t,u as s,E as m,h as p,F as _,r as h,T as f,L as C,i as g,_ as v}from"./index-D9J2GR8y.js";const k={class:"container-column gap-8"},x=`
\`\`\`html
<template>
  <QCarousel :width="600" :height="300">
    <QCarouselItem v-for="i in 4" :key="i">
      <div class="carousel-item">Slide {{ i }}</div>
    </QCarouselItem>
  </QCarousel>
</template>
\`\`\`
`,w=c({name:"DisplayCarousel",__name:"Carousel",setup(B){const o=g(0);return(I,r)=>(n(),u(i,{code:x},{default:a(()=>[l("div",k,[l("p",null,"Current Index: "+d(o.value),1),t(s(m),{width:600,height:300,onChange:r[0]||(r[0]=e=>o.value=e)},{default:a(()=>[(n(),p(_,null,h(4,e=>t(s(f),{key:e},{default:a(()=>[t(s(C),{src:"https://picsum.photos/600/300?random={{ i }}",width:600,height:300})]),_:1})),64))]),_:1})])]),_:1}))}}),Q=v(w,[["__scopeId","data-v-066878c8"]]);export{Q as default};

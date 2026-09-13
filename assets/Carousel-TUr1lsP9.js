import{D as i}from"./DemoBlock-B05dVkJ_.js";import{d as c,o as n,c as u,w as a,a as l,t as d,b as t,u as s,n as m,f as p,F as _,r as h,l as f,s as C,g,_ as v}from"./index-BxZBlDCD.js";const y={class:"container-column gap-8"},k=`
\`\`\`html
<template>
  <QCarousel :width="600" :height="300">
    <QCarouselItem v-for="i in 4" :key="i">
      <div class="carousel-item">Slide {{ i }}</div>
    </QCarouselItem>
  </QCarousel>
</template>
\`\`\`
`,x=c({name:"DisplayCarousel",__name:"Carousel",setup(w){const o=g(0);return(B,r)=>(n(),u(i,{code:k},{default:a(()=>[l("div",y,[l("p",null,"Current Index: "+d(o.value),1),t(s(m),{width:600,height:300,onChange:r[0]||(r[0]=e=>o.value=e)},{default:a(()=>[(n(),p(_,null,h(4,e=>t(s(f),{key:e},{default:a(()=>[t(s(C),{src:"https://picsum.photos/600/300?random={{ i }}",width:600,height:300})]),_:1})),64))]),_:1})])]),_:1}))}}),Q=v(x,[["__scopeId","data-v-066878c8"]]);export{Q as default};

import{D as c}from"./DemoBlock-D_0QWcIO.js";import{d as n,o as l,c as m,w as s,b as d,u as t,aG as i,a as p,a4 as _,t as f,_ as u}from"./index-By5sKUAP.js";const y=`
\`\`\`html
<QMasonry :items="cards" :columns="4" :gap="12">
  <template #default="{ item }">
    <div class="card" :style="{ height: ... }">#{{ item }}</div>
  </template>
</QMasonry>
\`\`\`
`,h=n({name:"DisplayLayoutMasonry",__name:"Masonry",setup(g){const o=Array.from({length:12},(r,a)=>a+1);return(r,a)=>(l(),m(c,{code:y},{default:s(()=>[d(t(i),{items:t(o),columns:4,gap:12},{default:s(({item:e})=>[p("div",{class:"card",style:_({height:`${Number(e)%4*28+70}px`})}," #"+f(e),5)]),_:1},8,["items"])]),_:1}))}}),v=u(h,[["__scopeId","data-v-5bf64fd0"]]);export{v as default};

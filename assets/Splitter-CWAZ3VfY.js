import{D as l}from"./DemoBlock-D4wge8Xk.js";import{d as o,o as p,c as r,w as s,a,t as d,b as n,u as c,aO as m,j as f,f as u}from"./index-ZsCVvRa6.js";const v={class:"tip"},_=`
\`\`\`html
<QSplitter v-model:size="size" style="height: 300px">
  <template #first>
    <div class="pane list">列表</div>
  </template>
  <template #second>
    <div class="pane detail">详情</div>
  </template>
</QSplitter>
\`\`\`
`,x=o({name:"DisplayLayoutSplitter",__name:"Splitter",setup(y){const t=f(220);return(z,e)=>(p(),r(l,{code:_},{default:s(()=>[a("p",v,"拖动分隔条或聚焦后用方向键（当前首栏 "+d(t.value)+"px）。",1),n(c(m),{size:t.value,"onUpdate:size":e[0]||(e[0]=i=>t.value=i),style:{height:"300px"}},{first:s(()=>[...e[1]||(e[1]=[a("div",{class:"pane list"},"左侧列表",-1)])]),second:s(()=>[...e[2]||(e[2]=[a("div",{class:"pane detail"},"右侧详情内容",-1)])]),_:1},8,["size"])]),_:1}))}}),D=u(x,[["__scopeId","data-v-4366dcb2"]]);export{D as default};

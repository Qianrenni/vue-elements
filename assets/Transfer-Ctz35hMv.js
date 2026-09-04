import{D as i}from"./DemoBlock-6OThNZgy.js";import{d as c,o as u,c as p,w as m,a as f,b as r,u as l,a4 as d,g as n,_ as y}from"./index-3RdcHt7C.js";const _={class:"container-column gap-10 w-520"},w=`
\`\`\`html
<QTransfer
  v-model="targetKeys"
  :data-source="dataSource"
  :titles="['待选', '已选']"
  style="width: 520px"
/>

<QTransfer
  v-model="targetKeys2"
  :data-source="dataSource"
  :titles="['左', '右']"
  :operations="['→', '←']"
  show-search
  one-way
  style="width: 520px"
/>
\`\`\`
`,k=c({name:"DisplayInputTransfer",__name:"Transfer",setup(v){const a=n([]),s=n(["b","d"]),o=[{key:"a",title:"苹果",description:"红色水果"},{key:"b",title:"香蕉",description:"黄色水果"},{key:"c",title:"樱桃",description:"小果"},{key:"d",title:"榴莲",description:"重口味",disabled:!0},{key:"e",title:"葡萄",description:"紫色水果"}];return(V,e)=>(u(),p(i,{code:w},{default:m(()=>[f("div",_,[r(l(d),{modelValue:a.value,"onUpdate:modelValue":e[0]||(e[0]=t=>a.value=t),"data-source":o,titles:["待选","已选"]},null,8,["modelValue"]),r(l(d),{modelValue:s.value,"onUpdate:modelValue":e[1]||(e[1]=t=>s.value=t),"data-source":o,titles:["左","右"],operations:["→","←"],"show-search":"","one-way":""},null,8,["modelValue"])])]),_:1}))}}),x=y(k,[["__scopeId","data-v-a587e4b6"]]);export{x as default};

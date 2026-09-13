import{D as o}from"./DemoBlock-B05dVkJ_.js";import{d as n,o as s,c as r,w as c,a as u,b as d,u as m,an as p,g as i,_}from"./index-BxZBlDCD.js";const v={class:"w-320"},f=`
\`\`\`html
<QTreeSelect
  v-model="value"
  :items="items"
  placeholder="请选择分类"
  @change="onChange"
/>
\`\`\`
`,h=n({name:"DisplayInputTreeSelect",__name:"TreeSelect",setup(b){const l=[{value:"parent1",label:"产品",children:[{value:"child1-1",label:"按钮 Button"},{value:"child1-2",label:"表单 Form",children:[{value:"grand1",label:"数字输入 QInputNumber"},{value:"grand2",label:"评分 QRate"}]}]},{value:"leaf",label:"工具函数"}],e=i(null);return(g,a)=>(s(),r(o,{code:f},{default:c(()=>[u("div",v,[d(m(p),{modelValue:e.value,"onUpdate:modelValue":a[0]||(a[0]=t=>e.value=t),items:l,placeholder:"请选择分类"},null,8,["modelValue"])])]),_:1}))}}),x=_(h,[["__scopeId","data-v-ff82de65"]]);export{x as default};

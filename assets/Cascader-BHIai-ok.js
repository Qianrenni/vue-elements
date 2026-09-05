import{D as m}from"./DemoBlock-CXFQJDZo.js";import{d as h,o as b,c as f,w as g,a as r,b as s,u as t,aj as u,t as V,j as l,f as y}from"./index-CRccyhqz.js";const _={class:"container-column gap-10 w-420"},w={class:"q-cas-note"},C=`
\`\`\`html
<QCascader v-model="value" :options="options" placeholder="请选择地址" />

<QCascader
  v-model="value2"
  :options="options"
  show-search
  change-on-select
  placeholder="可搜索 / 选中即触发"
/>

<QCascader v-model="lazyValue" :options="lazyOptions" :load-data="loadData" />
\`\`\`
`,j=h({name:"DisplayInputCascader",__name:"Cascader",setup(z){const o=l(null),d=l(null),i=[{value:"zhejiang",label:"浙江",children:[{value:"hangzhou",label:"杭州",children:[{value:"xihu",label:"西湖"},{value:"yuhang",label:"余杭"}]},{value:"ningbo",label:"宁波"}]},{value:"jiangsu",label:"江苏",children:[{value:"nanjing",label:"南京"},{value:"suzhou",label:"苏州"}]}],p=l([{value:"city",label:"城市（懒加载）",isLeaf:!1}]),c=l(null),v=async n=>{const a=n[n.length-1];a.value==="city"&&(await new Promise(e=>setTimeout(e,500)),a.children=[{value:"xihu",label:"西湖",isLeaf:!0},{value:"wulin",label:"武林",isLeaf:!0},{value:"binjiang",label:"滨江",isLeaf:!0}])};return(n,a)=>(b(),f(m,{code:C},{default:g(()=>[r("div",_,[s(t(u),{modelValue:o.value,"onUpdate:modelValue":a[0]||(a[0]=e=>o.value=e),options:i,placeholder:"请选择地址"},null,8,["modelValue"]),s(t(u),{modelValue:d.value,"onUpdate:modelValue":a[1]||(a[1]=e=>d.value=e),options:i,"show-search":"","change-on-select":"",placeholder:"可搜索 / 选中即触发"},null,8,["modelValue"]),s(t(u),{modelValue:c.value,"onUpdate:modelValue":a[2]||(a[2]=e=>c.value=e),options:p.value,"load-data":v,placeholder:"点击后异步加载子级"},null,8,["modelValue","options"]),r("div",w,"已选路径："+V(o.value?.join(" / ")||"(空)"),1)])]),_:1}))}}),B=y(j,[["__scopeId","data-v-bb4fc06c"]]);export{B as default};

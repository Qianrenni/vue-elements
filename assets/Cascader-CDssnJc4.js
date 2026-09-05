import{D as m}from"./DemoBlock-A_lV7GyA.js";import{d as h,o as b,c as f,w as g,a as r,e as s,u as t,ab as u,t as V,k as l,_}from"./index-OW0U782s.js";const y={class:"container-column gap-10 w-420"},w={class:"q-cas-note"},C=`
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
`,z=h({name:"DisplayInputCascader",__name:"Cascader",setup(x){const o=l(null),d=l(null),i=[{value:"zhejiang",label:"浙江",children:[{value:"hangzhou",label:"杭州",children:[{value:"xihu",label:"西湖"},{value:"yuhang",label:"余杭"}]},{value:"ningbo",label:"宁波"}]},{value:"jiangsu",label:"江苏",children:[{value:"nanjing",label:"南京"},{value:"suzhou",label:"苏州"}]}],p=l([{value:"city",label:"城市（懒加载）",isLeaf:!1}]),c=l(null),v=async n=>{const e=n[n.length-1];e.value==="city"&&(await new Promise(a=>setTimeout(a,500)),e.children=[{value:"xihu",label:"西湖",isLeaf:!0},{value:"wulin",label:"武林",isLeaf:!0},{value:"binjiang",label:"滨江",isLeaf:!0}])};return(n,e)=>(b(),f(m,{code:C},{default:g(()=>[r("div",y,[s(t(u),{modelValue:o.value,"onUpdate:modelValue":e[0]||(e[0]=a=>o.value=a),options:i,placeholder:"请选择地址"},null,8,["modelValue"]),s(t(u),{modelValue:d.value,"onUpdate:modelValue":e[1]||(e[1]=a=>d.value=a),options:i,"show-search":"","change-on-select":"",placeholder:"可搜索 / 选中即触发"},null,8,["modelValue"]),s(t(u),{modelValue:c.value,"onUpdate:modelValue":e[2]||(e[2]=a=>c.value=a),options:p.value,"load-data":v,placeholder:"点击后异步加载子级"},null,8,["modelValue","options"]),r("div",w,"已选路径："+V(o.value?.join(" / ")||"(空)"),1)])]),_:1}))}}),k=_(z,[["__scopeId","data-v-bb4fc06c"]]);export{k as default};

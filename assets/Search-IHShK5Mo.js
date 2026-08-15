import{d as n,o as u,c as p,w as d,a as s,e as h,u as m,P as f,t as i,h as t,_}from"./index-C4FdPvsf.js";import{D as v}from"./DemoBlock-B7uW5Cjn.js";const S={class:"container-column gap-6 w-400"},V=`
\`\`\`html
<template>
  <QSearch 
    v-model="searchValue"
    placeholder="请输入搜索内容"
    @search="handleSearch"
  />
</template>

<script setup>
import { ref } from 'vue';
const searchValue = ref('');
const handleSearch = (value) => {
  console.log('搜索:', value);
};
<\/script>
\`\`\`
`,x=n({name:"DisplaySearch",__name:"Search",setup(B){const e=t(""),a=t(""),c=o=>{a.value=`搜索: ${o}`};return(o,l)=>(u(),p(v,{code:V},{default:d(()=>[s("div",S,[h(m(f),{modelValue:e.value,"onUpdate:modelValue":l[0]||(l[0]=r=>e.value=r),placeholder:"请输入搜索内容",onSearch:c},null,8,["modelValue"]),s("p",null,i(a.value),1)])]),_:1}))}}),k=_(x,[["__scopeId","data-v-4f4b696f"]]);export{k as default};

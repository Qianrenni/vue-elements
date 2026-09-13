import{D as n}from"./DemoBlock-B05dVkJ_.js";import{d as u,o as p,c as d,w as h,a as l,b as m,u as i,ab as _,t as f,g as t,_ as v}from"./index-BxZBlDCD.js";const S={class:"container-column gap-6 w-400"},V=`
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
`,g=u({name:"DisplaySearch",__name:"Search",setup(x){const e=t(""),a=t(""),c=o=>{a.value=`搜索: ${o}`};return(o,s)=>(p(),d(n,{code:V},{default:h(()=>[l("div",S,[m(i(_),{modelValue:e.value,"onUpdate:modelValue":s[0]||(s[0]=r=>e.value=r),placeholder:"请输入搜索内容",onSearch:c},null,8,["modelValue"]),l("p",null,f(a.value),1)])]),_:1}))}}),b=v(g,[["__scopeId","data-v-d22b9e4f"]]);export{b as default};

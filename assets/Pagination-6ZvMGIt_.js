import{d as o,o as s,c,w as r,a as t,b as p,u as i,v as l,t as g,g as u,_}from"./index-3RdcHt7C.js";import{D as d}from"./DemoBlock-6OThNZgy.js";const m={class:"inner-container-column"},f={class:"text-center"},h=20,v=`
\`\`\`html
<template>
  <QPagination
    :current-page="currentPage"
    :total-pages="20"
    @change="handleChange"
  />
</template>

<script setup>
import { ref } from 'vue';
const currentPage = ref(1);
const handleChange = (page) => {
  currentPage.value = page;
};
<\\/script>
\`\`\`
`,P=o({name:"DisplayBasicPagination",__name:"Pagination",setup(C){const e=u(1),n=a=>{e.value=a};return(a,x)=>(s(),c(d,{code:v},{default:r(()=>[t("div",m,[p(i(l),{"current-page":e.value,"total-pages":h,onChange:n},null,8,["current-page"]),t("p",f,"当前页："+g(e.value),1)])]),_:1}))}}),k=_(P,[["__scopeId","data-v-38f2e574"]]);export{k as default};

import{d as o,o as s,c,w as r,a as t,b as p,u as i,J as l,t as g,j as u,f as _}from"./index-Calvsw3q.js";import{D as d}from"./DemoBlock-DMksGsUm.js";const m={class:"inner-container-column"},f={class:"text-center"},h=20,P=`
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
`,v=o({name:"DisplayBasicPagination",__name:"Pagination",setup(C){const e=u(1),n=a=>{e.value=a};return(a,x)=>(s(),c(d,{code:P},{default:r(()=>[t("div",m,[p(i(l),{"current-page":e.value,"total-pages":h,onChange:n},null,8,["current-page"]),t("p",f,"当前页："+g(e.value),1)])]),_:1}))}}),k=_(v,[["__scopeId","data-v-38f2e574"]]);export{k as default};

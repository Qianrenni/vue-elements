import{D as s}from"./DemoBlock-B05dVkJ_.js";import{d as o,o as c,c as r,w as p,a as t,b as i,u as l,k as g,t as u,g as _,_ as d}from"./index-BxZBlDCD.js";const m={class:"inner-container-column"},h={class:"text-center"},f=20,P=`
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
`,v=o({name:"DisplayBasicPagination",__name:"Pagination",setup(C){const e=_(1),n=a=>{e.value=a};return(a,k)=>(c(),r(s,{code:P},{default:p(()=>[t("div",m,[i(l(g),{"current-page":e.value,"total-pages":f,onChange:n},null,8,["current-page"]),t("p",h,"当前页："+u(e.value),1)])]),_:1}))}}),D=d(v,[["__scopeId","data-v-4dd5ecc2"]]);export{D as default};

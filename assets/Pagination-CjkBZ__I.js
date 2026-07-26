import{d as o,o as s,c,w as r,a as t,e as p,u as i,g as l,t as g,h as u,_}from"./index-ugmjvJmX.js";import{D as d}from"./DemoBlock-BhWeZx4P.js";const m={class:"inner-container-column"},h={class:"text-center"},f=20,P=`
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
`,v=o({name:"DisplayBasicPagination",__name:"Pagination",setup(C){const e=u(1),n=a=>{e.value=a};return(a,x)=>(s(),c(d,{code:P},{default:r(()=>[t("div",m,[p(i(l),{"current-page":e.value,"total-pages":f,onChange:n},null,8,["current-page"]),t("p",h,"当前页："+g(e.value),1)])]),_:1}))}}),k=_(v,[["__scopeId","data-v-38f2e574"]]);export{k as default};

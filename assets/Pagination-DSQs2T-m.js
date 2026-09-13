import{D as o}from"./DemoBlock-CA-OtkyE.js";import{d as s,o as c,c as r,w as i,a as t,b as p,u as l,J as g,t as u,i as _,_ as d}from"./index-D9J2GR8y.js";const m={class:"inner-container-column"},h={class:"text-center"},f=20,P=`
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
`,v=s({name:"DisplayBasicPagination",__name:"Pagination",setup(C){const e=_(1),n=a=>{e.value=a};return(a,x)=>(c(),r(o,{code:P},{default:i(()=>[t("div",m,[p(l(g),{"current-page":e.value,"total-pages":f,onChange:n},null,8,["current-page"]),t("p",h,"当前页："+u(e.value),1)])]),_:1}))}}),k=d(v,[["__scopeId","data-v-4dd5ecc2"]]);export{k as default};

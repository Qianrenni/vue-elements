import{d as r,o as t,c as s,w as c,a as o,b as n,u as m,a3 as u,t as p,a4 as i,h as d,_ as f}from"./index-By45x_bw.js";import{D as _}from"./DemoBlock-ClDmiYtN.js";const v={class:"container-column gap-6 w-300"},k=`
\`\`\`html
<template>
  <QFormColorPicker 
    v-model="colorValue"
    label="选择颜色"
  />
</template>

<script setup>
import { ref } from 'vue';
const colorValue = ref('#1890ff');
<\/script>
\`\`\`
`,V=r({name:"DisplayFormColorPicker",__name:"FormColorPicker",setup(C){const e=d("#1890ff");return(b,a)=>(t(),s(_,{code:k},{default:c(()=>[o("div",v,[n(m(u),{modelValue:e.value,"onUpdate:modelValue":a[0]||(a[0]=l=>e.value=l),label:"选择颜色"},null,8,["modelValue"]),o("p",null,"当前颜色: "+p(e.value),1),o("div",{class:"color-preview",style:i({backgroundColor:e.value})},null,4)])]),_:1}))}}),x=f(V,[["__scopeId","data-v-404b6fd0"]]);export{x as default};

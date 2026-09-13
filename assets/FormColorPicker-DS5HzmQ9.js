import{D as r}from"./DemoBlock-CA-OtkyE.js";import{d as t,o as s,c,w as n,a as o,b as m,u,a2 as i,t as p,a3 as d,i as f,_}from"./index-D9J2GR8y.js";const v={class:"container-column gap-6 w-300"},k=`
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
`,V=t({name:"DisplayFormColorPicker",__name:"FormColorPicker",setup(C){const e=f("#1890ff");return(b,a)=>(s(),c(r,{code:k},{default:n(()=>[o("div",v,[m(u(i),{modelValue:e.value,"onUpdate:modelValue":a[0]||(a[0]=l=>e.value=l),label:"选择颜色"},null,8,["modelValue"]),o("p",null,"当前颜色: "+p(e.value),1),o("div",{class:"color-preview",style:d({backgroundColor:e.value})},null,4)])]),_:1}))}}),x=_(V,[["__scopeId","data-v-38756e2b"]]);export{x as default};

import{d as r,o as t,c as s,w as c,a as o,e as n,u as m,s as u,t as p,v as i,h as d,_ as f}from"./index-DtVGf8tM.js";import{D as _}from"./DemoBlock-Bx5i5bzO.js";const v={class:"container-column gap-6 w-300"},k=`
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
`,V=r({name:"DisplayFormColorPicker",__name:"FormColorPicker",setup(C){const e=d("#1890ff");return(F,l)=>(t(),s(_,{code:k},{default:c(()=>[o("div",v,[n(m(u),{modelValue:e.value,"onUpdate:modelValue":l[0]||(l[0]=a=>e.value=a),label:"选择颜色"},null,8,["modelValue"]),o("p",null,"当前颜色: "+p(e.value),1),o("div",{class:"color-preview",style:i({backgroundColor:e.value})},null,4)])]),_:1}))}}),x=f(V,[["__scopeId","data-v-404b6fd0"]]);export{x as default};

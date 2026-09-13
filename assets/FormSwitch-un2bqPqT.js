import{D as d}from"./DemoBlock-CA-OtkyE.js";import{d as r,o as p,c as V,w as v,a,b as t,u as s,a9 as u,i as n,_ as c}from"./index-D9J2GR8y.js";const w={class:"container-column gap-6"},f={class:"container gap-8 items-center"},F={class:"container gap-8 items-center"},S={class:"container gap-8 items-center"},g=`
\`\`\`html
<template>
  <!-- 基础开关 -->
  <QFormSwitch v-model="switchValue1" />

  <!-- 带标签的开关 -->
  <QFormSwitch v-model="switchValue2" label="启用通知" />

  <!-- 不同尺寸 -->
  <QFormSwitch v-model="switchValue3" size="small" />
  <QFormSwitch v-model="switchValue3" size="middle" />
  <QFormSwitch v-model="switchValue3" size="large" />
</template>

<script setup>
import { ref } from 'vue';
const switchValue = ref(false);
<\/script>
\`\`\`
`,h=r({name:"DisplayFormSwitch",__name:"FormSwitch",setup(z){const i=n(!1),m=n(!0),o=n(!1);return(Q,e)=>(p(),V(d,{code:g},{default:v(()=>[a("div",w,[a("div",f,[t(s(u),{modelValue:i.value,"onUpdate:modelValue":e[0]||(e[0]=l=>i.value=l)},null,8,["modelValue"]),e[5]||(e[5]=a("span",null,"关闭状态",-1))]),a("div",F,[t(s(u),{modelValue:m.value,"onUpdate:modelValue":e[1]||(e[1]=l=>m.value=l),label:"启用通知"},null,8,["modelValue"])]),a("div",S,[t(s(u),{modelValue:o.value,"onUpdate:modelValue":e[2]||(e[2]=l=>o.value=l),size:"small"},null,8,["modelValue"]),e[6]||(e[6]=a("span",null,"小",-1)),t(s(u),{modelValue:o.value,"onUpdate:modelValue":e[3]||(e[3]=l=>o.value=l),size:"middle"},null,8,["modelValue"]),e[7]||(e[7]=a("span",null,"中",-1)),t(s(u),{modelValue:o.value,"onUpdate:modelValue":e[4]||(e[4]=l=>o.value=l),size:"large"},null,8,["modelValue"]),e[8]||(e[8]=a("span",null,"大",-1))])])]),_:1}))}}),x=c(h,[["__scopeId","data-v-67a1ef0b"]]);export{x as default};

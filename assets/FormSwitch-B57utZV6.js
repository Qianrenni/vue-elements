import{d,o as r,c as p,w as V,a,b as o,u as s,aa as u,j as n,f as v}from"./index-CRccyhqz.js";import{D as c}from"./DemoBlock-CXFQJDZo.js";const w={class:"container-column gap-6"},f={class:"container gap-8 items-center"},F={class:"container gap-8 items-center"},S={class:"container gap-8 items-center"},g=`
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
`,h=d({name:"DisplayFormSwitch",__name:"FormSwitch",setup(z){const m=n(!1),i=n(!0),t=n(!1);return(Q,e)=>(r(),p(c,{code:g},{default:V(()=>[a("div",w,[a("div",f,[o(s(u),{modelValue:m.value,"onUpdate:modelValue":e[0]||(e[0]=l=>m.value=l)},null,8,["modelValue"]),e[5]||(e[5]=a("span",null,"关闭状态",-1))]),a("div",F,[o(s(u),{modelValue:i.value,"onUpdate:modelValue":e[1]||(e[1]=l=>i.value=l),label:"启用通知"},null,8,["modelValue"])]),a("div",S,[o(s(u),{modelValue:t.value,"onUpdate:modelValue":e[2]||(e[2]=l=>t.value=l),size:"small"},null,8,["modelValue"]),e[6]||(e[6]=a("span",null,"小",-1)),o(s(u),{modelValue:t.value,"onUpdate:modelValue":e[3]||(e[3]=l=>t.value=l),size:"middle"},null,8,["modelValue"]),e[7]||(e[7]=a("span",null,"中",-1)),o(s(u),{modelValue:t.value,"onUpdate:modelValue":e[4]||(e[4]=l=>t.value=l),size:"large"},null,8,["modelValue"]),e[8]||(e[8]=a("span",null,"大",-1))])])]),_:1}))}}),B=v(h,[["__scopeId","data-v-6057f69e"]]);export{B as default};

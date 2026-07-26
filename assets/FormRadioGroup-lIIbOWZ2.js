import{d,o as m,c,w as v,a as t,e as r,u as s,V as i,t as n,g as p,_ as V}from"./index-uHcb5N9X.js";import{D as f}from"./DemoBlock-B_3PK6W_.js";const _={class:"container-column gap-8"},b=`
\`\`\`html
<template>
  <!-- 水平排列 -->
  <QFormRadioGroup 
    v-model="radioValue"
    :options="options"
    label="选择一项"
  />

  <!-- 垂直排列 -->
  <QFormRadioGroup 
    v-model="radioValue"
    :options="options"
    direction="vertical"
  />
</template>

<script setup>
import { ref } from 'vue';
const radioValue = ref('');
const options = [
  { label: '选项一', value: 'value1' },
  { label: '选项二', value: 'value2' },
];
<\/script>
\`\`\`
`,R=d({name:"DisplayFormRadioGroup",__name:"FormRadioGroup",setup(F){const a=p(""),o=p(""),u=[{label:"选项一",value:"value1"},{label:"选项二",value:"value2"},{label:"选项三",value:"value3"}];return(G,e)=>(m(),c(f,{code:b},{default:v(()=>[t("div",_,[r(s(i),{modelValue:a.value,"onUpdate:modelValue":e[0]||(e[0]=l=>a.value=l),options:u,label:"水平排列"},null,8,["modelValue"]),t("p",null,"已选中: "+n(a.value||"无"),1),r(s(i),{modelValue:o.value,"onUpdate:modelValue":e[1]||(e[1]=l=>o.value=l),options:u,direction:"vertical",label:"垂直排列"},null,8,["modelValue"]),t("p",null,"已选中: "+n(o.value||"无"),1)])]),_:1}))}}),D=V(R,[["__scopeId","data-v-e659c1c9"]]);export{D as default};

import{D as p}from"./DemoBlock-CA-OtkyE.js";import{d as m,o as c,c as v,w as V,a as t,b as r,u as s,a6 as i,t as n,i as d,_ as f}from"./index-D9J2GR8y.js";const _={class:"container-column gap-8"},b=`
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
`,F=m({name:"DisplayFormRadioGroup",__name:"FormRadioGroup",setup(G){const a=d(""),o=d(""),u=[{label:"选项一",value:"value1"},{label:"选项二",value:"value2"},{label:"选项三",value:"value3"}];return(R,e)=>(c(),v(p,{code:b},{default:V(()=>[t("div",_,[r(s(i),{modelValue:a.value,"onUpdate:modelValue":e[0]||(e[0]=l=>a.value=l),options:u,label:"水平排列"},null,8,["modelValue"]),t("p",null,"已选中: "+n(a.value||"无"),1),r(s(i),{modelValue:o.value,"onUpdate:modelValue":e[1]||(e[1]=l=>o.value=l),options:u,direction:"vertical",label:"垂直排列"},null,8,["modelValue"]),t("p",null,"已选中: "+n(o.value||"无"),1)])]),_:1}))}}),D=f(F,[["__scopeId","data-v-6b8ddb33"]]);export{D as default};

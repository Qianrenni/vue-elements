import{d,o as m,c as i,w as v,a as t,b as s,u as c,a2 as r,t as n,j as p,f as b}from"./index-Dsj8pkBt.js";import{D as f}from"./DemoBlock-854NQdRU.js";const V={class:"container-column gap-8"},k=`
\`\`\`html
<template>
  <!-- 水平排列 -->
  <QFormCheckboxGroup 
    v-model="checkedValues"
    :options="options"
    label="爱好"
  />

  <!-- 垂直排列 -->
  <QFormCheckboxGroup 
    v-model="checkedValues"
    :options="options"
    direction="vertical"
  />
</template>

<script setup>
import { ref } from 'vue';
const checkedValues = ref([]);
const options = [
  { label: '选项一', value: 'value1' },
  { label: '选项二', value: 'value2' },
];
<\/script>
\`\`\`
`,_=d({name:"DisplayFormCheckboxGroup",__name:"FormCheckboxGroup",setup(h){const l=p([]),a=p([]),u=[{label:"选项一",value:"value1"},{label:"选项二",value:"value2"},{label:"选项三",value:"value3"},{label:"选项四",value:"value4"}];return(x,e)=>(m(),i(f,{code:k},{default:v(()=>[t("div",V,[s(c(r),{modelValue:l.value,"onUpdate:modelValue":e[0]||(e[0]=o=>l.value=o),options:u,label:"水平排列"},null,8,["modelValue"]),t("p",null,"已选中: "+n(l.value),1),s(c(r),{modelValue:a.value,"onUpdate:modelValue":e[1]||(e[1]=o=>a.value=o),options:u,direction:"vertical",label:"垂直排列"},null,8,["modelValue"]),t("p",null,"已选中: "+n(a.value),1)])]),_:1}))}}),G=b(_,[["__scopeId","data-v-f30f4753"]]);export{G as default};

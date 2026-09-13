import{D as d}from"./DemoBlock-CA-OtkyE.js";import{d as i,o as m,c as v,w as b,a as t,b as s,u as c,a1 as r,t as n,i as p,_ as f}from"./index-D9J2GR8y.js";const V={class:"container-column gap-8"},k=`
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
`,_=i({name:"DisplayFormCheckboxGroup",__name:"FormCheckboxGroup",setup(h){const l=p([]),a=p([]),u=[{label:"选项一",value:"value1"},{label:"选项二",value:"value2"},{label:"选项三",value:"value3"},{label:"选项四",value:"value4"}];return(x,e)=>(m(),v(d,{code:k},{default:b(()=>[t("div",V,[s(c(r),{modelValue:l.value,"onUpdate:modelValue":e[0]||(e[0]=o=>l.value=o),options:u,label:"水平排列"},null,8,["modelValue"]),t("p",null,"已选中: "+n(l.value),1),s(c(r),{modelValue:a.value,"onUpdate:modelValue":e[1]||(e[1]=o=>a.value=o),options:u,direction:"vertical",label:"垂直排列"},null,8,["modelValue"]),t("p",null,"已选中: "+n(a.value),1)])]),_:1}))}}),G=f(_,[["__scopeId","data-v-7402ff42"]]);export{G as default};

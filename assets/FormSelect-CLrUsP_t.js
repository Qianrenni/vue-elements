import{D as r}from"./DemoBlock-CA-OtkyE.js";import{d as u,o as m,c as i,w as d,a as b,b as s,u as n,a8 as c,i as p,_ as v}from"./index-D9J2GR8y.js";const f={class:"container-column gap-6 w-300"},V=`
\`\`\`html
<template>
  <!-- 基础下拉选择 -->
  <QFormSelect 
    v-model="selectValue"
    :options="options"
    label="请选择"
  />

  <!-- 可搜索的下拉选择 -->
  <QFormSelect 
    v-model="searchableValue"
    :options="options"
    searchable
    label="可搜索"
  />
</template>

<script setup>
import { ref } from 'vue';
const selectValue = ref('');
const options = [
  { label: '选项一', value: 'option1' },
  { label: '选项二', value: 'option2' },
];
<\/script>
\`\`\`
`,_=u({name:"DisplayFormSelect",__name:"FormSelect",setup(h){const o=p(""),a=p(""),t=[{label:"选项一",value:"option1"},{label:"选项二",value:"option2"},{label:"选项三",value:"option3"},{label:"选项四",value:"option4"}];return(F,e)=>(m(),i(r,{code:V},{default:d(()=>[b("div",f,[s(n(c),{modelValue:o.value,"onUpdate:modelValue":e[0]||(e[0]=l=>o.value=l),options:t,label:"基础选择",placeholder:"请选择选项"},null,8,["modelValue"]),s(n(c),{modelValue:a.value,"onUpdate:modelValue":e[1]||(e[1]=l=>a.value=l),options:t,searchable:"",label:"可搜索",placeholder:"搜索并选择"},null,8,["modelValue"])])]),_:1}))}}),B=v(_,[["__scopeId","data-v-2fa5d0c7"]]);export{B as default};

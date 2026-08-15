import{d as r,o as u,c as m,w as d,a as i,e as s,u as n,T as c,g as p,f as b}from"./index-BgXLKH8R.js";import{D as v}from"./DemoBlock-dKFcTv51.js";const f={class:"container-column gap-6 w-300"},V=`
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
`,_=r({name:"DisplayFormSelect",__name:"FormSelect",setup(h){const o=p(""),a=p(""),t=[{label:"选项一",value:"option1"},{label:"选项二",value:"option2"},{label:"选项三",value:"option3"},{label:"选项四",value:"option4"}];return(F,e)=>(u(),m(v,{code:V},{default:d(()=>[i("div",f,[s(n(c),{modelValue:o.value,"onUpdate:modelValue":e[0]||(e[0]=l=>o.value=l),options:t,label:"基础选择",placeholder:"请选择选项"},null,8,["modelValue"]),s(n(c),{modelValue:a.value,"onUpdate:modelValue":e[1]||(e[1]=l=>a.value=l),options:t,searchable:"",label:"可搜索",placeholder:"搜索并选择"},null,8,["modelValue"])])]),_:1}))}}),B=b(_,[["__scopeId","data-v-9324bdaf"]]);export{B as default};

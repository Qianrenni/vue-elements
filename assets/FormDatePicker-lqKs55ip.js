import{d as s,o as n,c as p,w as i,a as c,b as t,u as l,Q as o,g as m,_ as V}from"./index-3RdcHt7C.js";import{D as f}from"./DemoBlock-6OThNZgy.js";const v={class:"container-column gap-6 w-300"},_=`
\`\`\`html
<template>
  <!-- 日期选择 -->
  <QFormDatePicker 
    v-model="dateValue"
    type="date"
    label="选择日期"
  />

  <!-- 时间选择 -->
  <QFormDatePicker 
    v-model="timeValue"
    type="time"
    label="选择时间"
  />

  <!-- 日期时间选择 -->
  <QFormDatePicker 
    v-model="datetimeValue"
    type="datetime-local"
    label="选择日期时间"
  />
</template>

<script setup>
import { ref } from 'vue';
const dateValue = ref('');
<\/script>
\`\`\`
`,b=s({name:"DisplayFormDatePicker",__name:"FormDatePicker",setup(k){const d=m(""),r=m(""),u=m("");return(D,e)=>(n(),p(f,{code:_},{default:i(()=>[c("div",v,[t(l(o),{modelValue:d.value,"onUpdate:modelValue":e[0]||(e[0]=a=>d.value=a),type:"date",label:"选择日期"},null,8,["modelValue"]),t(l(o),{modelValue:r.value,"onUpdate:modelValue":e[1]||(e[1]=a=>r.value=a),type:"time",label:"选择时间"},null,8,["modelValue"]),t(l(o),{modelValue:u.value,"onUpdate:modelValue":e[2]||(e[2]=a=>u.value=a),type:"datetime-local",label:"选择日期时间"},null,8,["modelValue"])])]),_:1}))}}),P=V(b,[["__scopeId","data-v-d3bab8d2"]]);export{P as default};

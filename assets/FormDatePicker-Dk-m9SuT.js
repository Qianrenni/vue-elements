import{d as s,o as n,c as p,w as i,a as c,e as l,u as t,G as o,g as m,f as V}from"./index-BgXLKH8R.js";import{D as f}from"./DemoBlock-dKFcTv51.js";const v={class:"container-column gap-6 w-300"},k=`
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
`,D=s({name:"DisplayFormDatePicker",__name:"FormDatePicker",setup(_){const d=m(""),r=m(""),u=m("");return(b,e)=>(n(),p(f,{code:k},{default:i(()=>[c("div",v,[l(t(o),{modelValue:d.value,"onUpdate:modelValue":e[0]||(e[0]=a=>d.value=a),type:"date",label:"选择日期"},null,8,["modelValue"]),l(t(o),{modelValue:r.value,"onUpdate:modelValue":e[1]||(e[1]=a=>r.value=a),type:"time",label:"选择时间"},null,8,["modelValue"]),l(t(o),{modelValue:u.value,"onUpdate:modelValue":e[2]||(e[2]=a=>u.value=a),type:"datetime-local",label:"选择日期时间"},null,8,["modelValue"])])]),_:1}))}}),P=V(D,[["__scopeId","data-v-d3bab8d2"]]);export{P as default};

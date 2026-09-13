import{D as s}from"./DemoBlock-CA-OtkyE.js";import{d as i,o as n,c as p,w as c,a as V,b as t,u as l,a4 as o,i as m,_ as f}from"./index-D9J2GR8y.js";const v={class:"container-column gap-6 w-300"},_=`
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
`,k=i({name:"DisplayFormDatePicker",__name:"FormDatePicker",setup(D){const d=m(""),r=m(""),u=m("");return(b,e)=>(n(),p(s,{code:_},{default:c(()=>[V("div",v,[t(l(o),{modelValue:d.value,"onUpdate:modelValue":e[0]||(e[0]=a=>d.value=a),type:"date",label:"选择日期"},null,8,["modelValue"]),t(l(o),{modelValue:r.value,"onUpdate:modelValue":e[1]||(e[1]=a=>r.value=a),type:"time",label:"选择时间"},null,8,["modelValue"]),t(l(o),{modelValue:u.value,"onUpdate:modelValue":e[2]||(e[2]=a=>u.value=a),type:"datetime-local",label:"选择日期时间"},null,8,["modelValue"])])]),_:1}))}}),P=f(k,[["__scopeId","data-v-3d06eacf"]]);export{P as default};

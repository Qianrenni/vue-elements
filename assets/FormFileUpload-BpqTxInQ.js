import{D as d}from"./DemoBlock-CA-OtkyE.js";import{d as c,o as t,c as f,w as _,a as v,b as s,u as m,a5 as p,h as u,t as n,D as i,i as r,_ as F}from"./index-D9J2GR8y.js";const V={class:"container-column gap-6 w-400"},g={key:0},U={key:1},b=`
\`\`\`html
<template>
  <!-- 单文件上传 -->
  <QFormFileUpload 
    v-model="fileValue"
    label="上传文件"
    accept=".jpg,.png,.pdf"
  />

  <!-- 多文件上传 -->
  <QFormFileUpload 
    v-model="multipleFiles"
    multiple
    label="上传多个文件"
  />
</template>

<script setup>
import { ref } from 'vue';
const fileValue = ref(null);
<\/script>
\`\`\`
`,k=c({name:"DisplayFormFileUpload",__name:"FormFileUpload",setup(B){const e=r(null),l=r(null);return(D,a)=>(t(),f(d,{code:b},{default:_(()=>[v("div",V,[s(m(p),{modelValue:e.value,"onUpdate:modelValue":a[0]||(a[0]=o=>e.value=o),label:"单文件上传",accept:"image/*"},null,8,["modelValue"]),e.value?(t(),u("p",g,"已选择: "+n(e.value.name),1)):i("",!0),s(m(p),{modelValue:l.value,"onUpdate:modelValue":a[1]||(a[1]=o=>l.value=o),multiple:"",label:"多文件上传",accept:"image/*"},null,8,["modelValue"]),l.value?(t(),u("p",U,"已选择: "+n(l.value.length)+" 个文件",1)):i("",!0)])]),_:1}))}}),y=F(k,[["__scopeId","data-v-6e7eeeb0"]]);export{y as default};

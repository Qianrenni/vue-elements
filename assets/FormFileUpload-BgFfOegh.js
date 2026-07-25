import{d,o as t,c,w as f,a as _,e as s,u as m,W as p,b as u,t as n,z as r,h as i,_ as v}from"./index-70o3v1oX.js";import{D as F}from"./DemoBlock-FYipY6ND.js";const V={class:"container-column gap-6 w-400"},g={key:0},U={key:1},k=`
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
`,b=d({name:"DisplayFormFileUpload",__name:"FormFileUpload",setup(B){const e=i(null),l=i(null);return(h,a)=>(t(),c(F,{code:k},{default:f(()=>[_("div",V,[s(m(p),{modelValue:e.value,"onUpdate:modelValue":a[0]||(a[0]=o=>e.value=o),label:"单文件上传",accept:"image/*"},null,8,["modelValue"]),e.value?(t(),u("p",g,"已选择: "+n(e.value.name),1)):r("",!0),s(m(p),{modelValue:l.value,"onUpdate:modelValue":a[1]||(a[1]=o=>l.value=o),multiple:"",label:"多文件上传",accept:"image/*"},null,8,["modelValue"]),l.value?(t(),u("p",U,"已选择: "+n(l.value.length)+" 个文件",1)):r("",!0)])]),_:1}))}}),D=v(b,[["__scopeId","data-v-2a05073a"]]);export{D as default};

import{D as u}from"./DemoBlock-CA-OtkyE.js";import{d,o as n,c,w as p,a as i,b as t,u as r,ac as s,i as m,_ as f}from"./index-D9J2GR8y.js";const V={class:"container-column gap-8 w-400"},x=`
\`\`\`html
<template>
  <!-- 基础文本域 -->
  <QFormTextarea 
    v-model="textareaValue"
    label="备注"
    placeholder="请输入内容"
  />

  <!-- 可调整大小的文本域 -->
  <QFormTextarea 
    v-model="resizableValue"
    :rows="8"
    resizable
    label="详细描述"
  />
</template>

<script setup>
import { ref } from 'vue';
const textareaValue = ref('');
<\/script>
\`\`\`
`,_=d({name:"DisplayFormTextarea",__name:"FormTextarea",setup(b){const l=m(""),o=m("");return(v,e)=>(n(),c(u,{code:x},{default:p(()=>[i("div",V,[t(r(s),{modelValue:l.value,"onUpdate:modelValue":e[0]||(e[0]=a=>l.value=a),label:"基础文本域",placeholder:"请输入内容"},null,8,["modelValue"]),t(r(s),{modelValue:o.value,"onUpdate:modelValue":e[1]||(e[1]=a=>o.value=a),rows:8,resizable:"",label:"可调整大小",placeholder:"可以拖动右下角调整大小"},null,8,["modelValue"])])]),_:1}))}}),T=f(_,[["__scopeId","data-v-27b6f85c"]]);export{T as default};

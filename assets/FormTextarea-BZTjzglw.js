import{d as u,o as d,c as n,w as p,a as c,b as t,u as r,ad as s,j as m,f as i}from"./index-Calvsw3q.js";import{D as f}from"./DemoBlock-DMksGsUm.js";const V={class:"container-column gap-8 w-400"},x=`
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
`,_=u({name:"DisplayFormTextarea",__name:"FormTextarea",setup(b){const l=m(""),o=m("");return(v,e)=>(d(),n(f,{code:x},{default:p(()=>[c("div",V,[t(r(s),{modelValue:l.value,"onUpdate:modelValue":e[0]||(e[0]=a=>l.value=a),label:"基础文本域",placeholder:"请输入内容"},null,8,["modelValue"]),t(r(s),{modelValue:o.value,"onUpdate:modelValue":e[1]||(e[1]=a=>o.value=a),rows:8,resizable:"",label:"可调整大小",placeholder:"可以拖动右下角调整大小"},null,8,["modelValue"])])]),_:1}))}}),T=i(_,[["__scopeId","data-v-f69e34b7"]]);export{T as default};

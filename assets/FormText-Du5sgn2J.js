import{D as u}from"./DemoBlock-CA-OtkyE.js";import{d as p,o as n,c,w as V,a as i,b as a,u as o,ab as t,i as s,_ as f}from"./index-D9J2GR8y.js";const x={class:"container-column gap-6 w-400"},v=`
\`\`\`html
<template>
  <!-- 文本输入 -->
  <QFormText 
    v-model="textValue"
    label="用户名"
    placeholder="请输入用户名"
  />

  <!-- 邮箱输入 -->
  <QFormText 
    v-model="emailValue"
    type="email"
    label="邮箱"
    placeholder="请输入邮箱地址"
  />

  <!-- 密码输入 -->
  <QFormText 
    v-model="passwordValue"
    type="password"
    label="密码"
    placeholder="请输入密码"
  />
</template>

<script setup>
import { ref } from 'vue';
const textValue = ref('');
const emailValue = ref('');
const passwordValue = ref('');
<\/script>
\`\`\`
`,b=p({name:"DisplayFormText",__name:"FormText",setup(_){const r=s(""),d=s(""),m=s("");return(w,e)=>(n(),c(u,{code:v},{default:V(()=>[i("div",x,[a(o(t),{modelValue:r.value,"onUpdate:modelValue":e[0]||(e[0]=l=>r.value=l),label:"用户名",placeholder:"请输入用户名"},null,8,["modelValue"]),a(o(t),{modelValue:d.value,"onUpdate:modelValue":e[1]||(e[1]=l=>d.value=l),type:"email",label:"邮箱",placeholder:"请输入邮箱地址"},null,8,["modelValue"]),a(o(t),{modelValue:m.value,"onUpdate:modelValue":e[2]||(e[2]=l=>m.value=l),type:"password",label:"密码",placeholder:"请输入密码"},null,8,["modelValue"])])]),_:1}))}}),T=f(b,[["__scopeId","data-v-94dbb936"]]);export{T as default};

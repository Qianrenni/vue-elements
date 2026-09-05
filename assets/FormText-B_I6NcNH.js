import{d as u,o as p,c as n,w as c,a as V,b as a,u as o,ac as t,j as s,f as i}from"./index-Calvsw3q.js";import{D as f}from"./DemoBlock-DMksGsUm.js";const x={class:"container-column gap-6 w-400"},v=`
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
`,_=u({name:"DisplayFormText",__name:"FormText",setup(w){const r=s(""),m=s(""),d=s("");return(b,e)=>(p(),n(f,{code:v},{default:c(()=>[V("div",x,[a(o(t),{modelValue:r.value,"onUpdate:modelValue":e[0]||(e[0]=l=>r.value=l),label:"用户名",placeholder:"请输入用户名"},null,8,["modelValue"]),a(o(t),{modelValue:m.value,"onUpdate:modelValue":e[1]||(e[1]=l=>m.value=l),type:"email",label:"邮箱",placeholder:"请输入邮箱地址"},null,8,["modelValue"]),a(o(t),{modelValue:d.value,"onUpdate:modelValue":e[2]||(e[2]=l=>d.value=l),type:"password",label:"密码",placeholder:"请输入密码"},null,8,["modelValue"])])]),_:1}))}}),T=i(_,[["__scopeId","data-v-30ca2695"]]);export{T as default};

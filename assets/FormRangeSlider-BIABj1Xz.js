import{d,o as p,c as i,w as c,a as n,e as t,u as m,B as s,t as r,g as u,_ as g}from"./index-D6Or7FsJ.js";import{D as f}from"./DemoBlock-aFPKnnVc.js";const v={class:"container-column gap-6 w-400"},_=`
\`\`\`html
<template>
  <!-- 基础范围滑块 -->
  <QFormRangeSlider 
    v-model="rangeValue"
    name="range"
    :min="0"
    :max="100"
    label="音量"
  />

  <!-- 自定义步长 -->
  <QFormRangeSlider 
    v-model="customRange"
    name="custom"
    :min="0"
    :max="100"
    :step="10"
    label="亮度"
  />
</template>

<script setup>
import { ref } from 'vue';
const rangeValue = ref(50);
<\/script>
\`\`\`
`,V=d({name:"DisplayFormRangeSlider",__name:"FormRangeSlider",setup(x){const a=u(50),l=u(25);return(R,e)=>(p(),i(f,{code:_},{default:c(()=>[n("div",v,[t(m(s),{modelValue:a.value,"onUpdate:modelValue":e[0]||(e[0]=o=>a.value=o),name:"volume",min:0,max:100,label:"音量"},null,8,["modelValue"]),n("p",null,"当前值: "+r(a.value),1),t(m(s),{modelValue:l.value,"onUpdate:modelValue":e[1]||(e[1]=o=>l.value=o),name:"brightness",min:0,max:100,step:10,label:"亮度"},null,8,["modelValue"]),n("p",null,"当前值: "+r(l.value),1)])]),_:1}))}}),B=g(V,[["__scopeId","data-v-c53feb1f"]]);export{B as default};

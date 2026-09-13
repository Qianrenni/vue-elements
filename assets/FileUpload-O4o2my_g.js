import{D as g}from"./DemoBlock-B05dVkJ_.js";import{d as L,o as c,c as b,w as F,a as l,b as s,u as o,a4 as a,e as _,t as n,f as x,K as y,g as d,_ as B}from"./index-BxZBlDCD.js";const Q={class:"container-column"},k={class:"container flex-wrap"},N={class:"item"},D={class:"item"},V={class:"item"},w={class:"item"},C={class:"item"},z={class:"tip"},M={key:0},q=`
\`\`\`html
<script setup lang="ts">
import { QFileUpload, type UploadFile } from 'qyani-components';
import { ref } from 'vue';

const singleList = ref<UploadFile[]>([]);
const multipleList = ref<UploadFile[]>([]);
const dragList = ref<UploadFile[]>([]);
const disabledList = ref<UploadFile[]>([]);

/** 上传前校验：限制 2MB 以内 */
const beforeUpload = (file: File) => file.size <= 2 * 1024 * 1024;
<\/script>

<template>
  <!-- 单选（文本列表） -->
  <QFileUpload v-model:file-list="singleList" accept="image/*" />

  <!-- 多选 + 数量限制 -->
  <QFileUpload v-model:file-list="multipleList" multiple :max-count="3" accept="image/*" />

  <!-- 拖拽区域 + 缩略图列表 -->
  <QFileUpload v-model:file-list="dragList" drag list-type="picture" multiple />

  <!-- 上传前校验 -->
  <QFileUpload v-model:file-list="multipleList" :before-upload="beforeUpload" @remove="(file) => console.log('移除', file.name)" />

  <!-- 禁用 -->
  <QFileUpload v-model:file-list="disabledList" disabled />
</template>
\`\`\`
`,E=L({name:"DisplayFormFileUpload",__name:"FileUpload",setup(I){const m=d([]),i=d([]),r=d([]),u=d([]),f=d(""),v=p=>p.size<=2*1024*1024,U=p=>{f.value=p.name};return(p,e)=>(c(),b(g,{code:q},{default:F(()=>[l("div",Q,[l("div",k,[l("div",N,[e[5]||(e[5]=l("p",{class:"item-label"},"单选（文本列表）",-1)),s(o(a),{"file-list":m.value,"onUpdate:fileList":e[0]||(e[0]=t=>m.value=t),accept:"image/*"},null,8,["file-list"])]),l("div",D,[e[6]||(e[6]=l("p",{class:"item-label"},"多选 + 最多 3 个",-1)),s(o(a),{"file-list":i.value,"onUpdate:fileList":e[1]||(e[1]=t=>i.value=t),multiple:"","max-count":3,accept:"image/*"},null,8,["file-list"])]),l("div",V,[e[7]||(e[7]=l("p",{class:"item-label"},"拖拽 + 缩略图列表",-1)),s(o(a),{"file-list":r.value,"onUpdate:fileList":e[2]||(e[2]=t=>r.value=t),drag:"","list-type":"picture",multiple:""},null,8,["file-list"])]),l("div",w,[e[8]||(e[8]=l("p",{class:"item-label"},"上传前校验（≤ 2MB，可移除）",-1)),s(o(a),{"file-list":i.value,"onUpdate:fileList":e[3]||(e[3]=t=>i.value=t),"before-upload":v,onRemove:U},null,8,["file-list"])]),l("div",C,[e[9]||(e[9]=l("p",{class:"item-label"},"禁用",-1)),s(o(a),{"file-list":u.value,"onUpdate:fileList":e[4]||(e[4]=t=>u.value=t),disabled:""},null,8,["file-list"])])]),l("p",z,[_(" 已选：单选 "+n(m.value.length)+" 个 / 多选 "+n(i.value.length)+" 个 / 拖拽 "+n(r.value.length)+" 个 ",1),f.value?(c(),x("span",M,"（最近移除："+n(f.value)+"）",1)):y("",!0)])])]),_:1}))}}),S=B(E,[["__scopeId","data-v-9d061c1e"]]);export{S as default};

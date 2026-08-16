import{d as t,o as l,c as o,w as s,a as c,e as n,u as m,M as r,h as i,_ as d}from"./index-Bf_YbWGF.js";import{D as u}from"./DemoBlock-4acArJ58.js";const p={class:"w-100"},_=`
\`\`\`html
<template>
  <QFormTable 
    :data="tableData"
    :columns="columns"
  />
</template>

<script setup>
import { ref } from 'vue';
const tableData = ref([
  { id: 1, name: '张三', age: 25 },
  { id: 2, name: '李四', age: 30 },
]);
const columns = [
  { label: 'ID', value: 'id' },
  { label: '姓名', value: 'name' },
];
<\/script>
\`\`\`
`,b=t({name:"DisplayFormTable",__name:"FormTable",setup(f){const a=i([{id:1,name:"张三",age:25,city:"北京"},{id:2,name:"李四",age:30,city:"上海"},{id:3,name:"王五",age:28,city:"广州"},{id:4,name:"赵六",age:35,city:"深圳"}]),e=[{label:"ID",value:"id"},{label:"姓名",value:"name"},{label:"年龄",value:"age"},{label:"城市",value:"city"}];return(v,D)=>(l(),o(u,{code:_},{default:s(()=>[c("div",p,[n(m(r),{data:a.value,columns:e},null,8,["data"])])]),_:1}))}}),h=d(b,[["__scopeId","data-v-eb874296"]]);export{h as default};

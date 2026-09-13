import{D as t}from"./DemoBlock-CA-OtkyE.js";import{d as l,o,c as s,w as c,a as n,b as m,u as r,aa as i,i as d,_ as u}from"./index-D9J2GR8y.js";const p={class:"w-100"},_=`
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
`,b=l({name:"DisplayFormTable",__name:"FormTable",setup(f){const a=d([{id:1,name:"张三",age:25,city:"北京"},{id:2,name:"李四",age:30,city:"上海"},{id:3,name:"王五",age:28,city:"广州"},{id:4,name:"赵六",age:35,city:"深圳"}]),e=[{label:"ID",value:"id"},{label:"姓名",value:"name"},{label:"年龄",value:"age"},{label:"城市",value:"city"}];return(v,D)=>(o(),s(t,{code:_},{default:c(()=>[n("div",p,[m(r(i),{data:a.value,columns:e},null,8,["data"])])]),_:1}))}}),h=u(b,[["__scopeId","data-v-15ac6cb0"]]);export{h as default};

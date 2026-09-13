import{D as c}from"./DemoBlock-B05dVkJ_.js";import{d as y,o as V,c as x,w,a as u,b as a,u as l,a9 as t,g as s,a1 as G}from"./index-BxZBlDCD.js";const R={class:"container-column gap-4",style:{"max-width":"420px"}},U={class:"container flex-wrap"},_={class:"container flex-wrap"},z={class:"container flex-wrap"},g={class:"container flex-wrap"},B={class:"container flex-wrap"},Q=`
\`\`\`html
<!-- 基础用法：圆点单选 -->
<QRadioGroup v-model:value="basicValue" :options="fruits" />

<!-- 按钮组（描边） -->
<QRadioGroup
  v-model:value="buttonValue"
  :options="fruits"
  option-type="button"
  button-style="outline"
/>

<!-- 按钮组（实心） -->
<QRadioGroup
  v-model:value="solidValue"
  :options="fruits"
  option-type="button"
  button-style="solid"
/>

<!-- 尺寸 -->
<QRadioGroup v-model:value="sizeValue" :options="numbers" option-type="button" size="small" />

<!-- 整体禁用 -->
<QRadioGroup v-model:value="disabledValue" :options="fruits" disabled />
\`\`\`
`,N=y({name:"DisplayFormRadioGroup",__name:"RadioGroup",setup(k){const d=s("apple"),v=s("apple"),r=s("banana"),b=s("apple"),n=s("apple"),i=[{label:"苹果",value:"apple"},{label:"香蕉",value:"banana"},{label:"橙子",value:"orange",disabled:!0}],p=[1,2,3],f=m=>{G.info(`选中：${m}`)};return(m,o)=>(V(),x(c,{code:Q},{default:w(()=>[u("div",R,[u("div",U,[a(l(t),{value:d.value,"onUpdate:value":o[0]||(o[0]=e=>d.value=e),options:i,onChange:f},null,8,["value"])]),u("div",_,[a(l(t),{value:v.value,"onUpdate:value":o[1]||(o[1]=e=>v.value=e),options:i,"option-type":"button","button-style":"outline"},null,8,["value"])]),u("div",z,[a(l(t),{value:r.value,"onUpdate:value":o[2]||(o[2]=e=>r.value=e),options:i,"option-type":"button","button-style":"solid"},null,8,["value"])]),u("div",g,[a(l(t),{value:n.value,"onUpdate:value":o[3]||(o[3]=e=>n.value=e),options:p,"option-type":"button",size:"small"},null,8,["value"]),a(l(t),{value:n.value,"onUpdate:value":o[4]||(o[4]=e=>n.value=e),options:p,"option-type":"button",size:"middle"},null,8,["value"]),a(l(t),{value:n.value,"onUpdate:value":o[5]||(o[5]=e=>n.value=e),options:p,"option-type":"button",size:"large"},null,8,["value"])]),u("div",B,[a(l(t),{value:b.value,"onUpdate:value":o[6]||(o[6]=e=>b.value=e),options:i,disabled:""},null,8,["value"])])])]),_:1}))}});export{N as default};

import{D as x}from"./DemoBlock-D3lRM5dy.js";import{d as f,o as k,c as _,w as V,a as l,b as o,u as s,a0 as n,g as u,a1 as C}from"./index-BM7kyQMa.js";const h={class:"container-column gap-4",style:{"max-width":"420px"}},w={class:"container flex-wrap"},G={class:"container flex-wrap"},B={class:"container flex-wrap"},g={class:"container flex-wrap"},Q=`
\`\`\`html
<!-- 基础用法：数组双向绑定 + 默认选中 -->
<QCheckboxGroup v-model:value="basicValue" :options="fruits" />

<!-- 整体禁用 -->
<QCheckboxGroup v-model:value="disabledValue" :options="fruits" disabled />

<!-- 单项禁用 -->
<QCheckboxGroup v-model:value="mixedValue" :options="mixedOptions" />

<!-- 数字值 / 简写选项 -->
<QCheckboxGroup v-model:value="numberValue" :options="numbers" />
\`\`\`
`,N=f({name:"DisplayFormCheckboxGroup",__name:"CheckboxGroup",setup(U){const t=u(["apple"]),i=u(["apple"]),r=u(["normal"]),d=u([1,3]),p=[{label:"苹果",value:"apple"},{label:"香蕉",value:"banana"},{label:"橙子",value:"orange"},{label:"西瓜",value:"watermelon"}],c=[{label:"可选项",value:"normal"},{label:"禁选项",value:"blocked",disabled:!0},{label:"另一项",value:"extra"}],m=[1,2,3,4],b=v=>{C.info(`选中：${v.join("、")||"无"}`)};return(v,e)=>(k(),_(x,{code:Q},{default:V(()=>[l("div",h,[l("div",w,[o(s(n),{value:t.value,"onUpdate:value":e[0]||(e[0]=a=>t.value=a),options:p,onChange:b},null,8,["value"])]),l("div",G,[o(s(n),{value:i.value,"onUpdate:value":e[1]||(e[1]=a=>i.value=a),options:p,disabled:""},null,8,["value"])]),l("div",B,[o(s(n),{value:r.value,"onUpdate:value":e[2]||(e[2]=a=>r.value=a),options:c},null,8,["value"])]),l("div",g,[o(s(n),{value:d.value,"onUpdate:value":e[3]||(e[3]=a=>d.value=a),options:m},null,8,["value"])])])]),_:1}))}});export{N as default};

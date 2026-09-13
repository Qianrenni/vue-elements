import{D as c}from"./DemoBlock-B05dVkJ_.js";import{d as m,o as b,c as _,w as f,a as l,b as s,u as t,ac as n,t as v,g as u,_ as V}from"./index-BxZBlDCD.js";const w={class:"container-column"},S={class:"container flex-wrap"},h={class:"item"},x={class:"item"},g={class:"item"},B={class:"item"},D={class:"tip"},Q=`
\`\`\`html
<!-- 基础单选，支持清除 -->
<QSelect v-model:value="basicValue" :options="options" allow-clear placeholder="请选择水果" />

<!-- 多选 -->
<QSelect v-model:value="multipleValue" :options="options" mode="multiple" placeholder="可多选" />

<!-- 可搜索 -->
<QSelect v-model:value="searchValue" :options="options" show-search placeholder="输入关键字搜索" />

<!-- 禁用（列表中含 disabled 选项） -->
<QSelect v-model:value="disabledValue" :options="options" disabled />
\`\`\`
`,U=m({name:"DisplayFormSelect",__name:"Select",setup(k){const o=[{label:"苹果",value:"apple"},{label:"香蕉",value:"banana"},{label:"橙子",value:"orange"},{label:"西瓜",value:"watermelon",disabled:!0}],i=u("apple"),d=u(["apple","banana"]),p=u(),r=u("orange");return(y,e)=>(b(),_(c,{code:Q},{default:f(()=>[l("div",w,[l("div",S,[l("div",h,[e[4]||(e[4]=l("p",{class:"item-label"},"基础单选 / 可清除",-1)),s(t(n),{value:i.value,"onUpdate:value":e[0]||(e[0]=a=>i.value=a),options:o,"allow-clear":"",placeholder:"请选择水果"},null,8,["value"])]),l("div",x,[e[5]||(e[5]=l("p",{class:"item-label"},"多选",-1)),s(t(n),{value:d.value,"onUpdate:value":e[1]||(e[1]=a=>d.value=a),options:o,mode:"multiple",placeholder:"可多选"},null,8,["value"])]),l("div",g,[e[6]||(e[6]=l("p",{class:"item-label"},"可搜索",-1)),s(t(n),{value:p.value,"onUpdate:value":e[2]||(e[2]=a=>p.value=a),options:o,"show-search":"",placeholder:"输入关键字搜索"},null,8,["value"])]),l("div",B,[e[7]||(e[7]=l("p",{class:"item-label"},"禁用",-1)),s(t(n),{value:r.value,"onUpdate:value":e[3]||(e[3]=a=>r.value=a),options:o,disabled:""},null,8,["value"])])]),l("p",D," 当前值："+v(i.value)+" / "+v(d.value.join("、"))+" / "+v(p.value||"未选择"),1)])]),_:1}))}}),j=V(U,[["__scopeId","data-v-1d365115"]]);export{j as default};

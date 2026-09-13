import{D as p}from"./DemoBlock-B05dVkJ_.js";import{d as c,o as m,c as b,w as C,a as o,b as s,u as t,a2 as a,t as n,g as r,_ as w}from"./index-BxZBlDCD.js";const x={class:"container-column"},_={class:"container flex-wrap"},k={class:"item"},g={class:"item"},P={class:"item"},B={class:"item"},D={class:"tip"},Q=`
\`\`\`html
<!-- 基础色块 + 显示色值文本 -->
<QColorPicker v-model:value="basicColor" show-text allow-clear />

<!-- 预设色板 -->
<QColorPicker v-model:value="presetColor" :presets="presets" show-text />

<!-- rgb 文案 + 错误态 -->
<QColorPicker v-model:value="rgbColor" format="rgb" show-text status="error" />

<!-- 禁用 -->
<QColorPicker v-model:value="disabledColor" show-text disabled />
\`\`\`
`,U=c({name:"DisplayFormColorPicker",__name:"ColorPicker",setup(y){const f=[{label:"推荐",colors:["#1677ff","#52c41a","#faad14","#f5222d"]},{label:"中性",colors:["#000000","#595959","#bfbfbf","#ffffff"]}],i=r("#1677ff"),d=r("#52c41a"),u=r("#faad14"),v=r("#f5222d");return(h,e)=>(m(),b(p,{code:Q},{default:C(()=>[o("div",x,[o("div",_,[o("div",k,[e[4]||(e[4]=o("p",{class:"item-label"},"基础 / 可清除 / 显示色值",-1)),s(t(a),{value:i.value,"onUpdate:value":e[0]||(e[0]=l=>i.value=l),"show-text":"","allow-clear":""},null,8,["value"])]),o("div",g,[e[5]||(e[5]=o("p",{class:"item-label"},"预设色板",-1)),s(t(a),{value:d.value,"onUpdate:value":e[1]||(e[1]=l=>d.value=l),presets:f,"show-text":""},null,8,["value"])]),o("div",P,[e[6]||(e[6]=o("p",{class:"item-label"},"rgb 文案 / 错误态",-1)),s(t(a),{value:u.value,"onUpdate:value":e[2]||(e[2]=l=>u.value=l),format:"rgb","show-text":"",status:"error"},null,8,["value"])]),o("div",B,[e[7]||(e[7]=o("p",{class:"item-label"},"禁用",-1)),s(t(a),{value:v.value,"onUpdate:value":e[3]||(e[3]=l=>v.value=l),"show-text":"",disabled:""},null,8,["value"])])]),o("p",D," 当前值："+n(i.value)+" / "+n(d.value)+" / "+n(u.value),1)])]),_:1}))}}),F=w(U,[["__scopeId","data-v-4f17587d"]]);export{F as default};

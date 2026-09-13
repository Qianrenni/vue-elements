import{D as V}from"./DemoBlock-B05dVkJ_.js";import{d as b,o as f,c as k,w as _,a,b as t,u as o,aa as n,e as x,t as i,f as S,K as R,g as s,_ as B}from"./index-BxZBlDCD.js";const Q={class:"container-column"},U={class:"container flex-wrap"},j={class:"item"},y={class:"item"},D={class:"item"},N={class:"item"},w={class:"item"},A={class:"tip"},E={key:0},F=`
\`\`\`html
<!-- 基础区间 -->
<QRangeSlider v-model:value="basicValue" :min="0" :max="100" />

<!-- 步进 + 自定义范围 + 拖动结束回调 -->
<QRangeSlider v-model:value="stepValue" :min="0" :max="100" :step="10" @after-change="onAfterChange" />

<!-- 隐藏数值提示 -->
<QRangeSlider v-model:value="plainValue" :tooltip="false" />

<!-- 禁用 -->
<QRangeSlider v-model:value="disabledValue" disabled />

<!-- 刻度 marks -->
<QRangeSlider
  v-model:value="marksValue"
  :marks="{ 0: '0°C', 26: '26°C', 37: '37°C', 100: '100°C' }"
/>
\`\`\`
`,I=b({name:"DisplayFormRangeSlider",__name:"RangeSlider",setup(K){const u=s([20,60]),d=s([10,90]),r=s([30,80]),p=s([30,70]),v=s([26,37]),m=s(""),g={0:"0°C",26:"26°C",37:"37°C",100:"100°C"},C=c=>{m.value=c.join(" ~ ")};return(c,e)=>(f(),k(V,{code:F},{default:_(()=>[a("div",Q,[a("div",U,[a("div",j,[e[5]||(e[5]=a("p",{class:"item-label"},"基础区间",-1)),t(o(n),{value:u.value,"onUpdate:value":e[0]||(e[0]=l=>u.value=l),min:0,max:100},null,8,["value"])]),a("div",y,[e[6]||(e[6]=a("p",{class:"item-label"},"步进 10",-1)),t(o(n),{value:d.value,"onUpdate:value":e[1]||(e[1]=l=>d.value=l),min:0,max:100,step:10,onAfterChange:C},null,8,["value"])]),a("div",D,[e[7]||(e[7]=a("p",{class:"item-label"},"隐藏数值提示",-1)),t(o(n),{value:r.value,"onUpdate:value":e[2]||(e[2]=l=>r.value=l),tooltip:!1},null,8,["value"])]),a("div",N,[e[8]||(e[8]=a("p",{class:"item-label"},"禁用",-1)),t(o(n),{value:p.value,"onUpdate:value":e[3]||(e[3]=l=>p.value=l),disabled:""},null,8,["value"])]),a("div",w,[e[9]||(e[9]=a("p",{class:"item-label"},"刻度 marks",-1)),t(o(n),{value:v.value,"onUpdate:value":e[4]||(e[4]=l=>v.value=l),marks:g},null,8,["value"])])]),a("p",A,[x(" 当前值："+i(u.value.join(" ~ "))+" / "+i(d.value.join(" ~ "))+" / "+i(v.value.join(" ~ "))+" ",1),m.value?(f(),S("span",E,"（拖动结束："+i(m.value)+"）",1)):R("",!0)])])]),_:1}))}}),q=B(I,[["__scopeId","data-v-1c707c81"]]);export{q as default};

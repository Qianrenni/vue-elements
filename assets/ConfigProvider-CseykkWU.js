import{D as f}from"./DemoBlock-A_lV7GyA.js";import{d as p,o as b,c as v,w as t,a as l,e as r,u as e,f as n,g as s,aU as d,t as m,k as q,_ as c}from"./index-OW0U782s.js";const y={class:"row"},g={class:"panel"},C={class:"hint"},k={class:"panel"},B=`
\`\`\`html
<QConfigProvider
  :css-vars="{
    '--q-color-primary': '#3b82f6',
    '--q-color-button-bg': '#3b82f6',
    '--q-color-button-hover': '#2f6fe0',
  }"
>
  <QButton type="primary">蓝色主题</QButton>
</QConfigProvider>
\`\`\`
`,w=p({name:"DisplayThemeConfigProvider",__name:"ConfigProvider",setup(_){const a=q("brown"),i={brown:{"--q-color-primary":"#8c5a2b","--q-color-button-bg":"#8c5a2b","--q-color-button-hover":"#7a4e24","--q-color-button-active":"#6e451f"},blue:{"--q-color-primary":"#3b82f6","--q-color-button-bg":"#3b82f6","--q-color-button-hover":"#2f6fe0","--q-color-button-active":"#2a63c6"},purple:{"--q-color-primary":"#722ed1","--q-color-button-bg":"#722ed1","--q-color-button-hover":"#5f22b8","--q-color-button-active":"#521d9e"}};return(x,o)=>(b(),v(f,{code:B},{default:t(()=>[l("div",y,[r(e(n),{size:"small",onClick:o[0]||(o[0]=u=>a.value="brown")},{default:t(()=>[...o[3]||(o[3]=[s("书香褐",-1)])]),_:1}),r(e(n),{size:"small",onClick:o[1]||(o[1]=u=>a.value="blue")},{default:t(()=>[...o[4]||(o[4]=[s("科技蓝",-1)])]),_:1}),r(e(n),{size:"small",onClick:o[2]||(o[2]=u=>a.value="purple")},{default:t(()=>[...o[5]||(o[5]=[s("紫罗兰",-1)])]),_:1})]),r(e(d),{"css-vars":i[a.value]},{default:t(()=>[l("div",g,[r(e(n),{type:"primary"},{default:t(()=>[...o[6]||(o[6]=[s("主按钮",-1)])]),_:1}),r(e(n),null,{default:t(()=>[...o[7]||(o[7]=[s("默认按钮",-1)])]),_:1}),o[9]||(o[9]=l("span",{class:"chip"},null,-1)),l("p",C,[o[8]||(o[8]=s(" 当前 CSS 变量：",-1)),l("code",null,m(JSON.stringify(i[a.value])),1)])])]),_:1},8,["css-vars"]),r(e(d),{direction:"rtl"},{default:t(()=>[l("div",k,[r(e(n),{type:"primary"},{default:t(()=>[...o[10]||(o[10]=[s("RTL 方向",-1)])]),_:1}),o[11]||(o[11]=l("span",{class:"hint"},'该区块 dir="rtl"，文字从右向左。',-1))])]),_:1})]),_:1}))}}),N=c(w,[["__scopeId","data-v-3467586b"]]);export{N as default};

import{D as f}from"./DemoBlock-B05dVkJ_.js";import{d as m,o as u,c as v,w as o,a as s,b as e,u as t,T as a,e as l,b3 as d,t as y,g as b,_ as c}from"./index-BxZBlDCD.js";const q={class:"row"},C={class:"panel"},g={class:"hint"},k={class:"panel"},w=`
\`\`\`html
<QConfigProvider
  :css-vars="{
    '--q-color-primary': '#3b82f6',
    '--q-color-primary-hover': '#2f6fe0',
    '--q-color-primary-active': '#2a63c6',
  }"
>
  <QButton type="primary">蓝色主题</QButton>
</QConfigProvider>
\`\`\`
`,x=m({name:"DisplayThemeConfigProvider",__name:"ConfigProvider",setup(B){const i=b("brown"),n={brown:{"--q-color-primary":"#8c5a2b","--q-color-primary-hover":"#7a4e24","--q-color-primary-active":"#6e451f"},blue:{"--q-color-primary":"#3b82f6","--q-color-primary-hover":"#2f6fe0","--q-color-primary-active":"#2a63c6"},purple:{"--q-color-primary":"#722ed1","--q-color-primary-hover":"#5f22b8","--q-color-primary-active":"#521d9e"}};return(_,r)=>(u(),v(f,{code:w},{default:o(()=>[s("div",q,[e(t(a),{size:"small",onClick:r[0]||(r[0]=p=>i.value="brown")},{default:o(()=>[...r[3]||(r[3]=[l("书香褐",-1)])]),_:1}),e(t(a),{size:"small",onClick:r[1]||(r[1]=p=>i.value="blue")},{default:o(()=>[...r[4]||(r[4]=[l("科技蓝",-1)])]),_:1}),e(t(a),{size:"small",onClick:r[2]||(r[2]=p=>i.value="purple")},{default:o(()=>[...r[5]||(r[5]=[l("紫罗兰",-1)])]),_:1})]),e(t(d),{"css-vars":n[i.value]},{default:o(()=>[s("div",C,[e(t(a),{type:"primary"},{default:o(()=>[...r[6]||(r[6]=[l("主按钮",-1)])]),_:1}),e(t(a),null,{default:o(()=>[...r[7]||(r[7]=[l("默认按钮",-1)])]),_:1}),r[9]||(r[9]=s("span",{class:"chip"},null,-1)),s("p",g,[r[8]||(r[8]=l(" 当前 CSS 变量：",-1)),s("code",null,y(JSON.stringify(n[i.value])),1)])])]),_:1},8,["css-vars"]),e(t(d),{direction:"rtl"},{default:o(()=>[s("div",k,[e(t(a),{type:"primary"},{default:o(()=>[...r[10]||(r[10]=[l("RTL 方向",-1)])]),_:1}),r[11]||(r[11]=s("span",{class:"hint"},'该区块 dir="rtl"，文字从右向左。',-1))])]),_:1})]),_:1}))}}),D=c(x,[["__scopeId","data-v-9c8d0acb"]]);export{D as default};

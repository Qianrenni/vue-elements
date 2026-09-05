import{D as f}from"./DemoBlock-ClDmiYtN.js";import{d as m,o as u,c as v,w as o,a as t,b as e,u as s,p as a,e as l,b5 as d,t as y,h as b,_ as c}from"./index-By45x_bw.js";const q={class:"row"},C={class:"panel"},g={class:"hint"},k={class:"panel"},w=`
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
`,B=m({name:"DisplayThemeConfigProvider",__name:"ConfigProvider",setup(_){const i=b("brown"),n={brown:{"--q-color-primary":"#8c5a2b","--q-color-primary-hover":"#7a4e24","--q-color-primary-active":"#6e451f"},blue:{"--q-color-primary":"#3b82f6","--q-color-primary-hover":"#2f6fe0","--q-color-primary-active":"#2a63c6"},purple:{"--q-color-primary":"#722ed1","--q-color-primary-hover":"#5f22b8","--q-color-primary-active":"#521d9e"}};return(x,r)=>(u(),v(f,{code:w},{default:o(()=>[t("div",q,[e(s(a),{size:"small",onClick:r[0]||(r[0]=p=>i.value="brown")},{default:o(()=>[...r[3]||(r[3]=[l("书香褐",-1)])]),_:1}),e(s(a),{size:"small",onClick:r[1]||(r[1]=p=>i.value="blue")},{default:o(()=>[...r[4]||(r[4]=[l("科技蓝",-1)])]),_:1}),e(s(a),{size:"small",onClick:r[2]||(r[2]=p=>i.value="purple")},{default:o(()=>[...r[5]||(r[5]=[l("紫罗兰",-1)])]),_:1})]),e(s(d),{"css-vars":n[i.value]},{default:o(()=>[t("div",C,[e(s(a),{type:"primary"},{default:o(()=>[...r[6]||(r[6]=[l("主按钮",-1)])]),_:1}),e(s(a),null,{default:o(()=>[...r[7]||(r[7]=[l("默认按钮",-1)])]),_:1}),r[9]||(r[9]=t("span",{class:"chip"},null,-1)),t("p",g,[r[8]||(r[8]=l(" 当前 CSS 变量：",-1)),t("code",null,y(JSON.stringify(n[i.value])),1)])])]),_:1},8,["css-vars"]),e(s(d),{direction:"rtl"},{default:o(()=>[t("div",k,[e(s(a),{type:"primary"},{default:o(()=>[...r[10]||(r[10]=[l("RTL 方向",-1)])]),_:1}),r[11]||(r[11]=t("span",{class:"hint"},'该区块 dir="rtl"，文字从右向左。',-1))])]),_:1})]),_:1}))}}),N=c(B,[["__scopeId","data-v-9c8d0acb"]]);export{N as default};

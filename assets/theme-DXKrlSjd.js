import{D as c}from"./DemoBlock-ClDmiYtN.js";import{d as p,o as s,f as l,b as n,w as d,a as e,e as r,F as h,r as g,u as _,a4 as v,t as m,_ as y}from"./index-By45x_bw.js";const f={class:"container-column gap-6"},b={class:"container-column gap-4"},q={class:"theme-grid"},x={class:"theme-name"},k={class:"theme-value"},T=`
\`\`\`html
<!-- 方式一：body 类名 -->
<body class="dark-mode">…</body>

<!-- 方式二：data-theme 属性 -->
<html data-theme="dark">…</html>

<!-- 配合组件 -->
<QThemeToggle />
\`\`\`
`,S=p({name:"StylesTheme",__name:"theme",setup(V){const i=t=>getComputedStyle(document.body).getPropertyValue(t).trim(),u=["--q-color-primary","--q-color-primary-hover","--q-color-text","--q-color-text-description","--q-color-text-muted","--q-color-bg","--q-color-bg-secondary","--q-color-bg-card","--q-color-border","--q-color-link","--q-color-tag"].map(t=>({name:t,value:i(t)}));return(t,o)=>(s(),l("div",f,[n(c,{title:"暗色主题覆盖的语义变量",code:T},{default:d(()=>[e("div",b,[o[0]||(o[0]=e("p",null,[r(" 当前页面已通过 "),e("code",null,"useFollowSystemTheme"),r(" 跟随系统主题；点击右上角 "),e("strong",null,"QThemeToggle"),r(" 可手动切换，以下色块随主题实时联动： ")],-1)),e("div",q,[(s(!0),l(h,null,g(_(u),a=>(s(),l("div",{key:a.name,class:"theme-cell"},[e("div",{class:"theme-swatch",style:v({backgroundColor:`var(${a.name})`})},null,4),e("div",x,m(a.name),1),e("div",k,m(a.value),1)]))),128))])])]),_:1}),n(c,{title:"主题切换后整体表现"},{default:d(()=>[...o[1]||(o[1]=[e("div",{class:"container-column gap-4"},[e("div",{class:"card-demo"},[e("h4",{class:"card-demo-title"},"卡片示例"),e("p",null,"使用语义变量实现的卡片，暗色主题下自动反色。"),e("div",{class:"flex gap-4"},[e("span",{class:"tag-demo"},"标签"),e("span",{class:"tag-demo"},"状态")])])],-1)])]),_:1})]))}}),C=y(S,[["__scopeId","data-v-fc7aab92"]]);export{C as default};

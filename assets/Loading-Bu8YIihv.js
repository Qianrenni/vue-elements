import{d as a,o as i,c as p,w as r,a as e,e as n,u as s,X as o,_ as d}from"./index-Bf_YbWGF.js";import{D as c}from"./DemoBlock-4acArJ58.js";const l={class:"container-column gap-8"},_={class:"container gap-8 items-center"},m={class:"container gap-8 items-center"},g={class:"container gap-8 items-center"},u=`
\`\`\`html
<!-- 基础加载 -->
<QLoading type="breathing" />

<!-- 带文字的加载 -->
<QLoading type="spinner" text="加载中..." />

<!-- 骨架屏 -->
<QLoading type="skeleton" />
\`\`\`
`,f=a({name:"DisplayLoadingLoading",__name:"Loading",setup(y){return(L,t)=>(i(),p(c,{code:u},{default:r(()=>[e("div",l,[e("div",_,[n(s(o),{type:"breathing"}),t[0]||(t[0]=e("span",null,"呼吸动画",-1))]),e("div",m,[n(s(o),{type:"spinner",text:"加载中..."}),t[1]||(t[1]=e("span",null,"旋转加载",-1))]),e("div",g,[n(s(o),{type:"skeleton"}),t[2]||(t[2]=e("span",null,"骨架屏",-1))])])]),_:1}))}}),v=d(f,[["__scopeId","data-v-e2a8258e"]]);export{v as default};

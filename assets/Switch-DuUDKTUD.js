import{D as p}from"./DemoBlock-B05dVkJ_.js";import{d as f,o as w,c as h,w as V,a as t,b as a,u,ad as s,g as n,a1 as x}from"./index-BxZBlDCD.js";const S={class:"container-column gap-4",style:{"max-width":"420px"}},b={class:"container flex-wrap"},g={class:"container flex-wrap"},k={class:"container flex-wrap"},z={class:"container flex-wrap"},_=`
\`\`\`html
<!-- 基础用法 -->
<QSwitch v-model:value="basicValue" />

<!-- 内外文字 -->
<QSwitch v-model:value="textValue" checked-children="开" un-checked-children="关" />

<!-- 尺寸：small / default -->
<QSwitch v-model:value="sizeValue" size="small" />
<QSwitch v-model:value="sizeValue" size="default" />

<!-- 禁用 -->
<QSwitch v-model:value="disabledValue" disabled />

<!-- 加载中（不可切换） -->
<QSwitch v-model:value="loadingValue" loading />
\`\`\`
`,y=f({name:"DisplayFormSwitch",__name:"Switch",setup(Q){const d=n(!1),i=n(!0),o=n(!1),v=n(!0),c=n(!1),m=r=>{x.info(`开关状态：${r?"开":"关"}`)};return(r,e)=>(w(),h(p,{code:_},{default:V(()=>[t("div",S,[t("div",b,[a(u(s),{value:d.value,"onUpdate:value":e[0]||(e[0]=l=>d.value=l),onChange:m},null,8,["value"])]),t("div",g,[a(u(s),{value:i.value,"onUpdate:value":e[1]||(e[1]=l=>i.value=l),"checked-children":"开","un-checked-children":"关"},null,8,["value"])]),t("div",k,[a(u(s),{value:o.value,"onUpdate:value":e[2]||(e[2]=l=>o.value=l),size:"small"},null,8,["value"]),a(u(s),{value:o.value,"onUpdate:value":e[3]||(e[3]=l=>o.value=l),size:"default"},null,8,["value"])]),t("div",z,[a(u(s),{value:v.value,"onUpdate:value":e[4]||(e[4]=l=>v.value=l),disabled:""},null,8,["value"]),a(u(s),{value:c.value,"onUpdate:value":e[5]||(e[5]=l=>c.value=l),loading:""},null,8,["value"])])])]),_:1}))}});export{y as default};

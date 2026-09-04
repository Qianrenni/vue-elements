import{D as m}from"./DemoBlock-6OThNZgy.js";import{d as r,o as v,c,w as p,a as V,b as l,u as o,a2 as t,g as u}from"./index-3RdcHt7C.js";const f={class:"container-column gap-6"},i=`
\`\`\`html
<QRate v-model="value" />

<QRate v-model="value" allow-half />

<QRate v-model="value" character="赞" />
\`\`\`
`,k=r({name:"DisplayInputRate",__name:"Rate",setup(R){const n=u(3),s=u(2.5),d=u(4);return(_,e)=>(v(),c(m,{code:i},{default:p(()=>[V("div",f,[l(o(t),{modelValue:n.value,"onUpdate:modelValue":e[0]||(e[0]=a=>n.value=a)},null,8,["modelValue"]),l(o(t),{modelValue:s.value,"onUpdate:modelValue":e[1]||(e[1]=a=>s.value=a),"allow-half":""},null,8,["modelValue"]),l(o(t),{modelValue:d.value,"onUpdate:modelValue":e[2]||(e[2]=a=>d.value=a),character:"赞"},null,8,["modelValue"])])]),_:1}))}});export{k as default};

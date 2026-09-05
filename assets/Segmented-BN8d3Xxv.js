import{D as r}from"./DemoBlock-D4wge8Xk.js";import{d as p,o as v,c as m,w as g,a as l,b as o,u as s,Q as a,t as c,j as u,f as b}from"./index-ZsCVvRa6.js";const f={class:"seg-col"},_={class:"seg-row"},w={class:"val"},S={class:"seg-row"},V={class:"seg-row seg-row--top"},k=`
\`\`\`html
<QSegmented v-model="value" :options="['日', '周', '月']" />
<QSegmented
  v-model="align"
  :options="[
    { label: '左', value: 'left', icon: 'Menu' },
    { label: '中', value: 'center' },
    { label: '右', value: 'right', icon: 'More', disabled: true },
  ]"
/>
<QSegmented :options="opts" block size="large" />
<QSegmented :options="opts" vertical />
\`\`\`
`,Q=p({name:"DisplaySegmented",__name:"Segmented",setup(x){const t=u("day"),d=u("center"),i=[{label:"日",value:"day"},{label:"周",value:"week"},{label:"月",value:"month"}];return(y,e)=>(v(),m(r,{code:k},{default:g(()=>[l("div",f,[l("div",_,[e[2]||(e[2]=l("span",null,"基础：",-1)),o(s(a),{modelValue:t.value,"onUpdate:modelValue":e[0]||(e[0]=n=>t.value=n),options:["日","周","月"]},null,8,["modelValue"]),l("span",w,"当前："+c(t.value),1)]),l("div",S,[e[3]||(e[3]=l("span",null,"图标+禁用：",-1)),o(s(a),{modelValue:d.value,"onUpdate:modelValue":e[1]||(e[1]=n=>d.value=n),options:[{label:"左",value:"left",icon:"Menu"},{label:"中",value:"center"},{label:"右",value:"right",icon:"More",disabled:!0}]},null,8,["modelValue"])]),e[5]||(e[5]=l("div",{class:"seg-row"},[l("span",null,"撑满整行（block + large）：")],-1)),o(s(a),{options:i,block:"",size:"large"}),l("div",V,[e[4]||(e[4]=l("span",null,"纵向：",-1)),o(s(a),{options:i,vertical:""})])])]),_:1}))}}),M=b(Q,[["__scopeId","data-v-93c8dda1"]]);export{M as default};

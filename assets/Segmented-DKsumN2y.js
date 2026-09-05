import{D as r}from"./DemoBlock-A_lV7GyA.js";import{d as p,o as m,c as v,w as c,a as l,e as o,u as s,N as a,t as g,k as u,_ as b}from"./index-OW0U782s.js";const _={class:"seg-col"},f={class:"seg-row"},k={class:"val"},w={class:"seg-row"},S={class:"seg-row seg-row--top"},V=`
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
`,x=p({name:"DisplaySegmented",__name:"Segmented",setup(y){const t=u("day"),d=u("center"),i=[{label:"日",value:"day"},{label:"周",value:"week"},{label:"月",value:"month"}];return(B,e)=>(m(),v(r,{code:V},{default:c(()=>[l("div",_,[l("div",f,[e[2]||(e[2]=l("span",null,"基础：",-1)),o(s(a),{modelValue:t.value,"onUpdate:modelValue":e[0]||(e[0]=n=>t.value=n),options:["日","周","月"]},null,8,["modelValue"]),l("span",k,"当前："+g(t.value),1)]),l("div",w,[e[3]||(e[3]=l("span",null,"图标+禁用：",-1)),o(s(a),{modelValue:d.value,"onUpdate:modelValue":e[1]||(e[1]=n=>d.value=n),options:[{label:"左",value:"left",icon:"Menu"},{label:"中",value:"center"},{label:"右",value:"right",icon:"More",disabled:!0}]},null,8,["modelValue"])]),e[5]||(e[5]=l("div",{class:"seg-row"},[l("span",null,"撑满整行（block + large）：")],-1)),o(s(a),{options:i,block:"",size:"large"}),l("div",S,[e[4]||(e[4]=l("span",null,"纵向：",-1)),o(s(a),{options:i,vertical:""})])])]),_:1}))}}),Q=b(x,[["__scopeId","data-v-93c8dda1"]]);export{Q as default};

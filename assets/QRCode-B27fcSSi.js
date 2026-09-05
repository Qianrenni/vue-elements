import{d,o as r,c as u,w as c,a as s,b as o,u as t,P as l,D as p,G as v,f as m,H as _,h as f,_ as C}from"./index-By45x_bw.js";import{D as Q}from"./DemoBlock-ClDmiYtN.js";const h={class:"row"},z={class:"tip-row"},b={key:0,class:"qr-mini"},i="https://qianrenni.github.io/vue-elements/",R=`
\`\`\`html
<QQRCode :value="value" :size="160" />
<QQRCode
  :value="value"
  :size="160"
  color="#8c5a2b"
  error-level="H"
/>
<QQRCode :value="value" :size="120" :padding="2" />
\`\`\`
`,k=d({name:"DisplayQRCode",__name:"QRCode",setup(w){const e=f(i);return(x,a)=>(r(),u(Q,{code:R},{default:c(()=>[s("div",h,[o(t(l),{value:i,size:160}),o(t(l),{value:i,size:160,color:"#8c5a2b","error-level":"H"}),o(t(l),{value:i,size:120,padding:2})]),s("div",z,[a[1]||(a[1]=s("label",{class:"tip-label",for:"qr-input"},"试试改内容：",-1)),p(s("input",{id:"qr-input","onUpdate:modelValue":a[0]||(a[0]=n=>e.value=n),class:"tip-input",placeholder:"输入文本或链接"},null,512),[[v,e.value]]),e.value.trim()?(r(),m("div",b,[o(t(l),{value:e.value,size:96},null,8,["value"])])):_("",!0)])]),_:1}))}}),g=C(k,[["__scopeId","data-v-20129fea"]]);export{g as default};

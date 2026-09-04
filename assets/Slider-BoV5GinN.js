import{D as u}from"./DemoBlock-6OThNZgy.js";import{d as i,o as c,c as p,w as v,a as s,b as t,u as d,a3 as n,t as r,g as m,_}from"./index-3RdcHt7C.js";const f={class:"container-column gap-10 w-420"},V={class:"q-slider-note"},x=`
\`\`\`html
<QSlider v-model="value" :min="0" :max="100" :step="5" />

<QSlider
  v-model="value"
  :marks="{ 0: '0', 25: '25', 50: '50', 75: '75', 100: '100' }"
/>
\`\`\`
`,S=i({name:"DisplayInputSlider",__name:"Slider",setup(k){const a=m(30),l=m(60);return(B,e)=>(c(),p(u,{code:x},{default:v(()=>[s("div",f,[t(d(n),{modelValue:a.value,"onUpdate:modelValue":e[0]||(e[0]=o=>a.value=o),min:0,max:100,step:5},null,8,["modelValue"]),t(d(n),{modelValue:l.value,"onUpdate:modelValue":e[1]||(e[1]=o=>l.value=o),marks:{0:"0",25:"25",50:"50",75:"75",100:"100"}},null,8,["modelValue"]),s("div",V,"当前值："+r(a.value)+" / "+r(l.value),1)])]),_:1}))}}),w=_(S,[["__scopeId","data-v-91b24144"]]);export{w as default};

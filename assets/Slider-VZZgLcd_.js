import{D as u}from"./DemoBlock-DMksGsUm.js";import{d as i,o as p,c,w as v,a as s,b as t,u as n,an as d,t as r,j as m,f as _}from"./index-Calvsw3q.js";const f={class:"container-column gap-10 w-420"},V={class:"q-slider-note"},x=`
\`\`\`html
<QSlider v-model="value" :min="0" :max="100" :step="5" />

<QSlider
  v-model="value"
  :marks="{ 0: '0', 25: '25', 50: '50', 75: '75', 100: '100' }"
/>
\`\`\`
`,S=i({name:"DisplayInputSlider",__name:"Slider",setup(k){const a=m(30),l=m(60);return(B,e)=>(p(),c(u,{code:x},{default:v(()=>[s("div",f,[t(n(d),{modelValue:a.value,"onUpdate:modelValue":e[0]||(e[0]=o=>a.value=o),min:0,max:100,step:5},null,8,["modelValue"]),t(n(d),{modelValue:l.value,"onUpdate:modelValue":e[1]||(e[1]=o=>l.value=o),marks:{0:"0",25:"25",50:"50",75:"75",100:"100"}},null,8,["modelValue"]),s("div",V,"当前值："+r(a.value)+" / "+r(l.value),1)])]),_:1}))}}),y=_(S,[["__scopeId","data-v-91b24144"]]);export{y as default};

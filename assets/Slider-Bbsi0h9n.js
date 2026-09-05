import{D as u}from"./DemoBlock-A_lV7GyA.js";import{d as i,o as p,c,w as v,a as s,e as t,u as d,ae as n,t as m,k as r,_}from"./index-OW0U782s.js";const f={class:"container-column gap-10 w-420"},V={class:"q-slider-note"},k=`
\`\`\`html
<QSlider v-model="value" :min="0" :max="100" :step="5" />

<QSlider
  v-model="value"
  :marks="{ 0: '0', 25: '25', 50: '50', 75: '75', 100: '100' }"
/>
\`\`\`
`,x=i({name:"DisplayInputSlider",__name:"Slider",setup(S){const a=r(30),l=r(60);return(B,e)=>(p(),c(u,{code:k},{default:v(()=>[s("div",f,[t(d(n),{modelValue:a.value,"onUpdate:modelValue":e[0]||(e[0]=o=>a.value=o),min:0,max:100,step:5},null,8,["modelValue"]),t(d(n),{modelValue:l.value,"onUpdate:modelValue":e[1]||(e[1]=o=>l.value=o),marks:{0:"0",25:"25",50:"50",75:"75",100:"100"}},null,8,["modelValue"]),s("div",V,"当前值："+m(a.value)+" / "+m(l.value),1)])]),_:1}))}}),g=_(x,[["__scopeId","data-v-91b24144"]]);export{g as default};

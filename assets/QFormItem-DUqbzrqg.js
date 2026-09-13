import{D as d}from"./DemoBlock-B05dVkJ_.js";import{d as i,o as u,c,w as t,a as m,b as a,u as o,a6 as n,a7 as p,a5 as y,T as f,e as _,a8 as F}from"./index-BxZBlDCD.js";const x={class:"container-column",style:{"max-width":"320px"}},Q=`
\`\`\`html
<!-- QFormItem 用于 QForm 内部：label / 必填星号 / 错误提示 -->
<QForm :model="model" :rules="{ city: [{ required: true, message: '请选择城市' }] }">
  <QFormItem name="city" label="城市">
    <input v-model="model.city" placeholder="输入城市名（失焦校验）" />
  </QFormItem>
</QForm>
\`\`\`
`,I=i({name:"DisplayFormQFormItem",__name:"QFormItem",setup(b){const l=F({city:""}),r={city:[{required:!0,message:"请选择城市"}]};return(V,e)=>(u(),c(d,{code:Q},{default:t(()=>[m("div",x,[a(o(n),{model:l,rules:r,"label-width":"70px"},{default:t(()=>[a(o(p),{name:"city",label:"城市",required:""},{default:t(()=>[a(o(y),{modelValue:l.city,"onUpdate:modelValue":e[0]||(e[0]=s=>l.city=s),placeholder:"输入城市名（失焦校验）"},null,8,["modelValue"])]),_:1}),m("div",null,[a(o(f),{"html-type":"submit"},{default:t(()=>[...e[1]||(e[1]=[_("提交",-1)])]),_:1})])]),_:1},8,["model"])])]),_:1}))}});export{I as default};

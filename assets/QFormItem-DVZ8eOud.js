import{d,o as i,c,w as t,a as o,b as l,u as r,ad as n,ae as u,y as p,z as y,e as f,f as x,af as _}from"./index-D9J2GR8y.js";import{D as F}from"./DemoBlock-CA-OtkyE.js";const b={class:"container-column",style:{"max-width":"320px"}},Q=`
\`\`\`html
<!-- QFormItem 用于 QForm 内部：label / 必填星号 / 错误提示 -->
<QForm :model="model" :rules="{ city: [{ required: true, message: '请选择城市' }] }">
  <QFormItem name="city" label="城市">
    <input v-model="model.city" placeholder="输入城市名（失焦校验）" />
  </QFormItem>
</QForm>
\`\`\`
`,B=d({name:"DisplayFormQFormItem",__name:"QFormItem",setup(h){const a=_({city:""}),s={city:[{required:!0,message:"请选择城市"}]};return(v,e)=>(i(),c(F,{code:Q},{default:t(()=>[o("div",b,[l(r(n),{model:a,rules:s,"label-width":"70px"},{default:t(()=>[l(r(u),{name:"city",label:"城市",required:""},{default:t(()=>[p(o("input",{"onUpdate:modelValue":e[0]||(e[0]=m=>a.city=m),placeholder:"输入城市名（失焦校验）",style:{border:"1px solid #ccc",padding:"4px 8px",width:"100%"}},null,512),[[y,a.city]])]),_:1}),o("div",null,[l(r(f),{"html-type":"submit"},{default:t(()=>[...e[1]||(e[1]=[x("提交",-1)])]),_:1})])]),_:1},8,["model"])])]),_:1}))}});export{B as default};

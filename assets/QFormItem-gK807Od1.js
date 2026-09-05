import{d,o as i,c,w as t,a as o,b as l,u as r,ae as n,af as u,D as p,G as y,v as f,e as x,ag as _}from"./index-By45x_bw.js";import{D as F}from"./DemoBlock-ClDmiYtN.js";const Q={class:"container-column",style:{"max-width":"320px"}},b=`
\`\`\`html
<!-- QFormItem 用于 QForm 内部：label / 必填星号 / 错误提示 -->
<QForm :model="model" :rules="{ city: [{ required: true, message: '请选择城市' }] }">
  <QFormItem name="city" label="城市">
    <input v-model="model.city" placeholder="输入城市名（失焦校验）" />
  </QFormItem>
</QForm>
\`\`\`
`,I=d({name:"DisplayFormQFormItem",__name:"QFormItem",setup(v){const a=_({city:""}),s={city:[{required:!0,message:"请选择城市"}]};return(h,e)=>(i(),c(F,{code:b},{default:t(()=>[o("div",Q,[l(r(n),{model:a,rules:s,"label-width":"70px"},{default:t(()=>[l(r(u),{name:"city",label:"城市",required:""},{default:t(()=>[p(o("input",{"onUpdate:modelValue":e[0]||(e[0]=m=>a.city=m),placeholder:"输入城市名（失焦校验）",style:{border:"1px solid #ccc",padding:"4px 8px",width:"100%"}},null,512),[[y,a.city]])]),_:1}),o("div",null,[l(r(f),{type:"submit"},{default:t(()=>[...e[1]||(e[1]=[x("提交",-1)])]),_:1})])]),_:1},8,["model"])])]),_:1}))}});export{I as default};

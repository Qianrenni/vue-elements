import{D as r}from"./DemoBlock-D_0QWcIO.js";import{d as i,o as v,c as _,w as f,a as t,b as s,u as n,ai as u,t as d,h as p,_ as h}from"./index-By5sKUAP.js";const w={class:"container-column gap-10 w-420"},V={class:"q-ac-note"},C=`
\`\`\`html
<QAutoComplete
  v-model="value"
  :options="options"
  placeholder="输入地址"
  style="width: 280px"
/>

<QAutoComplete
  v-model="value2"
  :options="gmail"
  placeholder="输入 @ 过滤后缀"
  allow-clear
  style="width: 280px"
/>
\`\`\`
`,g=i({name:"DisplayInputAutoComplete",__name:"AutoComplete",setup(x){const o=p(""),l=p(""),c=[{value:"Burns Bay Road"},{value:"Downing Street"},{value:"Wall Street"},{value:"Wall Street 2"}],m=["@gmail.com","@163.com","@qq.com"];return(y,e)=>(v(),_(r,{code:C},{default:f(()=>[t("div",w,[s(n(u),{modelValue:o.value,"onUpdate:modelValue":e[0]||(e[0]=a=>o.value=a),options:c,placeholder:"输入地址搜索（自动完成）"},null,8,["modelValue"]),s(n(u),{modelValue:l.value,"onUpdate:modelValue":e[1]||(e[1]=a=>l.value=a),options:m,"allow-clear":"",placeholder:"输入 @ 自动补全后缀"},null,8,["modelValue"]),t("div",V," 当前值："+d(o.value||"(空)")+" / "+d(l.value||"(空)"),1)])]),_:1}))}}),D=h(g,[["__scopeId","data-v-5df583a5"]]);export{D as default};

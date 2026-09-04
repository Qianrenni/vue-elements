import{D as r}from"./DemoBlock-6OThNZgy.js";import{d as i,o as v,c as _,w as f,a as t,b as s,u as n,Z as u,t as d,g as p,_ as w}from"./index-3RdcHt7C.js";const V={class:"container-column gap-10 w-420"},g={class:"q-ac-note"},h=`
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
`,C=i({name:"DisplayInputAutoComplete",__name:"AutoComplete",setup(x){const o=p(""),l=p(""),c=[{value:"Burns Bay Road"},{value:"Downing Street"},{value:"Wall Street"},{value:"Wall Street 2"}],m=["@gmail.com","@163.com","@qq.com"];return(B,e)=>(v(),_(r,{code:h},{default:f(()=>[t("div",V,[s(n(u),{modelValue:o.value,"onUpdate:modelValue":e[0]||(e[0]=a=>o.value=a),options:c,placeholder:"输入地址搜索（自动完成）"},null,8,["modelValue"]),s(n(u),{modelValue:l.value,"onUpdate:modelValue":e[1]||(e[1]=a=>l.value=a),options:m,"allow-clear":"",placeholder:"输入 @ 自动补全后缀"},null,8,["modelValue"]),t("div",g," 当前值："+d(o.value||"(空)")+" / "+d(l.value||"(空)"),1)])]),_:1}))}}),D=w(C,[["__scopeId","data-v-5df583a5"]]);export{D as default};

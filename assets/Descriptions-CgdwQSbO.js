import{D as r}from"./DemoBlock-D4wge8Xk.js";import{d as i,o as c,c as m,w as l,b as e,u as t,I as o,e as d}from"./index-ZsCVvRa6.js";const p=`
\`\`\`html
<QDescriptions title="用户信息" :items="items" />
<QDescriptions
  title="带边框"
  bordered
  :column="3"
  :items="items"
/>
<QDescriptions
  title="垂直"
  layout="vertical"
  bordered
  :column="3"
  :items="verticalItems"
/>
\`\`\`
`,D=i({name:"DisplayDescriptions",__name:"Descriptions",setup(b){const n=[{key:"name",label:"姓名",content:"张三"},{key:"phone",label:"电话",content:"1810000000"},{key:"city",label:"城市",content:"杭州"},{key:"remark",label:"备注",content:"VIP"},{key:"address",label:"地址",content:"浙江省杭州市西湖区万塘路 18 号",span:2}],a=[{key:"product",label:"产品",content:"云数据库"},{key:"mode",label:"计费方式",content:"包年包月"},{key:"renew",label:"自动续费",content:"是"}];return(u,s)=>(c(),m(r,{code:p},{default:l(()=>[e(t(o),{title:"用户信息",items:n,style:{"margin-bottom":"24px"}}),e(t(o),{title:"带边框（可编辑操作区）",column:3,bordered:"",items:n,style:{"margin-bottom":"24px"}},{extra:l(()=>[...s[0]||(s[0]=[d("编辑",-1)])]),_:1}),e(t(o),{title:"垂直",layout:"vertical",bordered:"",column:3,items:a})]),_:1}))}});export{D as default};

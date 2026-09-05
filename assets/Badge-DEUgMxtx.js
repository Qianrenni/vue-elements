import{d as u,o as d,c as l,w as a,a as e,b as o,u as n,l as s,_ as i}from"./index-By5sKUAP.js";import{D as r}from"./DemoBlock-D_0QWcIO.js";const g={class:"container-column gap-8"},b={class:"container gap-8 items-center"},p={class:"container gap-8 items-center"},B=`
\`\`\`html
<!-- 基础用法 -->
<QBadge :value="10">
  <button>消息</button>
</QBadge>

<!-- 不同类型 -->
<QBadge type="success" :value="5">成功</QBadge>
<QBadge type="danger" :value="99">危险</QBadge>

<!-- 点状徽章 -->
<QBadge dot>
  <button>通知</button>
</QBadge>

<!-- 超过最大值 -->
<QBadge :value="100" :max="99">
  <button>大量</button>
</QBadge>
\`\`\`
`,c=u({name:"DisplayBadge",__name:"Badge",setup(m){return(f,t)=>(d(),l(r,{code:B},{default:a(()=>[e("div",g,[e("div",b,[o(n(s),{value:10},{default:a(()=>[...t[0]||(t[0]=[e("button",{class:"button-outline"},"消息",-1)])]),_:1}),o(n(s),{type:"success",value:5},{default:a(()=>[...t[1]||(t[1]=[e("button",{class:"button-outline"},"成功",-1)])]),_:1}),o(n(s),{type:"danger",value:99},{default:a(()=>[...t[2]||(t[2]=[e("button",{class:"button-outline"},"危险",-1)])]),_:1}),o(n(s),{type:"warning",value:3},{default:a(()=>[...t[3]||(t[3]=[e("button",{class:"button-outline"},"警告",-1)])]),_:1})]),e("div",p,[o(n(s),{dot:""},{default:a(()=>[...t[4]||(t[4]=[e("button",{class:"button-outline"},"点状",-1)])]),_:1}),o(n(s),{value:100,max:99},{default:a(()=>[...t[5]||(t[5]=[e("button",{class:"button-outline"},"99+",-1)])]),_:1})])])]),_:1}))}}),Q=i(c,[["__scopeId","data-v-459318ad"]]);export{Q as default};

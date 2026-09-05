import{D as c}from"./DemoBlock-CXFQJDZo.js";import{d as i,o,c as r,w as n,a as s,b as l,u as p,aN as e,i as d,F as x,r as m,t as u,f as b}from"./index-CRccyhqz.js";const f={class:"container-column gap-8 demo-wrap"},S={class:"container-column gap-3"},_={class:"container-column gap-3"},w={class:"container-column gap-3"},g={class:"container-column gap-3"},v=`
\`\`\`html
<QSpace>
  <span class="box">1</span>
  <span class="box">2</span>
  <span class="box">3</span>
</QSpace>

<QSpace direction="vertical" size="large">
  <span class="box wide">纵向 A</span>
  <span class="box wide">纵向 B</span>
</QSpace>

<QSpace size="small" wrap>
  <span class="box">S</span>
  <span class="box">M</span>
  <span class="box">L</span>
</QSpace>

<QSpace split="/">
  <span>目录</span>
  <span>详情</span>
  <span>关于</span>
</QSpace>
\`\`\`
`,B=i({name:"DisplayLayoutSpace",__name:"Space",setup(Q){return(k,a)=>(o(),r(c,{code:v},{default:n(()=>[s("div",f,[s("div",S,[a[1]||(a[1]=s("span",{class:"label"},"水平 · middle（默认 16px）",-1)),l(p(e),null,{default:n(()=>[...a[0]||(a[0]=[s("span",{class:"box"},"1",-1),s("span",{class:"box"},"2",-1),s("span",{class:"box"},"3",-1)])]),_:1})]),s("div",_,[a[3]||(a[3]=s("span",{class:"label"},"垂直 · large（24px）",-1)),l(p(e),{direction:"vertical",size:"large"},{default:n(()=>[...a[2]||(a[2]=[s("span",{class:"box wide"},"纵向 A",-1),s("span",{class:"box wide"},"纵向 B",-1)])]),_:1})]),s("div",w,[a[4]||(a[4]=s("span",{class:"label"},"水平 · small（8px）· wrap",-1)),l(p(e),{size:"small",wrap:"",class:"wrap-demo"},{default:n(()=>[(o(),d(x,null,m(10,t=>s("span",{key:t,class:"box"},u(t),1)),64))]),_:1})]),s("div",g,[a[7]||(a[7]=s("span",{class:"label"},"split（分隔文本与分隔条）",-1)),l(p(e),{split:"/"},{default:n(()=>[...a[5]||(a[5]=[s("span",{class:"text"},"目录",-1),s("span",{class:"text"},"详情",-1),s("span",{class:"text"},"关于",-1)])]),_:1}),l(p(e),{split:""},{default:n(()=>[...a[6]||(a[6]=[s("span",{class:"text"},"A",-1),s("span",{class:"text"},"B",-1),s("span",{class:"text"},"C",-1)])]),_:1})])])]),_:1}))}}),z=b(B,[["__scopeId","data-v-88ee04b4"]]);export{z as default};

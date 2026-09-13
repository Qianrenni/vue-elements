import{D as o}from"./DemoBlock-D3lRM5dy.js";import{d as p,o as c,c as m,w as h,a as s,b as a,u as t,s as e,_ as i}from"./index-BM7kyQMa.js";const r={class:"container-column gap-8"},n={class:"container gap-8"},d=`
\`\`\`html
<!-- 基础用法 -->
<QLazyImage src="https://example.com/image.jpg" />

<!-- 自定义尺寸 -->
<QLazyImage 
  src="https://example.com/image.jpg" 
  width="300px" 
  height="200px" 
/>

<!-- 带alt文本 -->
<QLazyImage 
  src="https://example.com/image.jpg" 
  alt="图片描述" 
  width="400" 
  height="300" 
/>
\`\`\`
`,g=p({name:"DisplayLazyImage",__name:"LazyImage",setup(_){return(l,x)=>(c(),m(o,{code:d},{default:h(()=>[s("div",r,[s("div",n,[a(t(e),{src:"https://picsum.photos/200/200?random=1",width:"200px",height:"200px"}),a(t(e),{src:"https://picsum.photos/300/200?random=2",width:"300px",height:"200px"}),a(t(e),{src:"https://picsum.photos/400/300?random=3",width:"400px",height:"300px"})])])]),_:1}))}}),y=i(g,[["__scopeId","data-v-9c5e8b10"]]);export{y as default};

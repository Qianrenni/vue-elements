import{d as o,o as p,c,w as m,a as s,e as a,u as t,x as e,_ as h}from"./index-70o3v1oX.js";import{D as i}from"./DemoBlock-FYipY6ND.js";const r={class:"container-column gap-8"},n={class:"container gap-8"},d=`
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
`,g=o({name:"DisplayLazyImage",__name:"LazyImage",setup(_){return(x,l)=>(p(),c(i,{code:d},{default:m(()=>[s("div",r,[s("div",n,[a(t(e),{src:"https://picsum.photos/200/200?random=1",width:"200px",height:"200px"}),a(t(e),{src:"https://picsum.photos/300/200?random=2",width:"300px",height:"200px"}),a(t(e),{src:"https://picsum.photos/400/300?random=3",width:"400px",height:"300px"})])])]),_:1}))}}),w=h(g,[["__scopeId","data-v-d402c725"]]);export{w as default};

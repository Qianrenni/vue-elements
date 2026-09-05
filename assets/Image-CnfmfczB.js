import{D as g}from"./DemoBlock-DMksGsUm.js";import{d as h,o as m,c as v,w,a as c,b as o,u as e,M as i,t as u,j as _,f as x}from"./index-Calvsw3q.js";const I={class:"row"},y={class:"tip"},b=`
\`\`\`html
<QImage
  v-model:preview-open="open"
  :src="img1"
  width="120"
  height="80"
  fit="cover"
/>
\`\`\`
`,B=h({name:"DisplayImage",__name:"Image",setup(D){const s=(n,t,r)=>`data:image/svg+xml;charset=utf-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${n}"/><stop offset="1" stop-color="${t}"/></linearGradient></defs><rect width="600" height="400" fill="url(#g)"/><text x="300" y="210" font-size="44" text-anchor="middle" fill="#fff">${r}</text></svg>`)}`,l=s("#8c5a2b","#d4b48e","山间"),f=s("#0d6efd","#8fcae8","海洋"),p=s("#28a745","#b2f2cc","森林"),d=s("#c82333","#f5a3a3","晚霞"),a=_(!1);return(n,t)=>(m(),v(g,{code:b},{default:w(()=>[t[1]||(t[1]=c("p",{class:"tip"}," 点击缩略图打开全屏预览：滚轮缩放、底部工具栏放大/缩小/还原/旋转/关闭。 ",-1)),c("div",I,[o(e(i),{"preview-open":a.value,"onUpdate:previewOpen":t[0]||(t[0]=r=>a.value=r),src:e(l),width:"140",height:"94",fit:"cover"},null,8,["preview-open","src"]),o(e(i),{src:e(f),width:"140",height:"94",fit:"cover"},null,8,["src"]),o(e(i),{src:e(p),width:"120",height:"120",fit:"cover"},null,8,["src"]),o(e(i),{src:e(d),width:"140",height:"94",fit:"cover",preview:""},null,8,["src"])]),c("p",y,"当前第一张预览受控："+u(a.value?"开":"关"),1)]),_:1}))}}),C=x(B,[["__scopeId","data-v-9843cf25"]]);export{C as default};

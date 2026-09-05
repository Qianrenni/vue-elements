import{D as n}from"./DemoBlock-ClDmiYtN.js";import{d as g,o as i,c as u,w as p,a as s,b as e,u as o,k as t,e as r,t as f,h as T,_ as Q}from"./index-By45x_bw.js";const m={class:"container-column gap-5 demo-wrap"},v={class:"container-column gap-2"},w={class:"container-row gap-4 flex-wrap align-center"},b={class:"container-row gap-4 flex-wrap align-center"},x=`
\`\`\`html
<QTypography :level="1">一级标题</QTypography>
<QTypography :level="2">二级标题</QTypography>
<QTypography type="secondary">次要文本</QTypography>
<QTypography type="success">成功文本</QTypography>
<QTypography type="warning">警告文本</QTypography>
<QTypography type="danger">危险文本</QTypography>
<QTypography paragraph>一段说明文字……</QTypography>
<QTypography strong italic underline>组合样式</QTypography>
<QTypography copyable>复制我</QTypography>
<QTypography editable @change="onEdit">{{ edited }}</QTypography>
\`\`\`
`,k=g({name:"DisplayBasicTypography",__name:"Typography",setup(_){const y=T("点击 ✎ 编辑这段文字"),d=l=>{y.value=l};return(l,a)=>(i(),u(n,{code:x},{default:p(()=>[s("div",m,[e(o(t),{level:1},{default:p(()=>[...a[0]||(a[0]=[r("一级标题",-1)])]),_:1}),e(o(t),{level:3},{default:p(()=>[...a[1]||(a[1]=[r("三级标题",-1)])]),_:1}),e(o(t),{paragraph:""},{default:p(()=>[...a[2]||(a[2]=[r(" 一段正文：QTypography 提供标题、段落与行内文本的统一样式，支持语义色、组合样式、省略号与复制。 ",-1)])]),_:1}),s("div",v,[e(o(t),{type:"secondary"},{default:p(()=>[...a[3]||(a[3]=[r("次要（secondary）",-1)])]),_:1}),e(o(t),{type:"success"},{default:p(()=>[...a[4]||(a[4]=[r("成功（success）",-1)])]),_:1}),e(o(t),{type:"warning"},{default:p(()=>[...a[5]||(a[5]=[r("警告（warning）",-1)])]),_:1}),e(o(t),{type:"danger"},{default:p(()=>[...a[6]||(a[6]=[r("危险（danger）",-1)])]),_:1}),e(o(t),{disabled:""},{default:p(()=>[...a[7]||(a[7]=[r("禁用/弱化",-1)])]),_:1})]),s("div",w,[e(o(t),{strong:""},{default:p(()=>[...a[8]||(a[8]=[r("加粗",-1)])]),_:1}),e(o(t),{italic:""},{default:p(()=>[...a[9]||(a[9]=[r("斜体",-1)])]),_:1}),e(o(t),{underline:""},{default:p(()=>[...a[10]||(a[10]=[r("下划线",-1)])]),_:1}),e(o(t),{delete:""},{default:p(()=>[...a[11]||(a[11]=[r("删除线",-1)])]),_:1}),e(o(t),{mark:""},{default:p(()=>[...a[12]||(a[12]=[r("高亮",-1)])]),_:1}),e(o(t),{code:""},{default:p(()=>[...a[13]||(a[13]=[r("const a = 1",-1)])]),_:1}),e(o(t),{keyboard:""},{default:p(()=>[...a[14]||(a[14]=[r("Ctrl + C",-1)])]),_:1})]),s("div",b,[e(o(t),{paragraph:"",ellipsis:2,class:"ellipsis-demo"},{default:p(()=>[...a[15]||(a[15]=[r(" 很长的段落内容用于演示多行省略效果，超出两行后会自动截断并显示省略号，方便在卡片/表格等受限空间内使用。 ",-1)])]),_:1}),e(o(t),{copyable:""},{default:p(()=>[...a[16]||(a[16]=[r("点击右侧图标复制本句",-1)])]),_:1}),e(o(t),{editable:"",onChange:d},{default:p(()=>[r(f(y.value),1)]),_:1})])])]),_:1}))}}),D=Q(k,[["__scopeId","data-v-cbc90c69"]]);export{D as default};

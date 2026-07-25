import{d,o as a,c as B,w as o,a as m,e,u as s,q as l,p as r,O as f}from"./index-DtVGf8tM.js";import{D as p}from"./DemoBlock-Bx5i5bzO.js";const F={class:"container-column"},Q={class:"container flex-wrap"},k={class:"container flex-wrap"},v=`
\`\`\`html
<!-- 基础按钮 -->
<QFormButton>默认按钮</QFormButton>

<!-- 不同尺寸 -->
<QFormButton size="small">小按钮</QFormButton>
<QFormButton size="middle">中按钮</QFormButton>
<QFormButton size="large">大按钮</QFormButton>

<!-- 禁用状态 -->
<QFormButton disabled>禁用按钮</QFormButton>

<!-- 提交按钮 -->
<QFormButton type="submit">提交</QFormButton>
\`\`\`
`,z=d({name:"DisplayFormButton",__name:"FormButton",setup(C){const n=u=>{f.info(`点击了${u}`)};return(u,t)=>(a(),B(p,{code:v},{default:o(()=>[m("div",F,[m("div",Q,[e(s(l),{onClick:t[0]||(t[0]=i=>n("默认按钮"))},{default:o(()=>[...t[7]||(t[7]=[r("默认按钮",-1)])]),_:1}),e(s(l),{size:"small",onClick:t[1]||(t[1]=i=>n("小按钮"))},{default:o(()=>[...t[8]||(t[8]=[r("小按钮",-1)])]),_:1}),e(s(l),{size:"middle",onClick:t[2]||(t[2]=i=>n("中按钮"))},{default:o(()=>[...t[9]||(t[9]=[r("中按钮",-1)])]),_:1}),e(s(l),{size:"large",onClick:t[3]||(t[3]=i=>n("大按钮"))},{default:o(()=>[...t[10]||(t[10]=[r("大按钮",-1)])]),_:1})]),m("div",k,[e(s(l),{disabled:"",onClick:t[4]||(t[4]=i=>n("禁用按钮"))},{default:o(()=>[...t[11]||(t[11]=[r("禁用按钮",-1)])]),_:1}),e(s(l),{type:"submit",onClick:t[5]||(t[5]=i=>n("提交按钮"))},{default:o(()=>[...t[12]||(t[12]=[r("提交按钮",-1)])]),_:1}),e(s(l),{type:"reset",onClick:t[6]||(t[6]=i=>n("重置按钮"))},{default:o(()=>[...t[13]||(t[13]=[r("重置按钮",-1)])]),_:1})])])]),_:1}))}});export{z as default};

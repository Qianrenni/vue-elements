import{D as m}from"./DemoBlock-CA-OtkyE.js";import{d as a,o as f,c as B,w as o,a as d,b as e,u as s,e as l,f as i,a0 as p}from"./index-D9J2GR8y.js";const Q={class:"container-column"},k={class:"container flex-wrap"},v={class:"container flex-wrap"},C=`
\`\`\`html
<!-- 基础按钮 -->
<QButton>默认按钮</QButton>

<!-- 不同尺寸 -->
<QButton size="small">小按钮</QButton>
<QButton size="middle">中按钮</QButton>
<QButton size="large">大按钮</QButton>

<!-- 禁用状态 -->
<QButton disabled>禁用按钮</QButton>

<!-- 提交按钮 -->
<QButton html-type="submit">提交</QButton>
\`\`\`
`,z=a({name:"DisplayFormButton",__name:"FormButton",setup($){const n=r=>{p.info(`点击了${r}`)};return(r,t)=>(f(),B(m,{code:C},{default:o(()=>[d("div",Q,[d("div",k,[e(s(l),{onClick:t[0]||(t[0]=u=>n("默认按钮"))},{default:o(()=>[...t[7]||(t[7]=[i("默认按钮",-1)])]),_:1}),e(s(l),{size:"small",onClick:t[1]||(t[1]=u=>n("小按钮"))},{default:o(()=>[...t[8]||(t[8]=[i("小按钮",-1)])]),_:1}),e(s(l),{size:"middle",onClick:t[2]||(t[2]=u=>n("中按钮"))},{default:o(()=>[...t[9]||(t[9]=[i("中按钮",-1)])]),_:1}),e(s(l),{size:"large",onClick:t[3]||(t[3]=u=>n("大按钮"))},{default:o(()=>[...t[10]||(t[10]=[i("大按钮",-1)])]),_:1})]),d("div",v,[e(s(l),{disabled:"",onClick:t[4]||(t[4]=u=>n("禁用按钮"))},{default:o(()=>[...t[11]||(t[11]=[i("禁用按钮",-1)])]),_:1}),e(s(l),{"html-type":"submit",onClick:t[5]||(t[5]=u=>n("提交按钮"))},{default:o(()=>[...t[12]||(t[12]=[i("提交按钮",-1)])]),_:1}),e(s(l),{"html-type":"reset",onClick:t[6]||(t[6]=u=>n("重置按钮"))},{default:o(()=>[...t[13]||(t[13]=[i("重置按钮",-1)])]),_:1})])])]),_:1}))}});export{z as default};

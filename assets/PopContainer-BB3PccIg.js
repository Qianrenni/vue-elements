import{D as r}from"./DemoBlock-D3lRM5dy.js";import{d,o as u,c as v,w as t,a as n,b as e,u as s,aF as i,T as p,e as l,g as m,_ as f}from"./index-BM7kyQMa.js";const b={class:"container gap-8 items-center pop-area"},C=`
\`\`\`html
<!-- 悬停显示弹出内容 -->
<QPopContainer hover-show position="bottom-center">
  <QButton>悬停查看</QButton>
  <template #pop>弹出内容</template>
</QPopContainer>

<!-- 通过 visible 控制显示 -->
<QPopContainer :visible="visible" position="bottom-center">
  <QButton @click="visible = !visible">点击切换</QButton>
  <template #pop>弹出内容</template>
</QPopContainer>
\`\`\`
`,c=d({name:"DisplayLayoutPopContainer",__name:"PopContainer",setup(B){const a=m(!1);return(Q,o)=>(u(),v(r,{code:C},{default:t(()=>[n("div",b,[e(s(i),{"hover-show":"",position:"bottom-center"},{pop:t(()=>[...o[2]||(o[2]=[n("div",{class:"pop-card"},"悬停显示的弹出内容",-1)])]),default:t(()=>[e(s(p),null,{default:t(()=>[...o[1]||(o[1]=[l("悬停查看",-1)])]),_:1})]),_:1}),e(s(i),{visible:a.value,position:"bottom-center"},{pop:t(()=>[...o[4]||(o[4]=[n("div",{class:"pop-card"},"点击控制的弹出内容",-1)])]),default:t(()=>[e(s(p),{onClick:o[0]||(o[0]=_=>a.value=!a.value)},{default:t(()=>[...o[3]||(o[3]=[l("点击切换",-1)])]),_:1})]),_:1},8,["visible"]),e(s(i),{"hover-show":"",position:"right-center"},{pop:t(()=>[...o[6]||(o[6]=[n("div",{class:"pop-card"},"右侧弹出的内容",-1)])]),default:t(()=>[e(s(p),null,{default:t(()=>[...o[5]||(o[5]=[l("右侧弹出",-1)])]),_:1})]),_:1})])]),_:1}))}}),w=f(c,[["__scopeId","data-v-e62f3f56"]]);export{w as default};

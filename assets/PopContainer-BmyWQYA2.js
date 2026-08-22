import{D as l}from"./DemoBlock-CabccMzb.js";import{d,o as m,c as u,w as t,a as n,e,u as s,S as a,k as p,j as r,h as v,_ as f}from"./index-U0AIvf-7.js";const b={class:"container gap-8 items-center pop-area"},C=`
\`\`\`html
<!-- 悬停显示弹出内容 -->
<QPopContainer hover-show position="bottom-center">
  <QFormButton>悬停查看</QFormButton>
  <template #pop>弹出内容</template>
</QPopContainer>

<!-- 通过 visible 控制显示 -->
<QPopContainer :visible="visible" position="bottom-center">
  <QFormButton @click="visible = !visible">点击切换</QFormButton>
  <template #pop>弹出内容</template>
</QPopContainer>
\`\`\`
`,c=d({name:"DisplayLayoutPopContainer",__name:"PopContainer",setup(B){const i=v(!1);return(Q,o)=>(m(),u(l,{code:C},{default:t(()=>[n("div",b,[e(s(a),{"hover-show":"",position:"bottom-center"},{pop:t(()=>[...o[2]||(o[2]=[n("div",{class:"pop-card"},"悬停显示的弹出内容",-1)])]),default:t(()=>[e(s(p),null,{default:t(()=>[...o[1]||(o[1]=[r("悬停查看",-1)])]),_:1})]),_:1}),e(s(a),{visible:i.value,position:"bottom-center"},{pop:t(()=>[...o[4]||(o[4]=[n("div",{class:"pop-card"},"点击控制的弹出内容",-1)])]),default:t(()=>[e(s(p),{onClick:o[0]||(o[0]=_=>i.value=!i.value)},{default:t(()=>[...o[3]||(o[3]=[r("点击切换",-1)])]),_:1})]),_:1},8,["visible"]),e(s(a),{"hover-show":"",position:"right-center"},{pop:t(()=>[...o[6]||(o[6]=[n("div",{class:"pop-card"},"右侧弹出的内容",-1)])]),default:t(()=>[e(s(p),null,{default:t(()=>[...o[5]||(o[5]=[r("右侧弹出",-1)])]),_:1})]),_:1})])]),_:1}))}}),w=f(c,[["__scopeId","data-v-221e47eb"]]);export{w as default};

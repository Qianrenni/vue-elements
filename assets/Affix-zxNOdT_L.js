import{D as m}from"./DemoBlock-CA-OtkyE.js";import{d as b,o,c as y,w as s,a as t,b as f,u as n,aq as x,e as p,f as u,h as r,D as _,F as g,r as v,t as k,i as l,_ as h}from"./index-D9J2GR8y.js";const B={class:"affix-panel"},A={class:"affix-bar"},D={key:0,class:"affix-state"},F={class:"affix-content"},N={class:"affix-bar affix-bar--bottom"},Q={key:0,class:"affix-state"},V=`
\`\`\`html
<QAffix
  :offset-top="0"
  :target="() => boxRef"
  :on-change="(fixed) => (topFixed = fixed)"
>
  <QButton type="primary">吸顶工具栏</QButton>
</QAffix>
\`\`\`
`,w=b({name:"DisplayLayoutAffix",__name:"Affix",setup(C){const i=l(null),d=l(!1),c=l(!1);return(R,e)=>(o(),y(m,{code:V},{default:s(()=>[t("div",{ref_key:"boxRef",ref:i,class:"affix-box"},[t("div",B,[f(n(x),{"offset-top":0,target:()=>i.value,"on-change":a=>d.value=a},{default:s(()=>[t("div",A,[e[1]||(e[1]=t("span",{class:"affix-bar-title"},"📌 吸顶工具栏",-1)),f(n(p),{type:"primary",size:"small"},{default:s(()=>[...e[0]||(e[0]=[u("新建",-1)])]),_:1}),d.value?(o(),r("span",D,"已固定")):_("",!0)])]),_:1},8,["target","on-change"])]),t("div",F,[(o(),r(g,null,v(10,a=>t("p",{key:a}," 第 "+k(a)+" 段：在该滚动容器内向下滚动，顶部工具栏吸附在容器顶部；向上滚回原位后释放。 ",1)),64))]),f(n(x),{"offset-bottom":12,target:()=>i.value,"on-change":a=>c.value=a},{default:s(()=>[t("div",N,[e[3]||(e[3]=t("span",{class:"affix-bar-title"},"⬆ 吸底操作",-1)),f(n(p),{type:"primary",size:"small"},{default:s(()=>[...e[2]||(e[2]=[u("提交",-1)])]),_:1}),c.value?(o(),r("span",Q,"已固定")):_("",!0)])]),_:1},8,["target","on-change"])],512)]),_:1}))}}),q=h(w,[["__scopeId","data-v-bead09df"]]);export{q as default};

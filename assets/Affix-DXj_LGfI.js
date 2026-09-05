import{D as m}from"./DemoBlock-ClDmiYtN.js";import{d as y,o,c as b,w as s,a as t,b as f,u as n,ar as c,p as x,e as u,f as i,H as _,F as g,r as v,t as k,h as l,_ as h}from"./index-By45x_bw.js";const B={class:"affix-panel"},A={class:"affix-bar"},F={key:0,class:"affix-state"},D={class:"affix-content"},N={class:"affix-bar affix-bar--bottom"},Q={key:0,class:"affix-state"},V=`
\`\`\`html
<QAffix
  :offset-top="0"
  :target="() => boxRef"
  :on-change="(fixed) => (topFixed = fixed)"
>
  <QButton type="primary">吸顶工具栏</QButton>
</QAffix>
\`\`\`
`,C=y({name:"DisplayLayoutAffix",__name:"Affix",setup(R){const r=l(null),d=l(!1),p=l(!1);return(w,e)=>(o(),b(m,{code:V},{default:s(()=>[t("div",{ref_key:"boxRef",ref:r,class:"affix-box"},[t("div",B,[f(n(c),{"offset-top":0,target:()=>r.value,"on-change":a=>d.value=a},{default:s(()=>[t("div",A,[e[1]||(e[1]=t("span",{class:"affix-bar-title"},"📌 吸顶工具栏",-1)),f(n(x),{type:"primary",size:"small"},{default:s(()=>[...e[0]||(e[0]=[u("新建",-1)])]),_:1}),d.value?(o(),i("span",F,"已固定")):_("",!0)])]),_:1},8,["target","on-change"])]),t("div",D,[(o(),i(g,null,v(10,a=>t("p",{key:a}," 第 "+k(a)+" 段：在该滚动容器内向下滚动，顶部工具栏吸附在容器顶部；向上滚回原位后释放。 ",1)),64))]),f(n(c),{"offset-bottom":12,target:()=>r.value,"on-change":a=>p.value=a},{default:s(()=>[t("div",N,[e[3]||(e[3]=t("span",{class:"affix-bar-title"},"⬆ 吸底操作",-1)),f(n(x),{type:"primary",size:"small"},{default:s(()=>[...e[2]||(e[2]=[u("提交",-1)])]),_:1}),p.value?(o(),i("span",Q,"已固定")):_("",!0)])]),_:1},8,["target","on-change"])],512)]),_:1}))}}),E=h(C,[["__scopeId","data-v-bead09df"]]);export{E as default};

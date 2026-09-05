import{D as _}from"./DemoBlock-CXFQJDZo.js";import{d as b,o,c as g,w as s,a as t,b as f,u as n,ar as x,g as p,e as u,i as r,K as m,F as y,r as v,t as k,j as l,f as B}from"./index-CRccyhqz.js";const h={class:"affix-panel"},A={class:"affix-bar"},F={key:0,class:"affix-state"},D={class:"affix-content"},N={class:"affix-bar affix-bar--bottom"},Q={key:0,class:"affix-state"},V=`
\`\`\`html
<QAffix
  :offset-top="0"
  :target="() => boxRef"
  :on-change="(fixed) => (topFixed = fixed)"
>
  <QButton type="primary">吸顶工具栏</QButton>
</QAffix>
\`\`\`
`,C=b({name:"DisplayLayoutAffix",__name:"Affix",setup(R){const i=l(null),d=l(!1),c=l(!1);return(w,e)=>(o(),g(_,{code:V},{default:s(()=>[t("div",{ref_key:"boxRef",ref:i,class:"affix-box"},[t("div",h,[f(n(x),{"offset-top":0,target:()=>i.value,"on-change":a=>d.value=a},{default:s(()=>[t("div",A,[e[1]||(e[1]=t("span",{class:"affix-bar-title"},"📌 吸顶工具栏",-1)),f(n(p),{type:"primary",size:"small"},{default:s(()=>[...e[0]||(e[0]=[u("新建",-1)])]),_:1}),d.value?(o(),r("span",F,"已固定")):m("",!0)])]),_:1},8,["target","on-change"])]),t("div",D,[(o(),r(y,null,v(10,a=>t("p",{key:a}," 第 "+k(a)+" 段：在该滚动容器内向下滚动，顶部工具栏吸附在容器顶部；向上滚回原位后释放。 ",1)),64))]),f(n(x),{"offset-bottom":12,target:()=>i.value,"on-change":a=>c.value=a},{default:s(()=>[t("div",N,[e[3]||(e[3]=t("span",{class:"affix-bar-title"},"⬆ 吸底操作",-1)),f(n(p),{type:"primary",size:"small"},{default:s(()=>[...e[2]||(e[2]=[u("提交",-1)])]),_:1}),c.value?(o(),r("span",Q,"已固定")):m("",!0)])]),_:1},8,["target","on-change"])],512)]),_:1}))}}),j=B(C,[["__scopeId","data-v-bead09df"]]);export{j as default};

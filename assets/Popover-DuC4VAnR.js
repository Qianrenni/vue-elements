import{D as u}from"./DemoBlock-D_0QWcIO.js";import{d,o as f,g as c,b as o,w as e,u as a,aJ as s,y as p,e as r,a as l,t as m,F as v,h as _,_ as g}from"./index-By5sKUAP.js";const B={class:"pop-actions"},Q={class:"hint"},k='\n```html\n<QPopover title="提示" content="这是一段提示文字">\n  <QButton>悬停显示</QButton>\n</QPopover>\n```\n',P=`
\`\`\`html
<script setup>
const open = ref(false);
<\\/script>
<template>
  <QPopover v-model:open="open" title="操作面板" trigger="click">
    <QButton>点击打开</QButton>
    <template #content>
      <div class="actions">
        <a href="#">编辑</a>
        <a href="#">删除</a>
      </div>
    </template>
  </QPopover>
</template>
\`\`\`
`,x=d({name:"DisplayLayoutPopover",__name:"Popover",setup(y){const n=_(!1);return(C,t)=>(f(),c(v,null,[o(u,{code:k},{default:e(()=>[o(a(s),{title:"悬停提示",content:"鼠标移入卡片停留，可承载更多内容。"},{default:e(()=>[o(a(p),null,{default:e(()=>[...t[2]||(t[2]=[r("悬停显示",-1)])]),_:1})]),_:1}),o(a(s),{title:"四种方向",content:"试试不同位置",placement:"bottomLeft"},{default:e(()=>[o(a(p),null,{default:e(()=>[...t[3]||(t[3]=[r("左下角",-1)])]),_:1})]),_:1})]),_:1}),o(u,{code:P},{default:e(()=>[o(a(s),{open:n.value,"onUpdate:open":t[1]||(t[1]=i=>n.value=i),title:"操作面板",trigger:"click"},{content:e(()=>[l("div",B,[l("a",{href:"#",onClick:t[0]||(t[0]=i=>n.value=!1)},"关闭"),t[5]||(t[5]=l("a",{href:"#"},"查看",-1))])]),default:e(()=>[o(a(p),null,{default:e(()=>[...t[4]||(t[4]=[r("点击打开（可交互）",-1)])]),_:1})]),_:1},8,["open"]),l("span",Q,"状态："+m(n.value?"开":"关"),1)]),_:1})],64))}}),b=g(x,[["__scopeId","data-v-169af909"]]);export{b as default};

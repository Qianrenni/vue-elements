import{D as c}from"./DemoBlock-CabccMzb.js";import{d as s,o as n,c as r,w as i,a as e,t as p,e as _,u,a4 as m,h as l,_ as b}from"./index-U0AIvf-7.js";const f={class:"container-column gap-6 w-400"},h={class:"clicked-label"},k={class:"tree-box"},D=`
\`\`\`html
<template>
  <QTree :data="treeData" @node-click="handleNodeClick" />
</template>

<script setup>
import { ref } from 'vue';
import type { TreeNodeData } from 'qyani-components';

const treeData = ref<TreeNodeData[]>([
  {
    id: '1',
    label: '根节点',
    expanded: true,
    children: [
      { id: '1-1', label: '子节点 1' },
      { id: '1-2', label: '子节点 2' },
    ],
  },
]);

const handleNodeClick = (node) => console.log(node.label);
<\/script>
\`\`\`
`,x=s({name:"DisplayLayoutTree",__name:"Tree",setup(N){const a=l("未选择"),o=l([{id:"1",label:"根节点",expanded:!0,children:[{id:"1-1",label:"子节点 1",expanded:!0,children:[{id:"1-1-1",label:"叶子节点 1"},{id:"1-1-2",label:"叶子节点 2"}]},{id:"1-2",label:"子节点 2"},{id:"1-3",label:"禁用节点",disabled:!0}]}]),d=t=>{a.value=t.label};return(t,v)=>(n(),r(c,{code:D},{default:i(()=>[e("div",f,[e("p",h,"选中节点："+p(a.value),1),e("div",k,[_(u(m),{data:o.value,onNodeClick:d},null,8,["data"])])])]),_:1}))}}),y=b(x,[["__scopeId","data-v-ac8206cd"]]);export{y as default};

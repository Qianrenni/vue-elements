import{D as n}from"./DemoBlock-6OThNZgy.js";import{d as c,o as r,c as i,w as p,a as e,t as _,b as m,u,ar as N,g as l,_ as b}from"./index-3RdcHt7C.js";const f={class:"container-column gap-6 w-400"},h={class:"clicked-label"},k={class:"tree-box"},v=`
\`\`\`html
<template>
  <QTreeNode :node="node" :level="0" @node-click="handleNodeClick" />
</template>

<script setup>
import type { TreeNodeData } from 'qyani-components';

const node: TreeNodeData = {
  id: '1',
  label: '独立节点',
  expanded: true,
  children: [{ id: '1-1', label: '子节点' }],
};
<\/script>
\`\`\`
`,T=c({name:"DisplayLayoutTreeNode",__name:"TreeNode",setup(x){const o=l("未选择"),s=l({id:"1",label:"独立节点",expanded:!0,children:[{id:"1-1",label:"子节点"}]}),d=a=>{o.value=a.label};return(a,t)=>(r(),i(n,{code:v},{default:p(()=>[e("div",f,[e("p",h,"点击节点："+_(o.value),1),e("div",k,[m(u(N),{node:s.value,level:0,onNodeClick:d},null,8,["node"])]),t[0]||(t[0]=e("p",{class:"hint"}," TreeNode 通常由 QTree 自动渲染，也可单独使用以展示单节点。 ",-1))])]),_:1}))}}),C=b(T,[["__scopeId","data-v-0c0084eb"]]);export{C as default};

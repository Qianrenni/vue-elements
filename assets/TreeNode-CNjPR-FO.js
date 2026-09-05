import{D as n}from"./DemoBlock-CXFQJDZo.js";import{d as c,o as r,c as i,w as p,a as e,t as m,b as _,u,aS as N,j as l,f}from"./index-CRccyhqz.js";const b={class:"container-column gap-6 w-400"},h={class:"clicked-label"},k={class:"tree-box"},v=`
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
`,T=c({name:"DisplayLayoutTreeNode",__name:"TreeNode",setup(x){const o=l("未选择"),s=l({id:"1",label:"独立节点",expanded:!0,children:[{id:"1-1",label:"子节点"}]}),d=a=>{o.value=a.label};return(a,t)=>(r(),i(n,{code:v},{default:p(()=>[e("div",b,[e("p",h,"点击节点："+m(o.value),1),e("div",k,[_(u(N),{node:s.value,level:0,onNodeClick:d},null,8,["node"])]),t[0]||(t[0]=e("p",{class:"hint"}," TreeNode 通常由 QTree 自动渲染，也可单独使用以展示单节点。 ",-1))])]),_:1}))}}),B=f(T,[["__scopeId","data-v-0c0084eb"]]);export{B as default};

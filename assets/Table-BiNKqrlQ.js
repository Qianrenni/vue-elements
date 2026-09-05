import{D as l}from"./DemoBlock-A_lV7GyA.js";import{d as h,o as _,h as R,e as a,w as n,u as o,R as s,a as i,t as r,F as C,k as d,_ as T}from"./index-OW0U782s.js";const D={class:"chip"},Q={class:"tip"},B={class:"panel"},K=`
\`\`\`html
<template>
  <QTable :data-source="rows" :columns="columns" row-key="id" />
</template>
<script setup>
const rows = [
  { id: 1, name: '张三', role: '前端', age: 25 },
  { id: 2, name: '李四', role: '后端', age: 30 },
  { id: 3, name: '王五', role: '设计', age: 22 },
];
const columns = [
  { key: 'id', title: 'ID', dataIndex: 'id', width: 70 },
  { key: 'name', title: '姓名', dataIndex: 'name' },
  { key: 'role', title: '角色', dataIndex: 'role', align: 'center' },
  { key: 'age', title: '年龄', dataIndex: 'age', align: 'right' },
];
<\\/script>
\`\`\`
`,S=`
\`\`\`html
<template>
  <QTable
    :data-source="rows"
    :columns="columns"
    row-key="id"
    :pagination="{ pageSize: 4, showTotal: true }"
  />
</template>
<script setup>
const columns = [
  { key: 'name', title: '姓名', dataIndex: 'name' },
  {
    key: 'dept', title: '部门', dataIndex: 'dept',
    filters: [{ text: '研发', value: '研发' }, { text: '市场', value: '市场' }],
  },
  { key: 'age', title: '年龄', dataIndex: 'age', sorter: true, align: 'right' },
];
const rows = [
  { id: 1, name: '张三', dept: '研发', age: 25 },
  { id: 2, name: '李四', dept: '市场', age: 30 },
  // ...
];
<\\/script>
\`\`\`
`,U=`
\`\`\`html
<template>
  <QTable
    v-model:selected-row-keys="keys"
    :data-source="rows"
    :columns="columns"
    row-key="id"
    :row-selection="{
      type: 'checkbox',
      getCheckboxProps: (r) => (r.id === 3 ? { disabled: true } : undefined),
    }"
  />
</template>
<script setup>
const keys = ref([]);
const rows = [
  { id: 1, name: '张三', status: '在线' },
  { id: 2, name: '李四', status: '离线' },
  { id: 3, name: '王五', status: '忙碌' },
];
<\\/script>
\`\`\`
`,z=`
\`\`\`html
<template>
  <!-- 树形：行含 children 自动出现展开列 -->
  <QTable row-key="id" :data-source="tree" :columns="cols"
    v-model:expanded-row-keys="keys" />
  <!-- 行级渲染：配合 #expandedRowRender 插槽 -->
  <QTable row-key="id" :data-source="rows" :columns="cols" :expandable="{}">
    <template #expandedRowRender="{ record }">
      项目详情：{{ record.name }} / {{ record.owner }}
    </template>
  </QTable>
</template>
\`\`\`
`,F=h({name:"DisplayTable",__name:"Table",setup(N){const p=[{key:"id",title:"ID",dataIndex:"id",width:70},{key:"name",title:"姓名",dataIndex:"name"},{key:"role",title:"角色",dataIndex:"role",align:"center"},{key:"age",title:"年龄",dataIndex:"age",align:"right"}],w=d([{id:1,name:"张三",role:"前端",age:25},{id:2,name:"李四",role:"后端",age:30},{id:3,name:"王五",role:"设计",age:22}]),y=[{key:"name",title:"姓名",dataIndex:"name"},{key:"dept",title:"部门",dataIndex:"dept",filters:[{text:"研发",value:"研发"},{text:"市场",value:"市场"}]},{key:"age",title:"年龄",dataIndex:"age",sorter:!0,align:"right"}],k=d([{id:1,name:"张三",dept:"研发",age:25},{id:2,name:"李四",dept:"市场",age:30},{id:3,name:"王五",dept:"研发",age:22},{id:4,name:"赵六",dept:"市场",age:35},{id:5,name:"钱七",dept:"研发",age:28},{id:6,name:"孙八",dept:"市场",age:41}]),x=[{key:"id",title:"ID",dataIndex:"id",width:70},{key:"name",title:"姓名",dataIndex:"name"},{key:"status",title:"状态",dataIndex:"status",align:"center"}],g=d([{id:1,name:"张三",status:"在线"},{id:2,name:"李四",status:"离线"},{id:3,name:"王五",status:"忙碌"}]),c=d([1]),I=[{key:"name",title:"名称",dataIndex:"name"},{key:"count",title:"人数",dataIndex:"count",width:120}],b=d([{id:1,name:"产品中心",count:12,children:[{id:11,name:"需求组",count:5},{id:12,name:"设计组",count:7}]},{id:2,name:"研发中心",count:36}]),m=d([1]),f=[{key:"name",title:"项目",dataIndex:"name"},{key:"owner",title:"负责人",dataIndex:"owner"}],v=d([{id:1,name:"官网改版",owner:"张三"},{id:2,name:"组件库建设",owner:"李四"}]),u=d([]);return(P,t)=>(_(),R(C,null,[a(l,{code:K},{default:n(()=>[a(o(s),{columns:p,"data-source":w.value,"row-key":"id",pagination:!1},{role:n(({record:e})=>[i("span",D,r(e.role),1)]),_:1},8,["data-source"])]),_:1}),a(l,{code:S},{default:n(()=>[a(o(s),{columns:y,"data-source":k.value,"row-key":"id",pagination:{pageSize:4,showTotal:!0}},null,8,["data-source"]),t[3]||(t[3]=i("p",{class:"tip"}," 点「年龄」列头箭头排序；点「部门」漏斗筛选；右下分页 + 每页条数。 ",-1))]),_:1}),a(l,{code:U},{default:n(()=>[a(o(s),{"selected-row-keys":c.value,"onUpdate:selectedRowKeys":t[0]||(t[0]=e=>c.value=e),columns:x,"data-source":g.value,"row-key":"id","row-selection":{type:"checkbox",getCheckboxProps:e=>e.id===3?{disabled:!0}:void 0}},null,8,["selected-row-keys","data-source","row-selection"]),i("p",Q,"选中 key："+r(c.value.join(", "))+"（王五已禁用）",1)]),_:1}),a(l,{code:z},{default:n(()=>[a(o(s),{"expanded-row-keys":m.value,"onUpdate:expandedRowKeys":t[1]||(t[1]=e=>m.value=e),columns:I,"data-source":b.value,"row-key":"id",pagination:!1},null,8,["expanded-row-keys","data-source"]),a(o(s),{"expanded-row-keys":u.value,"onUpdate:expandedRowKeys":t[2]||(t[2]=e=>u.value=e),columns:f,"data-source":v.value,"row-key":"id",expandable:{expandRowByClick:!0},pagination:!1},{expandedRowRender:n(({record:e})=>[i("div",B," 项目详情："+r(e.name)+"，负责人 "+r(e.owner)+"，点整行可折叠。 ",1)]),_:1},8,["expanded-row-keys","data-source"])]),_:1})],64))}}),E=T(F,[["__scopeId","data-v-a2ac03bf"]]);export{E as default};

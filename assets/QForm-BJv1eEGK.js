import{d as Q,o as c,c as _,w as a,a as r,b as l,u as o,ae as B,af as n,z as d,D as p,q as f,e as x,i as w,t as k,K as N,ag as h,j as g}from"./index-Calvsw3q.js";import{D as I}from"./DemoBlock-DMksGsUm.js";const V={class:"container-column",style:{"max-width":"480px"}},q={style:{display:"flex",gap:"8px"}},D={key:0,style:{margin:"8px 0 0","font-size":"13px"}},R=`
\`\`\`html
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { QForm, QFormItem, QFormButton, type QFormExpose } from 'qyani-components';

const model = reactive({ name: '', age: 20, email: '' });
const rules = {
  name: [{ required: true, message: '请输入姓名' }, { min: 2, message: '姓名至少 2 个字符' }],
  age: [{ required: true, message: '请输入年龄' }, { min: 18, max: 60, message: '年龄需在 18-60 之间' }],
  email: [{ validator: (_v, m) => (m.email.includes('@') ? true : '邮箱需包含 @') }],
};
const formRef = ref<QFormExpose | null>(null);
<\/script>

<template>
  <QForm ref="formRef" :model="model" :rules="rules" label-width="80px"
    @finish="(v) => alert('提交成功' + JSON.stringify(v))"
    @finish-failed="(_v, e) => alert('校验失败' + JSON.stringify(e))">
    <QFormItem name="name" label="姓名">
      <input v-model="model.name" style="border: 1px solid #ccc; padding: 4px 8px" />
    </QFormItem>
    <QFormItem name="age" label="年龄">
      <input type="number" v-model.number="model.age" style="border: 1px solid #ccc; padding: 4px 8px" />
    </QFormItem>
    <QFormItem name="email" label="邮箱">
      <input v-model="model.email" style="border: 1px solid #ccc; padding: 4px 8px" />
    </QFormItem>
    <div style="display: flex; gap: 8px">
      <QFormButton type="submit">提交</QFormButton>
      <QFormButton type="reset" @click="() => {}">重置</QFormButton>
    </div>
  </QForm>
</template>
\`\`\`
`,O=Q({name:"DisplayFormQForm",__name:"QForm",setup(S){const t=h({name:"",age:20,email:""}),y={name:[{required:!0,message:"请输入姓名"},{min:2,message:"姓名至少 2 个字符"}],age:[{required:!0,message:"请输入年龄"},{min:18,max:60,message:"年龄需在 18-60 之间"}],email:[{validator:(i,e)=>typeof e.email=="string"&&e.email.includes("@")?!0:"邮箱需包含 @"}]},u=g(null),m=g(""),v=i=>{m.value=`提交成功: ${JSON.stringify(i)}`},F=(i,e)=>{m.value=`校验失败: ${JSON.stringify(e)}`},b=()=>{m.value="",u.value?.resetFields()};return(i,e)=>(c(),_(I,{code:R},{default:a(()=>[r("div",V,[l(o(B),{ref_key:"formRef",ref:u,model:t,rules:y,"label-width":"80px",onFinish:v,onFinishFailed:F},{default:a(()=>[l(o(n),{name:"name",label:"姓名"},{default:a(()=>[d(r("input",{"onUpdate:modelValue":e[0]||(e[0]=s=>t.name=s),style:{border:"1px solid #ccc",padding:"4px 8px",width:"100%"}},null,512),[[p,t.name]])]),_:1}),l(o(n),{name:"age",label:"年龄"},{default:a(()=>[d(r("input",{"onUpdate:modelValue":e[1]||(e[1]=s=>t.age=s),type:"number",style:{border:"1px solid #ccc",padding:"4px 8px",width:"100%"}},null,512),[[p,t.age,void 0,{number:!0}]])]),_:1}),l(o(n),{name:"email",label:"邮箱"},{default:a(()=>[d(r("input",{"onUpdate:modelValue":e[2]||(e[2]=s=>t.email=s),style:{border:"1px solid #ccc",padding:"4px 8px",width:"100%"}},null,512),[[p,t.email]])]),_:1}),r("div",q,[l(o(f),{type:"submit"},{default:a(()=>[...e[3]||(e[3]=[x("提交",-1)])]),_:1}),l(o(f),{onClick:b},{default:a(()=>[...e[4]||(e[4]=[x("重置",-1)])]),_:1})])]),_:1},8,["model"]),m.value?(c(),w("p",D,k(m.value),1)):N("",!0)])]),_:1}))}});export{O as default};

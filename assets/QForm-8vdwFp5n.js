import{D as Q}from"./DemoBlock-D3lRM5dy.js";import{d as b,o as u,c as _,w as m,a as p,b as a,u as l,a6 as V,a7 as n,a5 as i,T as f,e as c,f as B,t as k,K as N,a8 as I,g}from"./index-BM7kyQMa.js";const h={class:"container-column",style:{"max-width":"480px"}},q={style:{display:"flex",gap:"8px"}},w={key:0,style:{margin:"8px 0 0","font-size":"13px"}},R=`
\`\`\`html
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { QButton, QForm, QFormItem, type QFormExpose } from 'qyani-components';

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
      <QButton html-type="submit">提交</QButton>
      <QButton html-type="reset" @click="() => {}">重置</QButton>
    </div>
  </QForm>
</template>
\`\`\`
`,J=b({name:"DisplayFormQForm",__name:"QForm",setup(S){const t=I({name:"",age:20,email:""}),x={name:[{required:!0,message:"请输入姓名"},{min:2,message:"姓名至少 2 个字符"}],age:[{required:!0,message:"请输入年龄"},{min:18,max:60,message:"年龄需在 18-60 之间"}],email:[{validator:(r,e)=>typeof e.email=="string"&&e.email.includes("@")?!0:"邮箱需包含 @"}]},d=g(null),o=g(""),y=r=>{o.value=`提交成功: ${JSON.stringify(r)}`},v=(r,e)=>{o.value=`校验失败: ${JSON.stringify(e)}`},F=()=>{o.value="",d.value?.resetFields()};return(r,e)=>(u(),_(Q,{code:R},{default:m(()=>[p("div",h,[a(l(V),{ref_key:"formRef",ref:d,model:t,rules:x,"label-width":"80px",onFinish:y,onFinishFailed:v},{default:m(()=>[a(l(n),{name:"name",label:"姓名"},{default:m(()=>[a(l(i),{modelValue:t.name,"onUpdate:modelValue":e[0]||(e[0]=s=>t.name=s)},null,8,["modelValue"])]),_:1}),a(l(n),{name:"age",label:"年龄"},{default:m(()=>[a(l(i),{modelValue:t.age,"onUpdate:modelValue":e[1]||(e[1]=s=>t.age=s),modelModifiers:{number:!0},type:"number"},null,8,["modelValue"])]),_:1}),a(l(n),{name:"email",label:"邮箱"},{default:m(()=>[a(l(i),{modelValue:t.email,"onUpdate:modelValue":e[2]||(e[2]=s=>t.email=s)},null,8,["modelValue"])]),_:1}),p("div",q,[a(l(f),{"html-type":"submit"},{default:m(()=>[...e[3]||(e[3]=[c("提交",-1)])]),_:1}),a(l(f),{onClick:F},{default:m(()=>[...e[4]||(e[4]=[c("重置",-1)])]),_:1})])]),_:1},8,["model"]),o.value?(u(),B("p",w,k(o.value),1)):N("",!0)])]),_:1}))}});export{J as default};

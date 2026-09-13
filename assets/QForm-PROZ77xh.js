import{d as Q,o as c,c as _,w as a,a as i,b as l,u as m,ad as h,ae as n,y as d,z as p,e as f,f as x,h as B,t as w,D as k,af as N,i as g}from"./index-D9J2GR8y.js";import{D as I}from"./DemoBlock-CA-OtkyE.js";const V={class:"container-column",style:{"max-width":"480px"}},D={style:{display:"flex",gap:"8px"}},q={key:0,style:{margin:"8px 0 0","font-size":"13px"}},R=`
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
`,O=Q({name:"DisplayFormQForm",__name:"QForm",setup(S){const t=N({name:"",age:20,email:""}),y={name:[{required:!0,message:"请输入姓名"},{min:2,message:"姓名至少 2 个字符"}],age:[{required:!0,message:"请输入年龄"},{min:18,max:60,message:"年龄需在 18-60 之间"}],email:[{validator:(r,e)=>typeof e.email=="string"&&e.email.includes("@")?!0:"邮箱需包含 @"}]},u=g(null),o=g(""),v=r=>{o.value=`提交成功: ${JSON.stringify(r)}`},b=(r,e)=>{o.value=`校验失败: ${JSON.stringify(e)}`},F=()=>{o.value="",u.value?.resetFields()};return(r,e)=>(c(),_(I,{code:R},{default:a(()=>[i("div",V,[l(m(h),{ref_key:"formRef",ref:u,model:t,rules:y,"label-width":"80px",onFinish:v,onFinishFailed:b},{default:a(()=>[l(m(n),{name:"name",label:"姓名"},{default:a(()=>[d(i("input",{"onUpdate:modelValue":e[0]||(e[0]=s=>t.name=s),style:{border:"1px solid #ccc",padding:"4px 8px",width:"100%"}},null,512),[[p,t.name]])]),_:1}),l(m(n),{name:"age",label:"年龄"},{default:a(()=>[d(i("input",{"onUpdate:modelValue":e[1]||(e[1]=s=>t.age=s),type:"number",style:{border:"1px solid #ccc",padding:"4px 8px",width:"100%"}},null,512),[[p,t.age,void 0,{number:!0}]])]),_:1}),l(m(n),{name:"email",label:"邮箱"},{default:a(()=>[d(i("input",{"onUpdate:modelValue":e[2]||(e[2]=s=>t.email=s),style:{border:"1px solid #ccc",padding:"4px 8px",width:"100%"}},null,512),[[p,t.email]])]),_:1}),i("div",D,[l(m(f),{"html-type":"submit"},{default:a(()=>[...e[3]||(e[3]=[x("提交",-1)])]),_:1}),l(m(f),{onClick:F},{default:a(()=>[...e[4]||(e[4]=[x("重置",-1)])]),_:1})])]),_:1},8,["model"]),o.value?(c(),B("p",q,w(o.value),1)):k("",!0)])]),_:1}))}});export{O as default};

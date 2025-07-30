<!-- views/FormDemo.vue -->
<template>
  <FormContainer
      description="基于 Vue 3 封装的可复用表单组件"
      title="Vue 表单组件库演示"
      @submit="handleSubmit"
  >

    <fieldset>
      <legend>1. 文本输入类</legend>
      <FormText v-model="form.text" label="文本输入" name="text" placeholder="请输入文本"/>
      <FormText v-model="form.password" label="密码输入" name="password" placeholder="请输入密码" type="password"/>
      <FormText v-model="form.email" label="邮箱输入" name="email" placeholder="example@example.com" required
                type="email"/>
      <FormText v-model="form.tel" label="电话号码" name="tel" pattern="[0-9\\-]+" placeholder="138-0000-0000"
                type="tel"/>
      <FormRangeSlider v-model="form.range" :max="10" :min="0" label="滑块输入" name="range"/>
    </fieldset>

    <fieldset>
      <legend>2. 选择控件</legend>
      <FormSelect
          v-model="form.select"
          :options="[
          { value: 'option1', label: '选项 1' },
          { value: 'option2', label: '选项 2' },
          { value: 'option3', label: '选项 3' }
        ]"
          label="下拉选择"
          name="select"
          placeholder="请选择"
      />
      <FormRadioGroup
          v-model="form.gender"
          :options="[
          { value: 'male', label: '男' },
          { value: 'female', label: '女' },
          { value: 'other', label: '其他' }
        ]"
          label="单选按钮"
          name="gender"
          required
      />
      <FormCheckboxGroup
          v-model="form.hobby"
          :options="[
          { value: 'reading', label: '阅读' },
          { value: 'sports', label: '运动' },
          { value: 'music', label: '音乐' }
        ]"
          label="复选框"
      />
    </fieldset>

    <fieldset>
      <legend>6. 按钮控件</legend>
      <FormButton backgroundColor="#007BFF" type="submit">提交</FormButton>
      <FormButton backgroundColor="#6c757d" type="button" @click="handleReset">重置</FormButton>
    </fieldset>

  </FormContainer>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import FormContainer from '@/components/form/FormContainer.vue';
import FormText from '@/components/form/FormText.vue';
import FormSelect from '@/components/form/FormSelect.vue';
import FormRadioGroup from '@/components/form/FormRadioGroup.vue';
import FormCheckboxGroup from '@/components/form/FormCheckboxGroup.vue';
import FormRangeSlider from '@/components/form/FormRangeSlider.vue';
import FormButton from '@/components/form/FormButton.vue';

const form = ref({
  text: '',
  password: '',
  email: '',
  tel: '',
  range: 5,
  select: '',
  gender: '',
  hobby: [],
});

const handleSubmit = () => {
  alert('提交数据：\n' + JSON.stringify(form.value, null, 2));
};

const handleReset = () => {
  form.value = {
    text: '',
    password: '',
    email: '',
    tel: '',
    range: 5,
    select: '',
    gender: '',
    hobby: [],
  };
};
</script>

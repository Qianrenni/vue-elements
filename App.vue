<template>
  <div>
    <!-- <QFormSelect
      v-model="form.select"
      :options="[
        { value: 'option1', label: '选项 1' },
        { value: 'option2', label: '选项 2' },
        { value: 'option3', label: '选项 3' },
        { value: 'option4', label: '选项 4' },
        { value: 'option5', label: '选项 5' },
        { value: 'option6', label: '选项 6' },
      ]"
      label="下拉选择框"
      name="select"
      placeholder="请选择"
      searchable
    />
    <p>{{ form.select }}</p>
    <QFormText
      v-model="form.text"
      label="输入框"
      name="text"
      placeholder="请输入内容"
    />
    <QFormTextarea
      v-model="form.text"
      label="文本域"
      name="textarea"
      placeholder="请输入内容"
    /> -->
    <QSearch
      label="搜索框"
      name="search"
      placeholder="请输入内容"
      @search="(value)=>console.log(value)"
    />
  </div>
</template>
<script setup lang="ts">
import { QFormSelect, QFormText, QFormTextarea,QSearch } from '@/index';
import { ref } from 'vue';
const form = ref({
  select: 'option5',
  text: '',
});
</script>

<!-- views/FormDemo.vue -->
<template>
  <FormContainer
      class="
      container-column
      container-align-center
      margin-vetical"
      @submit="handleSubmit"
  >
    <!-- 1. 文本输入类 -->
    <div
        class="
        gap
        container-column"
    >
      <fieldset
          class="
        container-column
        gap"
          style="
        width: 800px;"
      >
        <legend>1.文本控件</legend>
        <FormText
            v-model="form.text"
            direction="vertical"
            disabled
            label="文本输入"
            name="text"
            placeholder="请输入文本"
            type="text"
        />
        <FormText
            v-model="form.password"
            direction="vertical"
            label="密码输入"
            name="password"
            placeholder="请输入密码"
            size="large"
            type="password"
        />
        <FormText
            v-model="form.email"
            label="邮箱输入"
            name="email"
            placeholder="example@example.com"
            size="small"
            type="email"
        />
        <FormText
            v-model="form.tel"
            direction="vertical"
            label="电话号码"
            name="tel"
            pattern="[0-9]+"
            placeholder="138-0000-0000"
            type="tel"
        />
        <!-- Datalist 自动补全 -->
        <FormDatalist
            v-model="form.browser"
            :options="['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera']"
            direction="vertical"
            label="选择浏览器" name="browser"
            placeholder="输入或选择浏览器"
        />

        <FormRangeSlider
            v-model="form.range"
            :max="100"
            :min="0"

            direction="vertical"
            label="滑块输入"
            name="range"
        />
      </fieldset>

      <!-- 2. 选择控件 -->
      <fieldset>
        <legend>2. 选择控件</legend>
        <FormSelect
            v-model="form.select"
            :options="[
          { value: 'option1', label: '选项 1' },
          { value: 'option2', label: '选项 2' },
          { value: 'option3', label: '选项 3' },
          { value: 'option4', label: '选项 4' },
          { value: 'option5', label: '选项 5' },
          { value: 'option6', label: '选项 6' },
          { value: 'option7', label: '选项 7' },
          { value: 'option7', label: '选项 7' },
          { value: 'option7', label: '选项 7' },
          { value: 'option7', label: '选项 7' },
          { value: 'option7', label: '选项 7' },
        ]"
            class="container-column"
            label="下拉选择"
            multiple
            name="select"
            placeholder="请选择"
            searchable
        />
        <FormRadioGroup
            v-model="form.gender"
            :options="[
          { value: 'male', label: '男' },
          { value: 'female', label: '女' },
          { value: 'other', label: '其他' }
        ]"
            direction="vertical"
            label="单选按钮 :"
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

      <!-- 3. 日期与文件 -->
      <fieldset>
        <legend
        >
          3. 日期与文件
        </legend>
        <FormDatePicker
            v-model="form.date"
            direction="vertical"
            label="日期"
            name="date"
            type="date"
        />
        <FormDatePicker
            v-model="form.time"
            label="时间"
            name="time"
            type="time"
        />
        <FormDatePicker
            v-model="form.datetime"
            label="日期时间"
            name="datetime"
            type="datetime-local"
        />

        <FormColorPicker
            v-model="form.color"
            label="主题颜色"
            name="color"
            size="large"
        />

        <FormFileUpload
            v-model="form.file"
            accept="image/*,.pdf"
            label="上传文件"
            name="file"
        />
        <FormFileUpload
            v-model="form.files"
            accept="*"
            direction="vertical"
            label="多文件上传"
            multiple
            name="files"
        />

        <FormTextarea
            v-model="form.desc"
            :rows="4"
            disabled
            label="描述"
            name="desc"
            placeholder="请输入详情..."
        />
      </fieldset>

      <!-- 6. 按钮控件 -->
      <fieldset>
        <legend
        >
          4.按钮控件
        </legend>
        <FormButton
            type="submit"
        >
          提交
        </FormButton>
        <FormButton
            type="reset"
            @click="handleReset"
        >
          重置
        </FormButton>
      </fieldset>
      <fieldset>
        <FormTable
            :columns="columns"
            :data="tableData"
            selectable
            selection-mode="multiple"
        />

      </fieldset>
    </div>
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
import FormDatalist from '@/components/form/FormDatalist.vue';
// 导入新添加的四个组件
import FormDatePicker from '@/components/form/FormDatePicker.vue';
import FormColorPicker from '@/components/form/FormColorPicker.vue';
import FormFileUpload from '@/components/form/FormFileUpload.vue';
import FormTextarea from '@/components/form/FormTextarea.vue';
import FormTable from "@/components/form/FormTable.vue";

const columns = [
  {value: "name", label: "姓名", width: "120px"},
  {value: "age", label: "年龄", width: "80px"},
  {value: "email", label: "邮箱"},
];

const tableData = [
  {id: 1, name: "张三", age: 24, email: "zhang@example.com"},
  {id: 2, name: "李四", age: 28, email: "li@example.com"},
];

const selectedRows = ref([]);
// 扩展 form 数据模型，包含所有新字段
const form = ref({
  text: '',
  password: '',
  email: '',
  tel: '',
  browser: '',
  range: 5,
  select: [],
  gender: '',
  hobby: [],
  // 新增字段
  date: '',
  time: '',
  datetime: '',
  color: '#007BFF',
  file: null as File | null,
  files: null as FileList | null,
  desc: '',
});

const handleSubmit = () => {
  // 将 File 和 FileList 转为可序列化的信息
  const formData = {
    ...form.value,
    file: form.value.file ? form.value.file.name : null,
    files: form.value.files ? Array.from(form.value.files).map(f => f.name) : []
  };
  alert('提交数据：\n' + JSON.stringify(formData, null, 2));
};

const handleReset = () => {
  form.value = {
    text: '',
    password: '',
    email: '',
    tel: '',
    browser: '',
    range: 5,
    select: [],
    gender: '',
    hobby: [],
    date: '',
    time: '',
    datetime: '',
    color: '#007BFF',
    file: null,
    files: null,
    desc: '',
  };
};
</script>
<style lang="css">
fieldset {
  border: none;
}
</style>

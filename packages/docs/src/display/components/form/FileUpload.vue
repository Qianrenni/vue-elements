<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QFileUpload, type UploadFile } from 'qyani-components';
import { ref } from 'vue';

defineOptions({
  name: 'DisplayFormFileUpload',
});

const singleList = ref<UploadFile[]>([]);
const multipleList = ref<UploadFile[]>([]);
const dragList = ref<UploadFile[]>([]);
const disabledList = ref<UploadFile[]>([]);

const removedName = ref('');

/** 上传前校验：限制 2MB 以内 */
const beforeUpload = (file: File) => file.size <= 2 * 1024 * 1024;

const onRemove = (file: UploadFile) => {
  removedName.value = file.name;
};

const code = `
\`\`\`html
<script setup lang="ts">
import { QFileUpload, type UploadFile } from 'qyani-components';
import { ref } from 'vue';

const singleList = ref<UploadFile[]>([]);
const multipleList = ref<UploadFile[]>([]);
const dragList = ref<UploadFile[]>([]);
const disabledList = ref<UploadFile[]>([]);

/** 上传前校验：限制 2MB 以内 */
const beforeUpload = (file: File) => file.size <= 2 * 1024 * 1024;
<\/script>

<template>
  <!-- 单选（文本列表） -->
  <QFileUpload v-model:file-list="singleList" accept="image/*" />

  <!-- 多选 + 数量限制 -->
  <QFileUpload v-model:file-list="multipleList" multiple :max-count="3" accept="image/*" />

  <!-- 拖拽区域 + 缩略图列表 -->
  <QFileUpload v-model:file-list="dragList" drag list-type="picture" multiple />

  <!-- 上传前校验 -->
  <QFileUpload v-model:file-list="multipleList" :before-upload="beforeUpload" @remove="(file) => console.log('移除', file.name)" />

  <!-- 禁用 -->
  <QFileUpload v-model:file-list="disabledList" disabled />
</template>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column">
      <div class="container flex-wrap">
        <div class="item">
          <p class="item-label">单选（文本列表）</p>
          <QFileUpload v-model:file-list="singleList" accept="image/*" />
        </div>
        <div class="item">
          <p class="item-label">多选 + 最多 3 个</p>
          <QFileUpload
            v-model:file-list="multipleList"
            multiple
            :max-count="3"
            accept="image/*"
          />
        </div>
        <div class="item">
          <p class="item-label">拖拽 + 缩略图列表</p>
          <QFileUpload
            v-model:file-list="dragList"
            drag
            list-type="picture"
            multiple
          />
        </div>
        <div class="item">
          <p class="item-label">上传前校验（≤ 2MB，可移除）</p>
          <QFileUpload
            v-model:file-list="multipleList"
            :before-upload="beforeUpload"
            @remove="onRemove"
          />
        </div>
        <div class="item">
          <p class="item-label">禁用</p>
          <QFileUpload v-model:file-list="disabledList" disabled />
        </div>
      </div>
      <p class="tip">
        已选：单选 {{ singleList.length }} 个 / 多选
        {{ multipleList.length }} 个 / 拖拽 {{ dragList.length }} 个
        <span v-if="removedName">（最近移除：{{ removedName }}）</span>
      </p>
    </div>
  </DemoBlock>
</template>

<style scoped>
.item {
  width: 280px;
  max-width: 100%;
}
.item-label {
  margin: 0 0 8px;
  font-size: 12px;
  color: var(--q-color-text-muted);
}
.tip {
  margin: 0;
  font-size: 12px;
  color: var(--q-color-text-secondary);
}
</style>

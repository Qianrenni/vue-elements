import os
import re
from pathlib import Path
dir_path = Path(__file__).parent.parent / 'src' / 'display'
out_path = Path(__file__).parent.parent/'src'/'docs'/'ComponentDetail.vue'
result = []
install_list = []
components = []
pattern = re.compile(r'[/\\]src(.*)[/\\](.*)\.vue')
for root, dirs, files in os.walk(dir_path):
    for file in files:
        if 'index' in file:
            continue
        if file.endswith('.vue'):
            file_name = os.path.splitext(file)[0]
            import_dir = pattern.search(os.path.join(root, file)).group(1).replace('\\', '/')
            result.append(f"import {file_name} from '..{import_dir}/{file}'")
            install_list.append(f"app.component('Q{file_name}',Q{file_name})")
            components.append(f"'{file_name}':{file_name}")
prefix="""
<!-- src/docs/ComponentDetail.vue -->
<script lang="ts" setup>
import {ref, watch} from 'vue'
import {QMarkdownRender, QTab} from "qyani-components";
import type {ComponentInfo} from "@/utils/useComponentInfo.ts";
"""
prefix+='\n'.join(result)
prefix+=f"""
const componentMap ={{
\t{',\n\t'.join(components)}
}}
"""
prefix+="""
defineOptions({
  name: 'ComponentDetail'
})
const props = defineProps<{
  component: ComponentInfo | null
}>()
const currentTabIndex = ref<number>(0);
const currentCotent = ref('')
watch(
    () => props.component,
    async (newComponent: ComponentInfo | null) => {
        if (newComponent) {
            currentCotent.value = await (await fetch(newComponent.docPath)).text();
        }
    }
)
</script>

<template>
  <div v-if="!component" class="placeholder bg-card component-detail">
    请选择一个组件
  </div>

  <div v-else class=" bg-card component-detail container-column scroll-container scroll-y">
    <div class="container-column padding-rem container-flex-1">
      <!-- 右侧标题 -->
      <h2 class="text-primary text-center padding-half-rem margin-half-vetical border-horizontal-gray">
        {{ component.displayName }} 组件
      </h2>
      <QTab :list="['文档说明', '组件展示']" @select="(index:number)=>currentTabIndex=index"/>
      <!-- 组件展示区 -->
      <div v-show="currentTabIndex===0" class="component-display padding-rem radius-half-rem shadow-black">
        <!-- Markdown 文档 -->
        <QMarkdownRender :content="currentCotent"/>
      </div>
      <component :is="componentMap[props.component?.name as keyof typeof componentMap]" v-show="currentTabIndex===1"/>
    </div>
  </div>
</template>

<style scoped>
.component-detail {
  flex: 1;
  overflow-y: auto;
  height: calc(100vh - 32px);
}

.component-display {
  transition: all 0.5s ease;
}


.placeholder {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
  font-size: 1.2em;
}

/* 添加进入和离开动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
"""
with open(out_path, 'w', encoding='utf-8') as f:
    f.write( prefix)
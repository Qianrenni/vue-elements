<template>
  <div class="container-flex-start container-wrap">
    <div
      v-for="(svgContent, name) in svgMap"
      :key="name"
      class="margin-rem container-column container-align-center"
    >
      <div style="cursor: pointer" v-html="svgContent" />
      <div>{{ name }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  size: {
    type: String,
    default: "32",
  },
});

// 获取所有.svg文件
const svgFiles = import.meta.glob("../../icons/*.svg");
const svgMap = ref<Record<string, string>>({});

// 动态加载所有.svg文件
const loadSvgs = async () => {
  for (const path in svgFiles) {
    try {
      const name = path.split("/").pop()?.replace(".svg", "") || "";
      const module = await import(path + "?raw");

      svgMap.value[name] = module.default.replace(
        "<svg",
        `<svg width="${props.size}" height="${props.size}"`,
      );
    } catch (error) {
      console.error(`Failed to load SVG: ${path}`, error);
    }
  }
};

onMounted(() => {
  loadSvgs();
});

defineOptions({
  name: "IconGroups",
});
</script>

<style scoped></style>

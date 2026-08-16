<script lang="ts" setup>
/**
 * 设计变量 (Tokens) 可视化展示
 * 从文档根节点实时读取 --q-* 变量值，随主题（亮/暗）联动刷新。
 */
defineOptions({ name: 'StylesTokens' });

/** 读取 body 上 CSS 变量的声明值（body.dark-mode 覆盖会在此生效） */
const cssVar = (name: string): string =>
  getComputedStyle(document.body).getPropertyValue(name).trim();

/** 原始调色板（按 family × shade 生成，过滤不存在的档位） */
const familyLabels: Record<string, string> = {
  gray: '灰色',
  yellow: '黄色',
  red: '红色',
  green: '绿色',
  blue: '蓝色',
  orange: '橙色',
};
const paletteFamilies = ['gray', 'yellow', 'red', 'green', 'blue', 'orange'];
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const palette = paletteFamilies.map((family) => ({
  family,
  label: familyLabels[family],
  swatches: shades
    .map((shade) => ({
      name: `--q-color-${family}-${shade}`,
      value: cssVar(`--q-color-${family}-${shade}`),
    }))
    .filter((s) => s.value),
}));

/** 语义化颜色 */
const semantic = [
  '--q-color-primary',
  '--q-color-primary-hover',
  '--q-color-primary-active',
  '--q-color-primary-light',
  '--q-color-primary-lighter',
  '--q-color-success',
  '--q-color-success-bg',
  '--q-color-warning-bg',
  '--q-color-danger-bg',
  '--q-color-info-bg',
  '--q-color-text',
  '--q-color-text-description',
  '--q-color-text-muted',
  '--q-color-text-secondary',
  '--q-color-bg',
  '--q-color-bg-secondary',
  '--q-color-bg-card',
  '--q-color-border',
  '--q-color-border-light',
  '--q-color-link',
  '--q-color-tag',
].map((name) => ({ name, value: cssVar(name) }));

/** 间距阶梯 */
const spacing = Array.from({ length: 13 }, (_, i) => ({
  name: `--q-space-${i}`,
  value: cssVar(`--q-space-${i}`),
}));

/** 圆角 */
const radius = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'].map(
  (size) => ({
    name: `--q-radius-${size}`,
    value: cssVar(`--q-radius-${size}`),
  }),
);

/** 阴影 */
const shadows = ['none', 'xs', 'sm', 'md', 'lg', 'xl'].map((level) => ({
  name: `--q-shadow-${level}`,
  value: cssVar(`--q-shadow-${level}`),
}));

/** 透明度 */
const opacity = Array.from({ length: 11 }, (_, i) => i * 10).map((n) => ({
  name: `--q-opacity-${n}`,
  value: cssVar(`--q-opacity-${n}`),
}));

/** 字号 / 字重 */
const fontSizes = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'].map(
  (size) => ({
    name: `--q-font-size-${size}`,
    value: cssVar(`--q-font-size-${size}`),
  }),
);
const weights = ['light', 'normal', 'medium', 'semibold', 'bold'].map((w) => ({
  name: `--q-font-weight-${w}`,
  value: cssVar(`--q-font-weight-${w}`),
}));

/** 动效时长 */
const durations = ['instant', 'fast', 'normal', 'slow', 'slower'].map((d) => ({
  name: `--q-duration-${d}`,
  value: cssVar(`--q-duration-${d}`),
}));
</script>

<template>
  <div class="tokens-demo container-column">
    <!-- 原始调色板 -->
    <section>
      <h3 class="section-title">原始调色板（不随主题变化）</h3>
      <div v-for="group in palette" :key="group.family" class="palette-group">
        <div class="palette-family">{{ group.label }}</div>
        <div class="palette-grid">
          <div
            v-for="swatch in group.swatches"
            :key="swatch.name"
            class="swatch"
          >
            <div
              class="swatch-color"
              :style="{ backgroundColor: `var(${swatch.name})` }"
            />
            <div class="swatch-name">{{ swatch.name }}</div>
            <div class="swatch-value">{{ swatch.value }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 语义化颜色 -->
    <section>
      <h3 class="section-title">语义化颜色（随主题切换）</h3>
      <div class="palette-grid">
        <div v-for="s in semantic" :key="s.name" class="swatch">
          <div
            class="swatch-color swatch-color-lg"
            :style="{ backgroundColor: `var(${s.name})` }"
          />
          <div class="swatch-name">{{ s.name }}</div>
          <div class="swatch-value">{{ s.value }}</div>
        </div>
      </div>
    </section>

    <!-- 间距 -->
    <section>
      <h3 class="section-title">间距阶梯（--q-space-*）</h3>
      <div v-for="s in spacing" :key="s.name" class="row">
        <div class="row-name">{{ s.name }}</div>
        <div class="spacer-track">
          <div class="spacer" :style="{ width: `var(${s.name})` }" />
        </div>
        <div class="row-value">{{ s.value }}</div>
      </div>
    </section>

    <!-- 圆角 -->
    <section>
      <h3 class="section-title">圆角（--q-radius-*）</h3>
      <div class="grid">
        <div v-for="r in radius" :key="r.name" class="cell">
          <div class="radius-box" :style="{ borderRadius: `var(${r.name})` }" />
          <div class="cell-name">{{ r.name }}</div>
          <div class="cell-value">{{ r.value }}</div>
        </div>
      </div>
    </section>

    <!-- 阴影 -->
    <section>
      <h3 class="section-title">阴影（--q-shadow-*）</h3>
      <div class="grid">
        <div v-for="s in shadows" :key="s.name" class="cell">
          <div class="shadow-box" :style="{ boxShadow: `var(${s.name})` }" />
          <div class="cell-name">{{ s.name }}</div>
          <div class="cell-value">{{ s.value }}</div>
        </div>
      </div>
    </section>

    <!-- 透明度 -->
    <section>
      <h3 class="section-title">透明度（--q-opacity-*）</h3>
      <div class="grid">
        <div v-for="o in opacity" :key="o.name" class="cell">
          <div class="opacity-box" :style="{ opacity: `var(${o.name})` }" />
          <div class="cell-name">{{ o.name }}</div>
          <div class="cell-value">{{ o.value }}</div>
        </div>
      </div>
    </section>

    <!-- 排版 -->
    <section>
      <h3 class="section-title">字号（--q-font-size-*）</h3>
      <div v-for="f in fontSizes" :key="f.name" class="row">
        <div class="row-name">{{ f.name }}</div>
        <div class="type-sample" :style="{ fontSize: `var(${f.name})` }">
          设计系统 Design System
        </div>
        <div class="row-value">{{ f.value }}</div>
      </div>

      <h3 class="section-title">字重（--q-font-weight-*）</h3>
      <div v-for="w in weights" :key="w.name" class="row">
        <div class="row-name">{{ w.name }}</div>
        <div class="type-sample" :style="{ fontWeight: `var(${w.name})` }">
          设计系统 Design System
        </div>
        <div class="row-value">{{ w.value }}</div>
      </div>
    </section>

    <!-- 动效 -->
    <section>
      <h3 class="section-title">动效时长（--q-duration-*）</h3>
      <div v-for="d in durations" :key="d.name" class="row">
        <div class="row-name">{{ d.name }}</div>
        <div
          class="motion-dot"
          :style="{ animationDuration: `var(${d.name})` }"
        />
        <div class="row-value">{{ d.value }}</div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.tokens-demo {
  gap: var(--q-space-8);
}

.section-title {
  margin: 0 0 var(--q-space-5);
  font-size: var(--q-font-size-lg);
  font-weight: var(--q-font-weight-semibold);
  border-left: 4px solid var(--q-color-primary);
  padding-left: var(--q-space-4);
}

.palette-group {
  margin-bottom: var(--q-space-6);
}

.palette-family {
  margin-bottom: var(--q-space-3);
  font-weight: var(--q-font-weight-medium);
  color: var(--q-color-text-description);
}

.palette-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
  gap: var(--q-space-4);
}

.swatch-color {
  height: 2.5rem;
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-md);
}

.swatch-color-lg {
  height: 3rem;
}

.swatch-name,
.cell-name {
  margin-top: var(--q-space-2);
  font-size: var(--q-font-size-xs);
  font-family: var(--q-font-family-mono);
  word-break: break-all;
}

.swatch-value,
.cell-value,
.row-value {
  font-size: var(--q-font-size-xs);
  color: var(--q-color-text-muted);
  font-family: var(--q-font-family-mono);
  word-break: break-all;
}

.row {
  display: flex;
  align-items: center;
  gap: var(--q-space-5);
  margin-bottom: var(--q-space-3);
}

.row-name {
  width: 11rem;
  flex-shrink: 0;
  font-family: var(--q-font-family-mono);
  font-size: var(--q-font-size-xs);
  word-break: break-all;
}

.row-value {
  width: 8rem;
  flex-shrink: 0;
}

.spacer-track {
  flex: 1;
  display: flex;
  align-items: center;
  height: 1.25rem;
  background: var(--q-color-bg-secondary);
  border-radius: var(--q-radius-sm);
  padding: 0 var(--q-space-2);
}

.spacer {
  height: 0.5rem;
  background: var(--q-color-primary);
  border-radius: var(--q-radius-xs);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
  gap: var(--q-space-5);
}

.cell {
  text-align: center;
}

.radius-box {
  height: 3rem;
  background: var(--q-color-primary-light);
  border: 1px solid var(--q-color-primary);
  margin-bottom: var(--q-space-2);
}

.shadow-box {
  height: 3rem;
  background: var(--q-color-bg-card);
  border-radius: var(--q-radius-md);
  margin-bottom: var(--q-space-2);
}

.opacity-box {
  height: 3rem;
  background: var(--q-color-primary);
  border-radius: var(--q-radius-md);
  margin-bottom: var(--q-space-2);
}

.type-sample {
  flex: 1;
  color: var(--q-color-text);
}

.motion-dot {
  width: 1rem;
  height: 1rem;
  border-radius: var(--q-radius-full);
  background: var(--q-color-primary);
  animation-name: tokens-motion-slide;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: var(--q-easing-ease-in-out);
  /* animation-duration 由行内样式按 token 设置，从而体现各档时长差异 */
}

@keyframes tokens-motion-slide {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(1rem);
  }
}
</style>

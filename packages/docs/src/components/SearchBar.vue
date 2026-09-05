<script lang="ts" setup>
import { docsEntries, type DocsEntry } from '@/utils/useComponentInfo';
import { pinyin } from 'pinyin-pro';
import { QPopContainer, QSearch } from 'qyani-components';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const keyword = ref('');
const focused = ref(false);
const activeIndex = ref(0);

/**
 * 组件/工具的中文别名，用于中文与拼音搜索。
 * 命中后由 pinyin-pro 生成全拼与首字母索引，支持 "按钮" / "anniu" / "an" 等输入。
 */
const ALIASES: Record<string, string[]> = {
  // basic
  Icon: ['图标'],
  Message: ['消息', '提示'],
  Notification: ['通知', '提醒', '通知提醒框'],
  Pagination: ['分页'],
  Tag: ['标签'],
  // display
  Alert: ['警告', '提示条', '提示'],
  Avatar: ['头像'],
  Badge: ['徽章', '徽标'],
  BorderBeam: ['边框流光', '光束', '流光'],
  Calendar: ['日历', '日期面板'],
  Listy: ['虚拟列表', '列表'],
  Tour: ['引导', '漫游', 'tour'],
  Breadcrumb: ['面包屑', '导航'],
  Button: ['按钮'],
  FloatButton: ['悬浮按钮', '浮动按钮', '回顶', 'backTop'],
  Col: ['栅格', '列'],
  Row: ['栅格', '行'],
  Space: ['间距', '间隔', '留白'],
  Steps: ['步骤条', '步骤'],
  Tooltip: ['提示', '气泡', '文字提示'],
  Typography: ['排版', '文字', '标题', '段落'],
  Carousel: ['轮播'],
  CarouselItem: ['轮播项'],
  Descriptions: ['描述列表', '详情'],
  Divider: ['分割线'],
  Empty: ['空状态', '无数据', '空白页'],
  Image: ['图片', '预览', '放大'],
  LazyImage: ['懒加载', '图片'],
  MarkdownRender: ['Markdown', '文档渲染'],
  Popover: ['气泡卡片', '气泡', '浮层'],
  Popconfirm: ['气泡确认', '确认框', '删除确认'],
  ProgressBar: ['进度条'],
  QRCode: ['二维码'],
  Result: ['结果页', '结果'],
  ScrollNotice: ['滚动通知', '跑马灯'],
  Watermark: ['水印'],
  Segmented: ['分段控制器', '分段', '选择'],
  Statistic: ['统计数值', '统计'],
  Table: ['表格', '数据表格', '列表'],
  Timeline: ['时间轴', '时间线'],
  // form
  FormButton: ['按钮'],
  FormCheckboxGroup: ['多选', '复选框'],
  FormColorPicker: ['颜色选择', '取色器'],
  FormDatePicker: ['日期选择', '日期'],
  FormFileUpload: ['文件上传', '上传'],
  FormRadioGroup: ['单选', '单选框'],
  FormRangeSlider: ['范围滑块', '滑块'],
  FormSelect: ['下拉选择', '下拉框', '选择器'],
  FormSwitch: ['开关'],
  FormTable: ['表格'],
  FormText: ['文本框', '输入框'],
  FormTextarea: ['多行文本', '文本域'],
  Search: ['搜索'],
  // input（通用录入）
  AutoComplete: ['自动完成', '自动补全', '联想'],
  Cascader: ['级联选择', '级联', '联级'],
  InputNumber: ['数字输入', '数字框'],
  Mentions: ['提及', 'mention', '@'],
  Rate: ['评分', '星级'],
  Slider: ['滑动条', '滑条'],
  TimePicker: ['时间选择', '时间', '时分秒'],
  Transfer: ['穿梭框', '穿梭', '转移'],
  TreeSelect: ['树选择', '下拉树'],
  // layout
  Affix: ['固钉', '吸顶', '吸底', '固定', '锚定'],
  Card: ['卡片'],
  Flex: ['弹性布局', 'flex'],
  Splitter: ['分隔面板', '分割', 'splitter'],
  Collapse: ['折叠面板'],
  CollapseItem: ['折叠项'],
  CollapsibleSection: ['可折叠区块'],
  Content: ['内容', '主体'],
  Dialog: ['对话框', '弹窗'],
  Drawer: ['抽屉'],
  Footer: ['底部', '页脚'],
  Header: ['顶栏', '顶部', '页头'],
  Layout: ['布局'],
  Masonry: ['瀑布流', 'masonry'],
  PopContainer: ['弹层', '浮层'],
  Sider: ['侧边栏', '侧栏'],
  ScrollContainer: ['滚动容器'],
  SwiperAction: ['滑动操作', '滑动删除'],
  Tree: ['树'],
  TreeNode: ['树节点'],
  // loading
  Loading: ['加载'],
  Breathing: ['呼吸点'],
  Skeleton: ['骨架屏'],
  Spinner: ['旋转', '加载动画'],
  // navigation / theme
  Anchor: ['锚点', '目录', '定位'],
  Dropdown: ['下拉菜单', '下拉'],
  Menu: ['菜单', '导航'],
  NavSection: ['导航区域', '导航'],
  Tab: ['标签页'],
  App: ['包裹', '应用上下文', 'message 容器'],
  ConfigProvider: ['全局配置', '配置', '主题定制', 'provider'],
  ThemeToggle: ['主题切换', '暗色模式'],
  // utils
  useArray: ['数组'],
  useSort: ['排序'],
  useGraph: ['图'],
  useHeap: ['堆'],
  useAVLTree: ['平衡二叉树'],
  useRedBlackTree: ['红黑树'],
  useSegmentTree: ['线段树'],
  useSkipList: ['跳表'],
  useClip: ['剪贴板'],
  useDebounce: ['防抖'],
  useThrottle: ['节流'],
  useLocalStorage: ['本地存储'],
  useMemoryCache: ['内存缓存'],
  useLRUCache: ['缓存'],
  useObject: ['对象'],
  useNullHandel: ['空值处理'],
  useScreenSize: ['屏幕尺寸', '响应式'],
  useWindowResize: ['窗口尺寸'],
  useMessage: ['消息'],
  useNotification: ['通知', '通知提醒'],
  useShowLoading: ['加载提示'],
  useTimeDisplay: ['时间显示'],
  useTimeUtils: ['时间工具'],
  useFollowSystemTheme: ['跟随系统主题'],
  useDrag: ['拖拽'],
  useFormEvents: ['表单事件'],
  useMousePosition: ['鼠标位置'],
};

/** 每个文档条目的搜索索引（模块级预构建一次） */
interface SearchIndex {
  entry: DocsEntry;
  /** 英文名 + 分类 + 中文别名（小写） */
  blob: string;
  /** 中文别名的全拼（小写，无音调） */
  pinyinBlob: string;
  /** 中文别名的首字母缩写（小写） */
  initialBlob: string;
}

const index: SearchIndex[] = docsEntries.map((entry) => {
  const aliases = ALIASES[entry.name] ?? [];
  return {
    entry,
    blob: [entry.name, entry.displayName, ...entry.category, ...aliases]
      .join(' ')
      .toLowerCase(),
    // pinyin-pro 默认以空格分隔音节（如 "an niu"），需紧凑化以便前缀匹配
    pinyinBlob: aliases
      .map((alias) =>
        pinyin(alias, { toneType: 'none', type: 'array' }).join(''),
      )
      .join(' ')
      .toLowerCase(),
    initialBlob: aliases
      .map((alias) =>
        pinyin(alias, {
          pattern: 'first',
          toneType: 'none',
          type: 'array',
        }).join(''),
      )
      .join('')
      .toLowerCase(),
  };
});

/** 按英文名 / 中文别名 / 全拼 / 首字母缩写 过滤（packageName 对全部条目相同，不参与匹配） */
const results = computed<SearchIndex[]>(() => {
  const q = keyword.value.trim().toLowerCase();
  if (!q) return [];
  return index.filter(
    ({ blob, pinyinBlob, initialBlob }) =>
      // 英文名 / 中文别名：子串匹配
      blob.includes(q) ||
      // 全拼：整串或任一单词前缀匹配（避免 "an" 命中 "xiang..." 等中缀噪音）
      pinyinBlob.startsWith(q) ||
      pinyinBlob.split(' ').some((word) => word.startsWith(q)) ||
      // 首字母缩写：前缀匹配
      initialBlob.startsWith(q),
  );
});

/** 弹层是否显示（聚焦且有输入时） */
const showDropdown = computed(
  () => focused.value && keyword.value.trim().length > 0,
);

/** 选中结果：跳转到对应组件页并清空搜索 */
const select = (item: SearchIndex) => {
  keyword.value = '';
  focused.value = false;
  activeIndex.value = 0;
  router.push({ name: 'component', params: { name: item.entry.name } });
};

/** 键盘导航：↑/↓ 移动高亮，Enter 选中，Escape 关闭清空（document 级监听，仅聚焦且有内容时生效） */
const onGlobalKeydown = (e: KeyboardEvent) => {
  if (!focused.value || !keyword.value.trim()) return;
  const count = results.value.length;
  if (e.key === 'Escape') {
    focused.value = false;
    keyword.value = '';
    activeIndex.value = 0;
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (count) activeIndex.value = (activeIndex.value + 1) % count;
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (count) activeIndex.value = (activeIndex.value - 1 + count) % count;
  } else if (e.key === 'Enter') {
    e.preventDefault();
    const item = results.value[activeIndex.value];
    if (item) select(item);
  }
};

/** 关键字/焦点变化时重置高亮索引 */
watch([keyword, focused], () => {
  activeIndex.value = 0;
});

/** 点击组件外部时关闭下拉 */
const onDocumentClick = () => {
  focused.value = false;
};

onMounted(() => {
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onGlobalKeydown);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick);
  document.removeEventListener('keydown', onGlobalKeydown);
});
</script>

<template>
  <div class="search-bar" @click.stop>
    <QPopContainer
      :visible="showDropdown"
      class="search-pop"
      position="bottom-center"
    >
      <QSearch
        v-model="keyword"
        placeholder="搜索组件或工具"
        @focus="focused = true"
      />

      <template #pop>
        <ul v-if="results.length" class="search-results scroll-container">
          <li
            v-for="(item, index) in results"
            :key="item.entry.name"
            :class="{ 'is-active': index === activeIndex }"
            class="search-result-item"
            @click="select(item)"
            @mouseenter="activeIndex = index"
          >
            <span class="search-result-name">{{ item.entry.displayName }}</span>
            <span class="search-result-cat">{{
              item.entry.category.join(' / ')
            }}</span>
          </li>
        </ul>
        <p v-if="!results.length" class="search-empty">
          未找到匹配的组件或工具
        </p>
      </template>
    </QPopContainer>
  </div>
</template>

<style scoped>
.search-bar {
  width: 100%;
}

/* QPopContainer 弹层：铺满宽度，仅在 visible 时可点击 */
.search-pop {
  width: 100%;
}

.search-pop :deep(.pop-content) {
  width: 100%;
}

.search-pop :deep(.pop-content.visible) {
  pointer-events: auto;
}

.search-results {
  margin: 0;
  padding: 0.25rem 0;
  list-style: none;
  max-height: 18rem;
  background-color: var(--card-bg);
  border-radius: 0.5rem;
}

.search-result-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
}

.search-result-item:hover,
.search-result-item.is-active {
  background-color: var(--secondary-background-color);
}

.search-result-cat {
  color: var(--text-color-secondary);
  font-size: 0.75rem;
  white-space: nowrap;
}

.search-empty {
  margin: 0;
  padding: 0.5rem 0.8rem;
  color: var(--text-color-secondary);
  font-size: 0.8rem;
  background-color: var(--card-bg);
  border-radius: 0.5rem;
}
</style>

import type { App } from 'vue';

import { QIcon } from './components/basic/Icon';
import { QMessage } from './components/basic/Message';
import { QPagination } from './components/basic/Pagination';
import { QTag } from './components/basic/Tag';
import { QAvatar } from './components/display/Avatar';
import { QBadge } from './components/display/Badge';
import { QCarousel } from './components/display/Carousel';
import { QCarouselItem } from './components/display/CarouselItem';
import { QDivider } from './components/display/Divider';
import { QLazyImage } from './components/display/LazyImage';
import { QProgressBar } from './components/display/ProgressBar';
import { QScrollNotice } from './components/display/ScrollNotice';
import { QFormButton } from './components/form/FormButton';
import { QFormCheckboxGroup } from './components/form/FormCheckboxGroup';
import { QFormColorPicker } from './components/form/FormColorPicker';
import { QFormDatePicker } from './components/form/FormDatePicker';
import { QFormFileUpload } from './components/form/FormFileUpload';
import { QFormRadioGroup } from './components/form/FormRadioGroup';
import { QFormRangeSlider } from './components/form/FormRangeSlider';
import { QFormSelect } from './components/form/FormSelect';
import { QFormSwitch } from './components/form/FormSwitch';
import { QFormTable } from './components/form/FormTable';
import { QFormText } from './components/form/FormText';
import { QFormTextarea } from './components/form/FormTextarea';
import { QSearch } from './components/form/Search';
import { QCard } from './components/layout/Card';
import { QCollapse } from './components/layout/Collapse';
import { QCollapseItem } from './components/layout/CollapseItem';
import { QCollapsibleSection } from './components/layout/CollapsibleSection';
import { QDialog } from './components/layout/Dialog';
import { QDrawer } from './components/layout/Drawer';
import { QPopContainer } from './components/layout/PopContainer';
import { QScrollContainer } from './components/layout/ScrollContainer';
import { QSwiperAction } from './components/layout/SwiperAction';
import { QTree } from './components/layout/Tree';
import { QTreeNode } from './components/layout/TreeNode';
import {
  QBreathing,
  QSkeleton,
  QSpinner,
} from './components/loading/animations';
import { QLoading } from './components/loading/Loading';
import { QNavSection } from './components/navigation/NavSection';
import { QTab } from './components/navigation/Tab';
import { QThemeToggle } from './components/theme/ThemeToggle';

/**
 * 全局注册所有组件
 * @description 独立入口，避免在 `qyani-components` 主入口引入全部组件。
 * QMarkdownRender 体积较大（依赖 marked/highlight.js 等），不在此注册，请按需引入。
 * 使用方式：`import install from 'qyani-components/install'; app.use(install);`
 * @param app Vue 应用实例
 */
export function install(app: App) {
  app.component('QIcon', QIcon);
  app.component('QMessage', QMessage);
  app.component('QPagination', QPagination);
  app.component('QTag', QTag);
  app.component('QAvatar', QAvatar);
  app.component('QBadge', QBadge);
  app.component('QCarousel', QCarousel);
  app.component('QCarouselItem', QCarouselItem);
  app.component('QDivider', QDivider);
  app.component('QLazyImage', QLazyImage);
  app.component('QProgressBar', QProgressBar);
  app.component('QScrollNotice', QScrollNotice);
  app.component('QFormButton', QFormButton);
  app.component('QFormCheckboxGroup', QFormCheckboxGroup);
  app.component('QFormColorPicker', QFormColorPicker);
  app.component('QFormDatePicker', QFormDatePicker);
  app.component('QFormFileUpload', QFormFileUpload);
  app.component('QFormRadioGroup', QFormRadioGroup);
  app.component('QFormRangeSlider', QFormRangeSlider);
  app.component('QFormSelect', QFormSelect);
  app.component('QFormSwitch', QFormSwitch);
  app.component('QFormTable', QFormTable);
  app.component('QFormText', QFormText);
  app.component('QFormTextarea', QFormTextarea);
  app.component('QSearch', QSearch);
  app.component('QCard', QCard);
  app.component('QCollapse', QCollapse);
  app.component('QCollapseItem', QCollapseItem);
  app.component('QCollapsibleSection', QCollapsibleSection);
  app.component('QDialog', QDialog);
  app.component('QDrawer', QDrawer);
  app.component('QPopContainer', QPopContainer);
  app.component('QScrollContainer', QScrollContainer);
  app.component('QSwiperAction', QSwiperAction);
  app.component('QTree', QTree);
  app.component('QTreeNode', QTreeNode);
  app.component('QLoading', QLoading);
  app.component('QBreathing', QBreathing);
  app.component('QSkeleton', QSkeleton);
  app.component('QSpinner', QSpinner);
  app.component('QNavSection', QNavSection);
  app.component('QTab', QTab);
  app.component('QThemeToggle', QThemeToggle);
}

export default install;

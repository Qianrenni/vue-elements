import './style/common.css';
import './style/private.css';
export * from './events';
export * from './utils';
export * from './types';
import { default as QIcon } from './components/basic/Icon.vue';
import { default as QMessage } from './components/basic/Message.vue';
import { default as QPagination } from './components/basic/Pagination.vue';
import { default as QTag } from './components/basic/Tag.vue';
import { default as QAvatar } from './components/display/Avatar.vue';
import { default as QBadge } from './components/display/Badge.vue';
import { default as QCarousel } from './components/display/Carousel.vue';
import { default as QCarouselItem } from './components/display/CarouselItem.vue';
import { default as QDivider } from './components/display/Divider.vue';
import { default as QLazyImage } from './components/display/LazyImage.vue';
import { default as QMarkdownRender } from './components/display/MarkdownRender.vue';
import { default as QProgressBar } from './components/display/ProgressBar.vue';
import { default as QScrollNotice } from './components/display/ScrollNotice.vue';
import { default as QFormButton } from './components/form/FormButton.vue';
import { default as QFormCheckboxGroup } from './components/form/FormCheckboxGroup.vue';
import { default as QFormColorPicker } from './components/form/FormColorPicker.vue';
import { default as QFormDatePicker } from './components/form/FormDatePicker.vue';
import { default as QFormFileUpload } from './components/form/FormFileUpload.vue';
import { default as QFormRadioGroup } from './components/form/FormRadioGroup.vue';
import { default as QFormRangeSlider } from './components/form/FormRangeSlider.vue';
import { default as QFormSelect } from './components/form/FormSelect.vue';
import { default as QFormSwitch } from './components/form/FormSwitch.vue';
import { default as QFormTable } from './components/form/FormTable.vue';
import { default as QFormText } from './components/form/FormText.vue';
import { default as QFormTextarea } from './components/form/FormTextarea.vue';
import { default as QSearch } from './components/form/Search.vue';
import { default as QCard } from './components/layout/Card.vue';
import { default as QCollapse } from './components/layout/Collapse.vue';
import { default as QCollapseItem } from './components/layout/CollapseItem.vue';
import { default as QCollapsibleSection } from './components/layout/CollapsibleSection.vue';
import { default as QDialog } from './components/layout/Dialog.vue';
import { default as QDrawer } from './components/layout/Drawer.vue';
import { default as QPopContainer } from './components/layout/PopContainer.vue';
import { default as QScrollContainer } from './components/layout/ScrollContainer.vue';
import { default as QSwiperAction } from './components/layout/SwiperAction.vue';
import { default as QTree } from './components/layout/Tree.vue';
import { default as QTreeNode } from './components/layout/TreeNode.vue';
import { default as QLoading } from './components/loading/Loading.vue';
import { default as QBreathing } from './components/loading/animations/Breathing.vue';
import { default as QSkeleton } from './components/loading/animations/Skeleton.vue';
import { default as QSpinner } from './components/loading/animations/Spinner.vue';
import { default as QNavSection } from './components/navigation/NavSection.vue';
import { default as QTab } from './components/navigation/Tab.vue';
import { default as QThemeToggle } from './components/theme/ThemeToggle.vue';
export default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  install(app: any) {
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
    app.component('QMarkdownRender', QMarkdownRender);
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
  },
};

export {
  QIcon,
  QMessage,
  QPagination,
  QTag,
  QAvatar,
  QBadge,
  QCarousel,
  QCarouselItem,
  QDivider,
  QLazyImage,
  QMarkdownRender,
  QProgressBar,
  QScrollNotice,
  QFormButton,
  QFormCheckboxGroup,
  QFormColorPicker,
  QFormDatePicker,
  QFormFileUpload,
  QFormRadioGroup,
  QFormRangeSlider,
  QFormSelect,
  QFormSwitch,
  QFormTable,
  QFormText,
  QFormTextarea,
  QSearch,
  QCard,
  QCollapse,
  QCollapseItem,
  QCollapsibleSection,
  QDialog,
  QDrawer,
  QPopContainer,
  QScrollContainer,
  QSwiperAction,
  QTree,
  QTreeNode,
  QLoading,
  QBreathing,
  QSkeleton,
  QSpinner,
  QNavSection,
  QTab,
  QThemeToggle,
};

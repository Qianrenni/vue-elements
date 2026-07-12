import type { Plugin } from 'vue';

import type {
  QAvatar,
  QBadge,
  QBreathing,
  QCard,
  QCarousel,
  QCarouselItem,
  QCollapse,
  QCollapseItem,
  QCollapsibleSection,
  QDialog,
  QDivider,
  QDrawer,
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
  QIcon,
  QLazyImage,
  QLoading,
  QMarkdownRender,
  QMessage,
  QNavSection,
  QPagination,
  QPopContainer,
  QProgressBar,
  QScrollContainer,
  QScrollNotice,
  QSearch,
  QSkeleton,
  QSpinner,
  QSwiperAction,
  QTab,
  QTag,
  QThemeToggle,
  QTree,
  QTreeNode,
} from './dist/types/index';

declare module 'vue' {
  export interface GlobalComponents {
    QAvatar: typeof QAvatar;
    QBadge: typeof QBadge;
    QBreathing: typeof QBreathing;
    QCard: typeof QCard;
    QCarousel: typeof QCarousel;
    QCarouselItem: typeof QCarouselItem;
    QCollapse: typeof QCollapse;
    QCollapseItem: typeof QCollapseItem;
    QCollapsibleSection: typeof QCollapsibleSection;
    QDialog: typeof QDialog;
    QDivider: typeof QDivider;
    QDrawer: typeof QDrawer;
    QFormButton: typeof QFormButton;
    QFormCheckboxGroup: typeof QFormCheckboxGroup;
    QFormColorPicker: typeof QFormColorPicker;
    QFormDatePicker: typeof QFormDatePicker;
    QFormFileUpload: typeof QFormFileUpload;
    QFormRadioGroup: typeof QFormRadioGroup;
    QFormRangeSlider: typeof QFormRangeSlider;
    QFormSelect: typeof QFormSelect;
    QFormSwitch: typeof QFormSwitch;
    QFormTable: typeof QFormTable;
    QFormText: typeof QFormText;
    QFormTextarea: typeof QFormTextarea;
    QIcon: typeof QIcon;
    QLazyImage: typeof QLazyImage;
    QLoading: typeof QLoading;
    QMarkdownRender: typeof QMarkdownRender;
    QMessage: typeof QMessage;
    QNavSection: typeof QNavSection;
    QPagination: typeof QPagination;
    QPopContainer: typeof QPopContainer;
    QProgressBar: typeof QProgressBar;
    QScrollContainer: typeof QScrollContainer;
    QScrollNotice: typeof QScrollNotice;
    QSearch: typeof QSearch;
    QSkeleton: typeof QSkeleton;
    QSpinner: typeof QSpinner;
    QSwiperAction: typeof QSwiperAction;
    QTab: typeof QTab;
    QTag: typeof QTag;
    QThemeToggle: typeof QThemeToggle;
    QTree: typeof QTree;
    QTreeNode: typeof QTreeNode;
  }
}
declare const QyaniComponents: Plugin;
export default QyaniComponents;

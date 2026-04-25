import type {
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
} from './dist/types/index';
import type { Plugin } from 'vue';

declare module 'vue' {
  export interface GlobalComponents {
    QIcon: typeof QIcon;
    QMessage: typeof QMessage;
    QPagination: typeof QPagination;
    QTag: typeof QTag;
    QAvatar: typeof QAvatar;
    QBadge: typeof QBadge;
    QCarousel: typeof QCarousel;
    QCarouselItem: typeof QCarouselItem;
    QDivider: typeof QDivider;
    QLazyImage: typeof QLazyImage;
    QMarkdownRender: typeof QMarkdownRender;
    QProgressBar: typeof QProgressBar;
    QScrollNotice: typeof QScrollNotice;
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
    QSearch: typeof QSearch;
    QCard: typeof QCard;
    QCollapse: typeof QCollapse;
    QCollapseItem: typeof QCollapseItem;
    QCollapsibleSection: typeof QCollapsibleSection;
    QDialog: typeof QDialog;
    QDrawer: typeof QDrawer;
    QPopContainer: typeof QPopContainer;
    QScrollContainer: typeof QScrollContainer;
    QSwiperAction: typeof QSwiperAction;
    QTree: typeof QTree;
    QTreeNode: typeof QTreeNode;
    QLoading: typeof QLoading;
    QBreathing: typeof QBreathing;
    QSkeleton: typeof QSkeleton;
    QSpinner: typeof QSpinner;
    QNavSection: typeof QNavSection;
    QTab: typeof QTab;
    QThemeToggle: typeof QThemeToggle;
  }
}
declare const QyaniComponents: Plugin;
export default QyaniComponents;

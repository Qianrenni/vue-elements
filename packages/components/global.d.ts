import type { Plugin } from 'vue';

import type {
  QAnchor,
  QAutoComplete,
  QAvatar,
  QBadge,
  QBreadcrumb,
  QBreathing,
  QButton,
  QCard,
  QCarousel,
  QCarouselItem,
  QCascader,
  QCol,
  QCollapse,
  QCollapseItem,
  QCollapsibleSection,
  QContent,
  QDialog,
  QDivider,
  QDrawer,
  QDropdown,
  QEmpty,
  QFooter,
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
  QHeader,
  QIcon,
  QInputNumber,
  QLayout,
  QLazyImage,
  QLoading,
  QMarkdownRender,
  QMenu,
  QMessage,
  QNavSection,
  QPagination,
  QPopContainer,
  QProgressBar,
  QRate,
  QRow,
  QScrollContainer,
  QScrollNotice,
  QSearch,
  QSegmented,
  QSider,
  QSkeleton,
  QSlider,
  QSpace,
  QSpinner,
  QStatistic,
  QSteps,
  QSwiperAction,
  QTab,
  QTag,
  QThemeToggle,
  QTimeline,
  QTooltip,
  QTransfer,
  QTree,
  QTreeNode,
  QTreeSelect,
  QTypography,
} from './dist/types/index';

declare module 'vue' {
  export interface GlobalComponents {
    QAnchor: typeof QAnchor;
    QAutoComplete: typeof QAutoComplete;
    QAvatar: typeof QAvatar;
    QBadge: typeof QBadge;
    QBreadcrumb: typeof QBreadcrumb;
    QBreathing: typeof QBreathing;
    QButton: typeof QButton;
    QCard: typeof QCard;
    QCarousel: typeof QCarousel;
    QCarouselItem: typeof QCarouselItem;
    QCascader: typeof QCascader;
    QCol: typeof QCol;
    QCollapse: typeof QCollapse;
    QCollapseItem: typeof QCollapseItem;
    QCollapsibleSection: typeof QCollapsibleSection;
    QContent: typeof QContent;
    QDialog: typeof QDialog;
    QDivider: typeof QDivider;
    QDrawer: typeof QDrawer;
    QDropdown: typeof QDropdown;
    QEmpty: typeof QEmpty;
    QFooter: typeof QFooter;
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
    QHeader: typeof QHeader;
    QIcon: typeof QIcon;
    QInputNumber: typeof QInputNumber;
    QLayout: typeof QLayout;
    QLazyImage: typeof QLazyImage;
    QLoading: typeof QLoading;
    QMarkdownRender: typeof QMarkdownRender;
    QMenu: typeof QMenu;
    QMessage: typeof QMessage;
    QNavSection: typeof QNavSection;
    QPagination: typeof QPagination;
    QPopContainer: typeof QPopContainer;
    QProgressBar: typeof QProgressBar;
    QRate: typeof QRate;
    QRow: typeof QRow;
    QScrollContainer: typeof QScrollContainer;
    QScrollNotice: typeof QScrollNotice;
    QSearch: typeof QSearch;
    QSegmented: typeof QSegmented;
    QSider: typeof QSider;
    QSkeleton: typeof QSkeleton;
    QSlider: typeof QSlider;
    QSpace: typeof QSpace;
    QSpinner: typeof QSpinner;
    QStatistic: typeof QStatistic;
    QSteps: typeof QSteps;
    QSwiperAction: typeof QSwiperAction;
    QTab: typeof QTab;
    QTag: typeof QTag;
    QThemeToggle: typeof QThemeToggle;
    QTimeline: typeof QTimeline;
    QTooltip: typeof QTooltip;
    QTransfer: typeof QTransfer;
    QTree: typeof QTree;
    QTreeNode: typeof QTreeNode;
    QTreeSelect: typeof QTreeSelect;
    QTypography: typeof QTypography;
  }
}
declare const QyaniComponents: Plugin;
export default QyaniComponents;

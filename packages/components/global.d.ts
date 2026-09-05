import type { Plugin } from 'vue';

import type {
  QAffix,
  QAlert,
  QAnchor,
  QApp,
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
  QConfigProvider,
  QContent,
  QDescriptions,
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
  QImage,
  QInputNumber,
  QLayout,
  QLazyImage,
  QLoading,
  QMarkdownRender,
  QMenu,
  QMessage,
  QNavSection,
  QNotification,
  QPagination,
  QPopconfirm,
  QPopContainer,
  QPopover,
  QProgressBar,
  QQRCode,
  QRate,
  QResult,
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
  QTable,
  QTag,
  QThemeToggle,
  QTimeline,
  QTooltip,
  QTransfer,
  QTree,
  QTreeNode,
  QTreeSelect,
  QTypography,
  QWatermark,
} from './dist/types/index';

declare module 'vue' {
  export interface GlobalComponents {
    QAffix: typeof QAffix;
    QAlert: typeof QAlert;
    QAnchor: typeof QAnchor;
    QApp: typeof QApp;
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
    QConfigProvider: typeof QConfigProvider;
    QContent: typeof QContent;
    QDescriptions: typeof QDescriptions;
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
    QImage: typeof QImage;
    QInputNumber: typeof QInputNumber;
    QLayout: typeof QLayout;
    QLazyImage: typeof QLazyImage;
    QLoading: typeof QLoading;
    QMarkdownRender: typeof QMarkdownRender;
    QMenu: typeof QMenu;
    QMessage: typeof QMessage;
    QNavSection: typeof QNavSection;
    QNotification: typeof QNotification;
    QPagination: typeof QPagination;
    QPopContainer: typeof QPopContainer;
    QPopconfirm: typeof QPopconfirm;
    QPopover: typeof QPopover;
    QProgressBar: typeof QProgressBar;
    QQRCode: typeof QQRCode;
    QRate: typeof QRate;
    QResult: typeof QResult;
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
    QTable: typeof QTable;
    QTag: typeof QTag;
    QThemeToggle: typeof QThemeToggle;
    QTimeline: typeof QTimeline;
    QTooltip: typeof QTooltip;
    QTransfer: typeof QTransfer;
    QTree: typeof QTree;
    QTreeNode: typeof QTreeNode;
    QTreeSelect: typeof QTreeSelect;
    QTypography: typeof QTypography;
    QWatermark: typeof QWatermark;
  }
}
declare const QyaniComponents: Plugin;
export default QyaniComponents;

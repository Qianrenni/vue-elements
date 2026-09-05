import type { Plugin } from 'vue';

import type {
  QAffix,
  QAlert,
  QAnchor,
  QApp,
  QAutoComplete,
  QAvatar,
  QBadge,
  QBorderBeam,
  QBreadcrumb,
  QBreathing,
  QButton,
  QCalendar,
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
  QFlex,
  QFloatButton,
  QFooter,
  QForm,
  QFormButton,
  QFormCheckboxGroup,
  QFormColorPicker,
  QFormDatePicker,
  QFormFileUpload,
  QFormItem,
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
  QListy,
  QLoading,
  QMarkdownRender,
  QMasonry,
  QMentions,
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
  QSplitter,
  QStatistic,
  QSteps,
  QSwiperAction,
  QTab,
  QTable,
  QTag,
  QThemeToggle,
  QTimeline,
  QTimePicker,
  QTooltip,
  QTour,
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
    QBorderBeam: typeof QBorderBeam;
    QBreadcrumb: typeof QBreadcrumb;
    QBreathing: typeof QBreathing;
    QButton: typeof QButton;
    QCalendar: typeof QCalendar;
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
    QFlex: typeof QFlex;
    QFloatButton: typeof QFloatButton;
    QFooter: typeof QFooter;
    QForm: typeof QForm;
    QFormButton: typeof QFormButton;
    QFormCheckboxGroup: typeof QFormCheckboxGroup;
    QFormColorPicker: typeof QFormColorPicker;
    QFormDatePicker: typeof QFormDatePicker;
    QFormFileUpload: typeof QFormFileUpload;
    QFormItem: typeof QFormItem;
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
    QListy: typeof QListy;
    QLoading: typeof QLoading;
    QMarkdownRender: typeof QMarkdownRender;
    QMasonry: typeof QMasonry;
    QMentions: typeof QMentions;
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
    QSplitter: typeof QSplitter;
    QStatistic: typeof QStatistic;
    QSteps: typeof QSteps;
    QSwiperAction: typeof QSwiperAction;
    QTab: typeof QTab;
    QTable: typeof QTable;
    QTag: typeof QTag;
    QThemeToggle: typeof QThemeToggle;
    QTimeline: typeof QTimeline;
    QTimePicker: typeof QTimePicker;
    QTooltip: typeof QTooltip;
    QTour: typeof QTour;
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

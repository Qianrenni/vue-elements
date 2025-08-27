
import type {
    QIcon,
	QMessage,
	QPagination,
	QAvatar,
	QBadge,
	QCarousel,
	QCarouselItem,
	QDemoBlock,
	QDivider,
	QMarkdownRender,
	QMobileFrame,
	QProgressBar,
	QRainFigure,
	QScrollNotice,
	QFormButton,
	QFormCheckboxGroup,
	QFormColorPicker,
	QFormContainer,
	QFormDatalist,
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
	QScrollContainer,
	QTree,
	QTreeNode,
	QNavSection,
	QTab,
	QConditionSelect,
	QThemeToggle
} from './dist/types/index';
import type { Plugin } from 'vue'

declare module 'vue' {
    export interface GlobalComponents {
        QIcon: typeof QIcon
		QMessage: typeof QMessage
		QPagination: typeof QPagination
		QAvatar: typeof QAvatar
		QBadge: typeof QBadge
		QCarousel: typeof QCarousel
		QCarouselItem: typeof QCarouselItem
		QDemoBlock: typeof QDemoBlock
		QDivider: typeof QDivider
		QMarkdownRender: typeof QMarkdownRender
		QMobileFrame: typeof QMobileFrame
		QProgressBar: typeof QProgressBar
		QRainFigure: typeof QRainFigure
		QScrollNotice: typeof QScrollNotice
		QFormButton: typeof QFormButton
		QFormCheckboxGroup: typeof QFormCheckboxGroup
		QFormColorPicker: typeof QFormColorPicker
		QFormContainer: typeof QFormContainer
		QFormDatalist: typeof QFormDatalist
		QFormDatePicker: typeof QFormDatePicker
		QFormFileUpload: typeof QFormFileUpload
		QFormRadioGroup: typeof QFormRadioGroup
		QFormRangeSlider: typeof QFormRangeSlider
		QFormSelect: typeof QFormSelect
		QFormSwitch: typeof QFormSwitch
		QFormTable: typeof QFormTable
		QFormText: typeof QFormText
		QFormTextarea: typeof QFormTextarea
		QSearch: typeof QSearch
		QCard: typeof QCard
		QCollapse: typeof QCollapse
		QCollapseItem: typeof QCollapseItem
		QCollapsibleSection: typeof QCollapsibleSection
		QDialog: typeof QDialog
		QDrawer: typeof QDrawer
		QScrollContainer: typeof QScrollContainer
		QTree: typeof QTree
		QTreeNode: typeof QTreeNode
		QNavSection: typeof QNavSection
		QTab: typeof QTab
		QConditionSelect: typeof QConditionSelect
		QThemeToggle: typeof QThemeToggle
    }
}
declare const QyaniComponents: Plugin
export default QyaniComponents

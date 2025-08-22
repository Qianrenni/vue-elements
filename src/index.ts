import "./style/common.css";
import {default as QIcon} from './components/basic/Icon.vue'
import {default as QMessage} from './components/basic/Message.vue'
import {default as QPagination} from './components/basic/Pagination.vue'
import {default as QAvatar} from './components/display/Avatar.vue'
import {default as QBadge} from './components/display/Badge.vue'
import {default as QCarousel} from './components/display/Carousel.vue'
import {default as QCarouselItem} from './components/display/CarouselItem.vue'
import {default as QDemoBlock} from './components/display/DemoBlock.vue'
import {default as QDivider} from './components/display/Divider.vue'
import {default as QMarkdownRender} from './components/display/MarkdownRender.vue'
import {default as QMobileFrame} from './components/display/MobileFrame.vue'
import {default as QProgressBar} from './components/display/ProgressBar.vue'
import {default as QRainFigure} from './components/display/RainFigure.vue'
import {default as QScrollNotice} from './components/display/ScrollNotice.vue'
import {default as QFormButton} from './components/form/FormButton.vue'
import {default as QFormCheckboxGroup} from './components/form/FormCheckboxGroup.vue'
import {default as QFormColorPicker} from './components/form/FormColorPicker.vue'
import {default as QFormContainer} from './components/form/FormContainer.vue'
import {default as QFormDatalist} from './components/form/FormDatalist.vue'
import {default as QFormDatePicker} from './components/form/FormDatePicker.vue'
import {default as QFormFileUpload} from './components/form/FormFileUpload.vue'
import {default as QFormRadioGroup} from './components/form/FormRadioGroup.vue'
import {default as QFormRangeSlider} from './components/form/FormRangeSlider.vue'
import {default as QFormSelect} from './components/form/FormSelect.vue'
import {default as QFormSwitch} from './components/form/FormSwitch.vue'
import {default as QFormTable} from './components/form/FormTable.vue'
import {default as QFormText} from './components/form/FormText.vue'
import {default as QFormTextarea} from './components/form/FormTextarea.vue'
import {default as QSearch} from './components/form/Search.vue'
import {default as QCard} from './components/layout/Card.vue'
import {default as QCollapsibleSection} from './components/layout/CollapsibleSection.vue'
import {default as QScrollContainer} from './components/layout/ScrollContainer.vue'
import {default as QNavSection} from './components/navigation/NavSection.vue'
import {default as QTab} from './components/navigation/Tab.vue'
import {default as QConditionSelect} from './components/Sql/ConditionSelect.vue'
import {default as QThemeToggle} from './components/theme/ThemeToggle.vue'


export * from "./events";
export * from "./utils";
export * from "./types"
export default {
    install(app: any) {
        app.component('QIcon',QIcon)
        app.component('QMessage',QMessage)
        app.component('QPagination',QPagination)
        app.component('QAvatar',QAvatar)
        app.component('QBadge',QBadge)
        app.component('QCarousel',QCarousel)
        app.component('QCarouselItem',QCarouselItem)
        app.component('QDemoBlock',QDemoBlock)
        app.component('QDivider',QDivider)
        app.component('QMarkdownRender',QMarkdownRender)
        app.component('QMobileFrame',QMobileFrame)
        app.component('QProgressBar',QProgressBar)
        app.component('QRainFigure',QRainFigure)
        app.component('QScrollNotice',QScrollNotice)
        app.component('QFormButton',QFormButton)
        app.component('QFormCheckboxGroup',QFormCheckboxGroup)
        app.component('QFormColorPicker',QFormColorPicker)
        app.component('QFormContainer',QFormContainer)
        app.component('QFormDatalist',QFormDatalist)
        app.component('QFormDatePicker',QFormDatePicker)
        app.component('QFormFileUpload',QFormFileUpload)
        app.component('QFormRadioGroup',QFormRadioGroup)
        app.component('QFormRangeSlider',QFormRangeSlider)
        app.component('QFormSelect',QFormSelect)
        app.component('QFormSwitch',QFormSwitch)
        app.component('QFormTable',QFormTable)
        app.component('QFormText',QFormText)
        app.component('QFormTextarea',QFormTextarea)
        app.component('QSearch',QSearch)
        app.component('QCard',QCard)
        app.component('QCollapsibleSection',QCollapsibleSection)
        app.component('QScrollContainer',QScrollContainer)
        app.component('QNavSection',QNavSection)
        app.component('QTab',QTab)
        app.component('QConditionSelect',QConditionSelect)
        app.component('QThemeToggle',QThemeToggle)

    },
};

export {
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
    QCollapsibleSection,
    QScrollContainer,
    QNavSection,
    QTab,
    QConditionSelect,
    QThemeToggle
};

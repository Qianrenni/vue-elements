
export * from './events'
export * from './utils'

import {default as QAvator} from './components/Avator.vue'
import {default as QBadge} from './components/Badge.vue'
import {default as QCarousel} from './components/Carousel.vue'
import {default as QCarouselItem} from './components/CarouselItem.vue'
import {default as QCollapsibleSection} from './components/CollapsibleSection.vue'
import {default as QDivider} from './components/Divider.vue'
import {default as QIcon} from './components/Icon.vue'
import {default as QIconGroups} from './components/IconGroups.vue'
import {default as QMarkdownRender} from './components/MarkdownRender.vue'
import {default as QMobileFrame} from './components/MobileFrame.vue'
import {default as QNavSection} from './components/NavSection.vue'
import {default as QProgressBar} from './components/ProgressBar.vue'
import {default as QRainFigure} from './components/RainFigure.vue'
import {default as QScrollNotice} from './components/ScrollNotice.vue'
import {default as QSearch} from './components/Search.vue'
import {default as QTab} from './components/Tab.vue'
import {default as QThemeToggle} from './components/ThemeToggle.vue'


import {default as QCard} from './layout/Card.vue'

import {type App} from 'vue'
import './style/common.css'



export default {
    install(app:App){
        app.component('QAvator',QAvator)
        app.component('QBadge',QBadge)
        app.component('QCarousel',QCarousel)
        app.component('QCarouselItem',QCarouselItem)
        app.component('QCollapsibleSection',QCollapsibleSection)
        app.component('QDivider',QDivider)
        app.component('QIcon',QIcon)
        app.component('QIconGroups',QIconGroups)
        app.component('QMarkdownRender',QMarkdownRender)
        app.component('QMobileFrame',QMobileFrame)
        app.component('QNavSection',QNavSection)
        app.component('QProgressBar',QProgressBar)
        app.component('QRainFigure',QRainFigure)
        app.component('QScrollNotice',QScrollNotice)
        app.component('QSearch',QSearch)
        app.component('QTabList',QTab)
        app.component('QThemeToggle',QThemeToggle)


        app.component('QCard',QCard)

    }
}


export {
    QAvator,
    QBadge,
    QCarousel,
    QCarouselItem,
    QCollapsibleSection,
    QDivider,
    QIcon,
    QIconGroups,
    QMarkdownRender,
    QMobileFrame,
    QNavSection,
    QProgressBar,
    QRainFigure,
    QScrollNotice,
    QSearch,
    QTab,
    QThemeToggle,


    QCard,
}


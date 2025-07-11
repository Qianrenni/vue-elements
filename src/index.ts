
import {default as QActicleCard} from './components/Card.vue'
import {default as QCollapsibleSection} from './components/CollapsibleSection.vue'
import {default as QMarkdownRender} from './components/MarkdownRender.vue'
import {default as QNavSection} from './components/NavSection.vue'
import {default as QMobileFrame} from './components/MobileFrame.vue'
import {default as QRainFigure} from './components/RainFigure.vue'
import {default as QSkillTag} from './components/Tag.vue'
import {default as QThemeToggle} from './components/ThemeToggle.vue'
import {type App} from 'vue'

export default {
    install(app:App){
        app.component('QActicleCard', QActicleCard)
        app.component('QCollapsibleSection', QCollapsibleSection)
        app.component('QMarkdownRender', QMarkdownRender)
        app.component('QNavSection', QNavSection)
        app.component('QMobileFrame', QMobileFrame)
        app.component('QRainFigure', QRainFigure)
        app.component('QSkillTag', QSkillTag)
        app.component('QThemeToggle', QThemeToggle)
    }
}


export {
    QActicleCard,
    QCollapsibleSection,
    QMarkdownRender,
    QNavSection,
    QMobileFrame,
    QRainFigure,
    QSkillTag,
    QThemeToggle
}


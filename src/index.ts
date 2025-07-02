import ArticleCard from "./components/ArticleCard.vue"
import CollapsibleSection from "./components/CollapsibleSection.vue";
import MarkdownRender from "./components/MarkdownRender.vue";
import NavSection from "./components/NavSection.vue";
import MobileFrame from './components/MobileFrame.vue'
import RainFigure from "./components/RainFigure.vue";
import SkillTag from "./components/SkillTag.vue";

import './style/common.css'

export default {
    install(app){
        app.component('ArticleCard', ArticleCard)
        app.component('CollapsibleSection', CollapsibleSection)
        app.component('MarkdownRender', MarkdownRender)
        app.component('NavSection', NavSection)
        app.component('MobileFrame', MobileFrame)
        app.component('RainFigure', RainFigure)
        app.component('SkillTag', SkillTag)
    }
}
export { ArticleCard, CollapsibleSection, MarkdownRender, NavSection, MobileFrame, RainFigure, SkillTag}

import "./style/common.css";

import { default as QIcon } from "./components/basic/Icon.vue";
import { default as QIconGroups } from "./components/basic/IconGroups.vue";
import { default as QAvator } from "./components/display/Avator.vue";
import { default as QBadge } from "./components/display/Badge.vue";
import { default as QCarousel } from "./components/display/Carousel.vue";
import { default as QCarouselItem } from "./components/display/CarouselItem.vue";
import { default as QDivider } from "./components/display/Divider.vue";
import { default as QMarkdownRender } from "./components/display/MarkdownRender.vue";
import { default as QMobileFrame } from "./components/display/MobileFrame.vue";
import { default as QProgressBar } from "./components/display/ProgressBar.vue";
import { default as QRainFigure } from "./components/display/RainFigure.vue";
import { default as QScrollNotice } from "./components/display/ScrollNotice.vue";
import { default as QSearch } from "./components/form/Search.vue";
import { default as QCard } from "./components/layout/Card.vue";
import { default as QCollapsibleSection } from "./components/layout/CollapsibleSection.vue";
import { default as QNavSection } from "./components/navigation/NavSection.vue";
import { default as QTab } from "./components/navigation/Tab.vue";
import { default as QThemeToggle } from "./components/theme/ThemeToggle.vue";

export * from "./events";
export * from "./utils";

export default {
  install(app: any) {
    app.component("QAvator", QAvator);
    app.component("QBadge", QBadge);
    app.component("QCarousel", QCarousel);
    app.component("QCarouselItem", QCarouselItem);
    app.component("QCollapsibleSection", QCollapsibleSection);
    app.component("QDivider", QDivider);
    app.component("QIcon", QIcon);
    app.component("QIconGroups", QIconGroups);
    app.component("QMarkdownRender", QMarkdownRender);
    app.component("QMobileFrame", QMobileFrame);
    app.component("QNavSection", QNavSection);
    app.component("QProgressBar", QProgressBar);
    app.component("QRainFigure", QRainFigure);
    app.component("QScrollNotice", QScrollNotice);
    app.component("QSearch", QSearch);
    app.component("QTabList", QTab);
    app.component("QThemeToggle", QThemeToggle);

    app.component("QCard", QCard);
  },
};

export {
  QAvator,
  QBadge,
  QCard,
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
};

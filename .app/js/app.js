import Alpine from "alpinejs";

import appearanceStore from "../lib/modules/themes/appearance.store";
import bookmarksStore from "./../lib/modules/bookmarks/bookmarks.store";
import navStore from "../lib/modules/sidebar/nav.store";
import searchData from "./../lib/modules/search/search.data";
import collapsibleData from "../lib/shared/collapsible.data";
import hotkeysStore from "../lib/shared/hotkeys.store";
import scrollPositionData from "../lib/shared/scroll-position.data";
import windowScrollBind from "../lib/shared/window-scroll.bind";
import persistPlugin from "../lib/shared/persist.plugin";
import copyToClipboardData from "../lib/shared/copy-to-clipboard.data";
import tocData from "./../lib/modules/toc/toc.data";

Alpine.plugin(persistPlugin);

appearanceStore(Alpine);
bookmarksStore(Alpine);
navStore(Alpine);
searchData(Alpine);
collapsibleData(Alpine);
hotkeysStore(Alpine);
scrollPositionData(Alpine);
windowScrollBind(Alpine);
copyToClipboardData(Alpine);
tocData(Alpine);

Alpine.start();

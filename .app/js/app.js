import Alpine from "alpinejs";

import appearanceStore from "../lib/modules/themes/appearance.store.js";
import bookmarksStore from "./../lib/modules/bookmarks/bookmarks.store.js";
import navStore from "../lib/modules/sidebar/nav.store.js";
import searchData from "./../lib/modules/search/search.data.js";
import collapsibleData from "../lib/shared/collapsible.data.js";
import hotkeysStore from "../lib/shared/hotkeys.store.js";
import scrollPositionData from "../lib/shared/scroll-position.data.js";
import windowScrollBind from "../lib/shared/window-scroll.bind.js";
import persistPlugin from "../lib/shared/persist.plugin";
import copyToClipboardData from "../lib/shared/copy-to-clipboard.data.js";

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

Alpine.start();

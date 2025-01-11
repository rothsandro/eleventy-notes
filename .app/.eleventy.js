import { sharedModule } from "./lib/shared/index.js";
import { customPropsModule } from "./lib/modules/custom-props/index.js";
import { dynamicContentModule } from "./lib/modules/dynamic-content/index.js";
import { notesModule } from "./lib/modules/notes/index.js";
import { pageNavModule } from "./lib/modules/page-nav/index.js";
import { searchModule } from "./lib/modules/search/index.js";
import { sidebarModule } from "./lib/modules/sidebar/index.js";
import { tagsModule } from "./lib/modules/tags/index.js";
import { tocModule } from "./lib/modules/toc/index.js";
import { wikilinksModule } from "./lib/modules/wikilinks/index.js";
import { assetsModule } from "./lib/modules/assets/index.js";
import { translationModule } from "./lib/modules/translation/index.js";
import { core } from "./lib/core/index.js";

export const config = core.configObj;

export default async function (eleventyConfig) {
  sharedModule.setup(eleventyConfig);
  customPropsModule.setup(eleventyConfig);
  dynamicContentModule.setup(eleventyConfig);
  notesModule.setup(eleventyConfig);
  pageNavModule.setup(eleventyConfig);
  searchModule.setup(eleventyConfig);
  sidebarModule.setup(eleventyConfig);
  tagsModule.setup(eleventyConfig);
  tocModule.setup(eleventyConfig);
  wikilinksModule.setup(eleventyConfig);
  assetsModule.setup(eleventyConfig);
  await translationModule.setup(eleventyConfig);

  core.setup(eleventyConfig);
}

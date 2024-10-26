import type { QueryDef } from "./lib/modules/dynamic-content/query-runner";

export interface AppConfig {
  /**
   * The title of the app.
   * @default Notes
   */
  title?: string;

  /**
   * The description of the app, used by search engines
   * @default Notes app
   */
  description?: string;

  /**
   * The language of the content.
   * @default en
   */
  lang?: string;

  /**
   * The theme configuration.
   * @default { color: "sky" }
   */
  theme?: {
    /**
     * The primary color of the app.
     * @default sky
     */
    color:
      | "tomato"
      | "red"
      | "ruby"
      | "crimson"
      | "pink"
      | "plum"
      | "purple"
      | "violet"
      | "iris"
      | "indigo"
      | "blue"
      | "sky"
      | "cyan"
      | "teal"
      | "jade"
      | "mint"
      | "green"
      | "grass"
      | "lime"
      | "yellow"
      | "amber"
      | "orange"
      | "brown";
  };

  /**
   * The configuration for custom properties.
   * @default { properties: [] }
   */
  customProperties?: {
    /**
     * A list of properties to display in the panel.
     * @default []
     */
    properties: Array<{
      /**
       * The path of the property (if nested)
       */
      path?: string;

      /**
       * A regular expression for the name of the property.
       */
      name?: string;

      /**
       * The label of the property.
       */
      label?: string;

      /**
       * Configuration options for the property value.
       */
      options?: {
        /**
         * Configuration options for date values.
         */
        date?: {
          locale?: string;
          format?: object;
        };

        /**
         * Configuration options for numeric values.
         */
        number?: {
          locale?: string;
          format?: object;
        };
      };
    }>;
  };

  /**
   * The configuration for the "Edit this note" link that redirects to the repo where the notes are stored and allows users to edit the note.
   */
  editThisNote?: {
    /**
     * The URL to edit the note.
     * Supported placeholders: {{file}} and {{branch}}
     */
    url: string;

    /**
     * Whether to open the edit link in a new tab.
     * @default false
     */
    openInNewTab?: boolean;
  };

  /**
   * The configuration for the sidebar (navigation).
   */
  sidebar?: {
    /**
     * A list of links that are displayed after the main navigation.
     * @default []
     */
    links?: Array<{
      /**
       * The URL of the link.
       */
      url: string;

      /**
       * The displayed label of the link.
       */
      label: string;

      /**
       * The icon of the link.
       * See https://feathericons.com/ for a list of icons.
       */
      icon: string;

      /**
       * Whether to open the link in a new tab.
       * @default true
       */
      openInNewTab?: boolean;
    }>;

    /**
     * A list of sections that are displayed in the sidebar.
     */
    sections?: Array<{
      /**
       * The label of the section.
       */
      label: string;

      /**
       * A list of groups to display in the section.
       */
      groups: Array<{
        /**
         * The label of the group
         */
        label?: string;

        /**
         * Whether the group should be expanded by default.
         * Ignored if the group has no label.
         * @default true
         */
        expanded?: boolean;

        /**
         * The query to fetch the notes to display in this group.
         */
        query: QueryDef;
      }>;
    }>;
  };

  /**
   * The configuration for the panel.
   */
  panel?: {
    /**
     * Whether to display the table of contents in the panel.
     * @default true
     */
    tableOfContents?: boolean;

    /**
     * Whether to display custom properties in the panel.
     * @default true
     */
    customProperties?: boolean;

    /**
     * Whether to display tags in the panel.
     * @default true
     */
    tags?: boolean;

    /**
     * Whether to display incoming links in the panel.
     * @default true
     */
    incomingLinks?: boolean;

    /**
     * Whether to display outgoing links in the panel.
     * @default true
     */
    outgoingLinks?: boolean;

    /**
     * Whether to display external links in the panel.
     * @default true
     */
    externalLinks?: boolean;
  };

  /**
   * The configuration for wikilinks.
   * @default { autoLabel: "ref", anchorLabel: "none" }
   */
  wikilinks?: {
    /**
     * The automatic label generated for Wikilinks.
     * @default ref
     */
    autoLabel?: "ref" | "title" | "fileSlug";

    /**
     * How anchors are rendered in Wikilinks.
     * @default arrow
     */
    anchorLabel?: "arrow" | "parentheses" | "hash" | "none";
  };

  /**
   * The configuration for tags.
   * @default { map: {} }
   */
  tags?: {
    /**
     * A key-value object mapping each tag to a different display name.
     */
    map?: Record<
      string,
      | string
      | {
          /**
           * The display name of the tag.
           */
          label: string;

          /**
           * The slug of the tag used in the URL.
           */
          slug: string;
        }
    >;
  };

  /**
   * The configuration for notes.
   */
  notes?: {
    /**
     * The prefix for all notes.
     * @default /n
     */
    pathPrefix?: string;
  };
}

export interface NotesQuery {
  /**
   * A RegEx pattern to match notes to display in this group
   */
  pattern?: string;

  /**
   * Whether the group should be expanded by default.
   * Ignored if the group has no label.
   * @default true
   */
  expanded?: boolean;

  /**
   * A list of tags to match notes
   */
  tags?: string[];

  /**
   * If the notes should be displayed as a tree.
   * @default false
   */
  tree?:
    | boolean
    | {
        /**
         * Whether the tree should be expanded by default.
         * If a boolean is provided, it will be used for all levels.
         * If a number is provided, the first n levels (starting with 1) will be expanded while all others are collapsed.
         * If a string is provided, it will be used as a RegEx pattern to match the paths of the folders that are expanded by default.
         * @default true
         */
        expanded?: boolean | number | string;

        /**
         * A map of search/replace values that will be applied to the paths of the notes in the tree.
         * The keys are case-insensitive RegEx patterns.
         * @default {}
         */
        replace?: Record<string, string>;
      };
}

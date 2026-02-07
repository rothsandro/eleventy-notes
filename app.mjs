// @ts-check
import { defineConfig, createNotesQuery } from "./.app/app-config.js";

export default defineConfig({
  title: "Eleventy Notes",
  description:
    "A simple, lightweight, and flexible note-taking template for Eleventy.",
  editThisNote: {
    url: "https://github.com/rothsandro/eleventy-notes/edit/{{branch}}/{{file}}",
  },
  staticAssets: {
    paths: { "public/": "/" },
  },
  ignores: ["README.md", "CHANGELOG.md"],
  customProperties: {
    properties: [
      {
        name: "author",
        template: "[{{ value.name }}]({{ value.url }})",
      },
      {
        path: "props",
        options: {
          date: {
            locale: "en-US",
          },
        },
      },
    ],
  },
  sidebar: {
    links: [
      {
        url: "https://github.com/rothsandro/eleventy-notes",
        label: "GitHub / Support",
        icon: "github",
      },
      {
        url: "https://www.buymeacoffee.com/sandroroth",
        label: "Buy me a coffee",
        icon: "coffee",
      },
    ],
    sections: [
      {
        label: "Introduction",
        groups: [
          {
            query: createNotesQuery({
              pattern: "^/Introduction/",
            }),
          },
        ],
      },
      {
        label: "Notes",
        groups: [
          {
            query: createNotesQuery({
              pattern: "^/Notes/",
            }),
          },
        ],
      },
      {
        label: "Customization",
        groups: [
          {
            label: "Configuration",
            query: createNotesQuery({
              pattern: "^/Configuration/",
            }),
          },
          {
            label: "Templating",
            expanded: false,
            query: createNotesQuery({
              pattern: "^/Templating/",
            }),
          },
        ],
      },
      {
        label: "Deployment",
        groups: [
          {
            query: createNotesQuery({
              pattern: "^/Deployment/",
              tree: {
                expanded: false,
                replace: {
                  "^/\\w+": "",
                },
              },
            }),
          },
        ],
      },
      {
        label: "Releases",
        groups: [
          {
            query: createNotesQuery({
              pattern: "^/Releases/",
            }),
          },
        ],
      },
    ],
  },
});

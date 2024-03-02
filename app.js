// @ts-check
const { defineConfig, createNotesQuery } = require("./.app/app-config");

module.exports = defineConfig({
  title: "Eleventy Notes",
  description:
    "A simple, lightweight, and flexible note-taking template for Eleventy.",
  editThisNote: {
    url: "https://github.com/rothsandro/eleventy-notes/edit/{{branch}}/{{file}}",
  },
  customProperties: {
    properties: [
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
              pattern: "^/[^/]+$",
            }),
          },
        ],
      },
      {
        label: "Guides",
        groups: [
          {
            label: "Writing Notes",
            query: createNotesQuery({
              pattern: "^/Writing/",
              tree: {
                replace: {
                  "^/\\w+": "",
                },
              },
            }),
          },
          {
            label: "Organizing Notes",
            query: createNotesQuery({
              pattern: "^/Organizing/",
            }),
          },
          {
            label: "Core Features",
            query: createNotesQuery({
              pattern: "^/Features/",
              tree: {
                replace: {
                  "^/\\w+": "",
                },
              },
            }),
          },
          {
            label: "Deployment",
            query: createNotesQuery({
              pattern: "^/Deployment/",
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
  tags: {
    map: {
      "dynamic-content": "dynamic content",
    },
  },
});

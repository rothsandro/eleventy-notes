// @ts-check
const { defineConfig } = require("./.app/app-config");

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
    ],
    notes: [
      {
        pattern: "^/[^/]+$",
      },
      {
        pattern: "^/Writing/",
        label: "Writing Notes",
        tree: {
          replace: {
            "^/\\w+": "",
          },
        },
      },
      {
        pattern: "^/Organizing/",
        label: "Organizing Notes",
      },
      {
        pattern: "^/Features/",
        label: "Core Features",
        tree: {
          replace: {
            "^/\\w+": "",
          },
        },
      },
      {
        pattern: "^/Deployment/",
        label: "Deployment",
      },
      {
        pattern: "^/Releases/",
        label: "Releases",
      },
    ],
  },
  tags: {
    map: {
      "dynamic-content": "dynamic content",
    },
  },
});

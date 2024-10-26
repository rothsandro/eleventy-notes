---
templateEngineOverride: njk,md
tags: [release]
---

You may want to update your notes to the latest version of Eleventy Notes now and then. Read on to learn how to do that.

## Understanding the project structure

Eleventy Notes separates the application code from your notes. This allows you to update the app without losing your notes. The app code is located in the `.app` folder. Your notes are located in the root and any subfolder you create.

```
.
├── .app/                  # App code
│   ├── package.json
│   ├── package-lock.json
│   └── ...
├── My folder/             # Your notes
│   └── Some note.md       # Your notes
├── index.md               # Your notes
├── My note.md             # Your notes
└── app.mjs                # Your config
```

Unless you want to customize the app in a way that isn't officially supported, you should never need to edit any files in the `.app` folder. If you do, you should be aware that you will not be able to update the app anymore or any changes you make will be overwritten when you update the app.

## Checking your version

Open the `.app/package.json` file to find out what version of Eleventy Notes you are currently using:

```json
// .app/package.json
{
  "name": "eleventy-notes",
  "version": "0.5.0" // <-- Your current version
  // ...
}
```

## Updating the app

The latest version of Eleventy Notes is **{{pkg.version}}**. If you are using an older version, you should update to the latest version. See the [[Changelog]] page for a list of changes in each release. Some releases may contain breaking changes that require you to make changes to your notes or setup.

If you want to proceed with the update, follow these steps:

1. Create a backup of your notes
2. Delete the `.app` folder in your project
3. [Download the latest version](https://github.com/rothsandro/eleventy-notes/archive/refs/heads/main.zip) of Eleventy Notes from GitHub
4. Extract the downloaded ZIP file
5. Copy the `.app` folder into your project
6. Run `npm install` in the `.app` folder to install the dependencies
7. Make any necessary changes to your notes/setup as described on the [[Changelog]] page

If you encounter any problems, please [open an issue on GitHub](https://github.com/rothsandro/eleventy-notes/issues).

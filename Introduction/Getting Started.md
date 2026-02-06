---
sort: 1
tags: [introduction]
---

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org/en/) (version 20 or 22+)
- [Git](https://git-scm.com/)

Node (and npm) are used to install and run the project. Git is used to clone the project from GitHub and for version control. You can also download the project as a ZIP file from GitHub if you don't want to use Git.

## Clone the template

Visit the [GitHub repository](https://github.com/rothsandro/eleventy-notes) and click on the green "Use this template" button. Then follow the instructions to create a new repository from the template. After that, clone the repository to your computer.

## Install the dependencies

Open your terminal and navigate to the project folder. Then run the following commands to install the dependencies:

```bash
cd .app
npm install
```

## Clean up the notes

The template contains the documentation notes you are currently reading. You can keep them if you want, but it's recommended to delete them before you start writing your own notes. For that, delete all the files and folders in the root of the project except for the `.app` folder, the `app.mjs` file and the `app.scss` file.

You may also want to clean up the configuration. Open the `app.mjs` file and remove the existing configuration. You can add your own configuration later.

```js
import { defineConfig } from "./.app/app-config.js";

export default defineConfig({
  // Remove everything here
});
```

## Run the project

Make sure you are still inside the `.app` folder. Then run the following command to start the project:

```bash
npm start
```

After a few seconds you should see something like this:

```
[11ty] Server at http://localhost:8080/
```

The project is now running, and you can open it in your browser at [http://localhost:8080/](http://localhost:8080/).

## Write your first note

Create a new file in the root of the project (next to `app.mjs`) and name it `My First Note.md`. Open the file and add some content:

```markdown
# Hello, World!

This is my first note.
```

Once the file is saved, the note should be visible in the browser. It should also be shown in the sidebar. Click on the note to open it.

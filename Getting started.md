---
sort: 1
tags: ["basics"]
---

## Prerequisites

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org/en/) (version 16 or higher)
- [Git](https://git-scm.com/)

Node (and npm) are used to install and run the project. Git is used to clone the project from GitHub and for version control. You can also download the project as a ZIP file from GitHub if you don't want to use Git.

## Cloning the template

Visit the [GitHub repository](https://github.com/rothsandro/eleventy-notes) and click on the green "Use this template" button. Then follow the instructions to create a new repository from the template. After that, clone the repository to your computer.

Then clean up the existing notes by deleting all files and folders except for the `.app` folder.

## Installing the dependencies

Open your terminal and navigate to the project folder. Then run the following commands to install the dependencies:

```bash
cd .app
npm install
```

## Running the project

Make sure you are still inside the `.app` folder. Then run the following command to start the project:

```bash
npm start
```

After a few seconds you should see something like this:

```
[11ty] Server at http://localhost:8080/
```

The project is now running and you can open it in your browser at [http://localhost:8080/](http://localhost:8080/). Now you are ready to write your first note. Move on to the next section [[Writing Notes]].

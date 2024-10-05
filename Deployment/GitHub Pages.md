---
sort: 5
tags: [deployment]
isCloudService: true
---

You can build and deploy your notes using [GitHub Pages](https://pages.github.com/). GitHub Pages is a static site hosting service that takes HTML, CSS, and JavaScript files straight from a repository on GitHub. Add your workflow file `.github/workflows/gh-pages.yml` and push it to your remote `main` branch.

## gh-pages

Add the following to `.github/workflows/gh-pages.yml` to enable deployment to GitHub pages.

```yaml
name: Deploy to GitHub Pages (npm)

on:
  workflow_dispatch:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

# Needed to deploy to GitHub pages subdomain. (E.g. `your-username.github.io/eleventy-notes/`)
env:
  ELEVENTY_NOTES_PATH_PREFIX: "eleventy-notes"

jobs:
  setup:
    name: Setup and Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        name: Checkout
      - uses: actions/setup-node@v4
        name: Setup Node
        with:
          node-version: 20
      - name: Install dependencies
        run: npm install --prefix .app
      - name: Build
        run: npm run build --prefix .app
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: .app/dist

  deploy:
    name: Deploy
    needs: setup
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---
sort: 5
tags: [deployment]
isCloudService: true
---

You can build and deploy your notes using [GitHub Pages](https://pages.github.com/). GitHub Pages is a static site hosting service that takes HTML, CSS, and JavaScript files straight from a repository on GitHub. Add your workflow file `.github/workflows/gh-pages.yml` and push it to your remote `main` branch.

## gh-pages

Add the following to `.github/workflows/gh-pages.yml` to enable deployment to GitHub pages.

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches:
      # Runs on push to main branch
      - main
jobs:
  build-and-deploy:
    # Specifies the runner
    runs-on: ubuntu-latest
    steps:
      # Checks out your repository
      - uses: actions/checkout@v2
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          # Sets up LTS Node version
          node-version: "lts/*"
      - name: Install dependencies
        run: |
          cd .app/
          npm install
          cd ..
      - name: Build
        # By default, GitHub Pages point to a subfolder named after the repository name,
        # like https://username.github.io/repository or https://organization.github.io/repository,
        # so we need to point the path of ELEVENTY_NOTES_PATH_PREFIX to the repository name.
        # If you are using a custom domain, ELEVENTY_NOTES_PATH_PREFIX should point to /
        run: |
          cd .app/
          ELEVENTY_NOTES_PATH_PREFIX=/${{ github.event.repository.name }}/ npm run build
          cd ..
      - name: Move dist to public
        run: mv .app/dist public
      - name: Prepare CNAME
        run: cp CNAME_DEFAULT public/CNAME
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

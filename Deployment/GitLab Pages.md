---
sort: 4
tags: [deployment]
isCloudService: true
---

You can build and deploy your notes using [GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/). GitLab Pages is a static hosting service for projects hosted on GitLab, and is free. It uses GitLab CI to deploy, so your repository must be hosted on GitLab.

## .gitlab-ci.yml

Add the following to `.gitlab-ci.yml` to enable deployment to GitLab pages.

```yaml
pages:
  image: node:lts-alpine
  stage: deploy
  script:
    - cd .app/ && npm run build && cd ..
    - mv .app/dist public
  artifacts:
    paths:
      - public/
  only:
    - main
  before_script:
    - cd .app/ && npm install && cd ..
  cache:
    key: eleventy-notes-cache-1
    paths:
      - .app/node_modules/
```

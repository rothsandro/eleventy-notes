---
sort: 3
tags: [deployment]
isCloudService: true
---

You can build and deploy your notes using [Cloudflare Pages](https://pages.cloudflare.com/). Cloudflare Pages is a static site hosting service that can be used to host your notes. It is free for small projects. You will need to create an account on Cloudflare Pages to use this service.

## Environment Variables

Make sure to add the following environment variables to your Cloudflare Pages project:

| Variable       | Value |
| :------------- | :---- |
| `NODE_VERSION` | 20    |

## Build configurations

Adjust the build configurations to the following values:

| Property               | Value                                                      |
| :--------------------- | :--------------------------------------------------------- |
| Build command          | `npm install --prefix .app && npm run build --prefix .app` |
| Build output directory | `.app/dist/`                                               |
| Root Directory         | `/` (default)                                              |

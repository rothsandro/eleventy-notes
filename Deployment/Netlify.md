---
sort: 2
tags: [deployment]
isCloudService: true
---

You can build and deploy your notes using [Netlify](https://www.netlify.com/). Netlify is a static site hosting service that can be used to host your notes. It is free for small projects. You will need to create an account on Netlify to use this service.

Add a new site to Netlify by clicking on the `New site from Git` button. Select the Git provider you are using and authorize Netlify to access your repository. Select the repository that contains your notes and the branch you want to deploy.

Adjust the build settings to the following:

| Setting           | Value                                                      |
| :---------------- | :--------------------------------------------------------- |
| Base directory    | _leave empty_                                              |
| Build command     | `npm install --prefix .app && npm run build --prefix .app` |
| Publish directory | `.app/dist/`                                               |

Then click on the _Deploy site_ button. Netlify will now build your notes and deploy them to a public URL. You can find the URL in the _Site overview_ section.

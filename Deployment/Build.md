---
sort: 1
tags: [deployment]
---

Open the terminal and navigate to your project folder. Then run the following command:

```bash
cd .app
npm run install # if not already done
npm run build
```

After building, you can find the generated files in the `.app/dist` folder. These files can be deployed to any static web server.

Instead of building the files locally, you can also use a service like [[Deployment/Netlify|Netlify]].

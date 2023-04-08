---
sort: 1
tags: [deployment]
templateEngineOverride: njk,md
cloudServiceNotes:
  sort: ["data.sort"]
  filter:
    - ["tags", "includes", "deployment"]
    - ["data.isCloudService", "isEqual", true]
---

Open the terminal and navigate to your project folder. Then run the following command:

```bash
cd .app
npm install # if not already done
npm run build
```

After building, you can find the generated files in the `.app/dist` folder. These files can be deployed to any static web server.

## Subdirectory

You can deploy your notes to a subdirectory, like `https://example.com/docs/`. To do so, you need to set the environment variable `ELEVENTY_NOTES_PATH_PREFIX` to the subdirectory, e.g. `/docs/`. How to set environment variables depends on your environment or cloud service you use. For example, on macOS you can run the following command:

```bash
ELEVENTY_NOTES_PATH_PREFIX=/docs/ npm run build
```

## Cloud Services

Instead of building the files locally, you can also use a cloud service. Here are instructions for some popular services:

{{ collections.notes | query(cloudServiceNotes) | renderAsList | safe }}

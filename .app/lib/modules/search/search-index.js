import * as pagefind from "pagefind";

export const createIndex = async (outputDir) => {
  const { index } = await pagefind.createIndex();

  await index.addDirectory({ path: outputDir });
  await index.writeFiles({
    outputPath: `${outputDir}/pagefind`,
  });
};

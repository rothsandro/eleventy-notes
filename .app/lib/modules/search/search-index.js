module.exports = async (outputDir) => {
  const pagefind = await import("pagefind");
  const { index } = await pagefind.createIndex();

  await index.addDirectory({ path: outputDir });
  await index.writeFiles({
    outputPath: `${outputDir}/pagefind`,
  });
};

const { execSync } = require("child_process");

module.exports = () => {
  const branch = getGitBranch();

  return function (page, config) {
    // Example: "Features/Start%20page.md"
    const file = `${page.filePathStem.replace(/^\//, "")}.md`;
    const url = config.url;

    return url
      .replace(/\{\{\s*branch\s*\}\}/gi, encodeURI(branch))
      .replace(/\{\{\s*file\s*\}\}/gi, encodeURI(file));
  };
};

function getGitBranch() {
  try {
    const branch = execSync("git rev-parse --abbrev-ref HEAD")
      .toString()
      .trim();
    return branch;
  } catch (err) {
    return "";
  }
}

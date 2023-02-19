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
    // Hide output, we don't want to show an error if it's not a git repo
    const options = { stdio: "pipe" };
    const branch = execSync("git branch --show-current", options)
      .toString()
      .trim();
    return (
      branch ||
      process.env.CF_PAGES_BRANCH || // Cloudflare Pages
      process.env.HEAD || // Netlify
      ""
    );
  } catch (err) {
    return "";
  }
}

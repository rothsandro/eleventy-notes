try {
  const anchorId = window.location.hash.substring(1);
  const anchorEl = anchorId ? document.getElementById(anchorId) : null;
  anchorEl?.scrollIntoView();
} catch (e) {
  console.warn("Cannot scroll to anchor");
}

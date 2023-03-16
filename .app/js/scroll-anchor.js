try {
  const hash = window.location.hash;
  const anchor = hash ? document.querySelector(hash) : null;
  anchor?.scrollIntoView();
} catch (e) {
  console.warn("Cannot scroll to anchor");
}

// #region CONSTANTS
// -----------------

/** Delay before emboldening text. */
const DELAY = 5000;  // ms

/** Prioritized selectors for article content. */
const SELECTORS = [
  '#rso, #readme, #article, #article-content',
  '.prose, .mw-body, .article, .article-wrapper, article',
  '#content-inner, #mainContent, #bodyContent, #content',
  '.content, .content-body, .container',
  '#root, #main, .main, main',
];
// #endregion




// #region METHODS
// ---------------

/**
 * Make the first half of each word bold.
 * @param {Element} parent parent element to embolden
 */
function emboldenElement(parent) {
  for (var child of parent.childNodes) {
    if (child.nodeType == Node.ELEMENT_NODE) emboldenElement(child);
    else if (child.nodeType == Node.TEXT_NODE) {
      var text = child.textContent;
      if (text.length < 32) continue;
      var span = document.createElement('span');
      span.innerHTML = text.replace(/\w+/g, w => `<strong>${w.charAt(0)}</strong>${w.slice(1)}`);
      try { parent.replaceChild(span, child); }
      catch (e) { console.log('chrome-emboldened-reading: emboldenElement():', e); }
    }
  }
}


/**
 * Invoked on page load.
 */
function main() {
  var article = null;
  for (var selector of SELECTORS) {
    article = document.querySelector(selector);
    if (article) break;
  }
  if (!article) return;
  setTimeout(() => emboldenText(article), 5000);
}
main();
// #endregion

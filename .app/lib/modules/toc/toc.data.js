/**
 * Creates the data for the table of contents.
 *
 * @param {import('alpinejs').Alpine} Alpine The alpine instance.
 */
export default function (Alpine) {
  Alpine.data("toc", () => ({
    activeId: null,
    indicator: { start: 0, size: 0 },

    _links: undefined,
    _headings: undefined,
    _nextHash: window.location.hash.slice(1),
    _scrollTimer: 0,

    get indicatorStyles() {
      return {
        "--toc-indicator-start": `${this.indicator.start}px`,
        "--toc-indicator-size": `${this.indicator.size}px`,
      };
    },

    init() {
      this._links = [...this.$el.querySelectorAll("a")];
      this._headings = this._links
        .map((link) => link.getAttribute("href").slice(1))
        .map((id) => document.getElementById(id));

      // Initialize trigger in case the user loads the pagge for the first time
      // without a restored scroll position or hash.
      this.onScroll(false);
    },

    onNavigate(id) {
      // Hash will be used the next time a scroll event is triggered.
      this._nextHash = id;

      // If the hash target is already at the correct position,
      // or scrolling to the target is not possible (e.g. the target is at the bottom of the page
      // and the user is already at the bottom), we trigger the scroll event manually.
      // The timer will be canceled if onScroll() is called by the scroll event.
      this._scrollTimer = window.setTimeout(() => this.onScroll(true), 50);
    },

    onScroll(throttled = true) {
      window.clearTimeout(this._scrollTimer);

      if (throttled) {
        // We throttle the onScroll event for better performance (via AlpineJS).
        // The last few scroll events will be ignored because of that,
        // resulting in a incorrect position calculation.
        // => Trigger a recalculation with a short delay to fix this.
        this._scrollTimer = window.setTimeout(() => this.onScroll(false), 60);
      }

      this._calcPosition();
      this._calcIndicator();
    },

    _calcPosition() {
      const topOffset = this._calcTopOffset();
      const headings = this._headings.map((heading) => {
        const { top, height } = heading.getBoundingClientRect();

        // We activate the heading a bit before it reaches the top.
        // There is no scientific reason for this value. 🤷‍♂️
        const allowedArea = topOffset + 2 * height;

        return {
          id: heading.id,
          pos: top,
          isInFocusAreaOrAbove: top <= allowedArea,
        };
      });

      // If a valid next hash is available, we use it instead of the scroll position
      // because for headings at the bottom of the page, the scroll position is not correct.
      const ids = headings.map((x) => x.id);
      const idFromNextHash = this._getValidIdFromNextHash(ids);
      if (idFromNextHash) {
        this.activeId = idFromNextHash;
        this._nextHash = undefined;

        // Scrolling to a hash target happens sychronously (we don't use smooth scrolling).
        // Therefore we don't need to trigger a debounced scroll event,
        // which would overwrite the position.
        window.clearTimeout(this._scrollTimer);
        return;
      }

      // If the user is at the bottom of the page and the page ends
      // with short chapters, the last (few) heading(s) might never be activated.
      // which feels wrong (but many websites have this issue).
      // To fix this, we mark the last heading as active if the user is at the bottom.
      // As a result, the indicator may "jump" a bit when scrolling around
      // which isn't ideal but probably better than the other issue (who knows).
      // We only do this if the page is scrollable, because for short pages
      // that are not scrollable we shouldn't mark the last heading as active.
      const pos = window.scrollY > 0 ? window.innerHeight + window.scrollY : 0;
      const scrollOffset = 10; // Just some random value that feels right.
      const isNearBottom = pos >= document.body.offsetHeight - scrollOffset;
      if (isNearBottom) {
        this.activeId = headings.at(-1)?.id;
        return;
      }

      // Now we find the last heading that is not below the focus area
      this.activeId =
        headings
          .filter((x) => x.isInFocusAreaOrAbove)
          .sort((a, b) => b.pos - a.pos)
          .at(0)?.id ?? null;
    },

    _getValidIdFromNextHash(validIds) {
      const isValid =
        !!this._nextHash &&
        validIds.includes(this._nextHash) &&
        // Reloading the page with a hash will not focus the heading
        // and restore the scroll position (tested in Brave). In this case,
        // we should not use the hash.
        document.activeElement?.id === this._nextHash;

      return isValid ? this._nextHash : null;
    },

    _calcIndicator() {
      const activeHref = `#${this.activeId}`;
      const activeLink = this.activeId
        ? this._links.find((x) => x.getAttribute("href") == activeHref)
        : undefined;

      if (!activeLink) {
        this.indicator = { start: 0, size: 0 };
        return;
      }

      const rootElRect = activeLink.closest("ul").getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();

      this.indicator = {
        start: linkRect.y - rootElRect.y,
        size: linkRect.height,
      };
    },

    _calcTopOffset() {
      // The headings have a scroll margin because of the sticky header.
      // All headings should have the same scroll margin, so it should be fine
      // to use the first heading's scroll margin.
      const style = this._headings.length
        ? window.getComputedStyle(this._headings[0])
        : undefined;

      return style ? parseInt(style.scrollMarginBlockStart, 10) : 0;
    },
  }));
}

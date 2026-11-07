import { classifyTitle } from "./classifier";

const VIDEO_CARD_SELECTOR = [
  "ytd-rich-item-renderer",
  "ytd-video-renderer",
  "ytd-compact-video-renderer",
  "ytd-grid-video-renderer",
].join(",");

function getTitleFromCard(el: Element): string {
  return el.querySelector("#video-title")?.textContent?.trim() ?? "";
}

function filterCard(el: Element) {
  const title = getTitleFromCard(el);
  if (!title) return;

  const result = classifyTitle(title);
  if (result === "entertainment") {
    (el as HTMLElement).style.setProperty("display", "none", "important");
  }
}

function filterAll() {
  document.querySelectorAll(VIDEO_CARD_SELECTOR).forEach(filterCard);
}

let observer: MutationObserver | null = null;

export function startFocusFilter(): void {
  if (observer) return;

  filterAll();

  observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node.matches(VIDEO_CARD_SELECTOR)) {
          filterCard(node);
        }
        node.querySelectorAll(VIDEO_CARD_SELECTOR).forEach(filterCard);
      }
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });

  // re-filter on YouTube SPA navigation
  window.addEventListener("yt-navigate-finish", filterAll);
}

export function stopFocusFilter(): void {
  if (!observer) return;
  observer.disconnect();
  observer = null;
  window.removeEventListener("yt-navigate-finish", filterAll);

  // restore hidden cards
  document.querySelectorAll(VIDEO_CARD_SELECTOR).forEach((el) => {
    (el as HTMLElement).style.removeProperty("display");
  });
}

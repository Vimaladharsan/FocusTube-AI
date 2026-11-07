import type { FocusMode } from "../../types/settings";
import { classifyTitle } from "./classifier";
import { incrementBlockedCount } from "./counter";

const VIDEO_CARD_SELECTOR = [
  "ytd-rich-item-renderer",
  "ytd-video-renderer",
  "ytd-compact-video-renderer",
  "ytd-grid-video-renderer",
].join(",");

let activeMode: FocusMode = "off";
let activeCustomKeywords: string[] = [];

function getTitleFromCard(el: Element): string {
  return el.querySelector("#video-title")?.textContent?.trim() ?? "";
}

function filterCard(el: Element) {
  const title = getTitleFromCard(el);
  if (!title) return;
  const result = classifyTitle(title, activeMode, activeCustomKeywords);
  const alreadyHidden = (el as HTMLElement).style.display === "none";
  (el as HTMLElement).style.setProperty(
    "display",
    result === "hide" ? "none" : "",
    result === "hide" ? "important" : ""
  );
  if (result === "hide" && !alreadyHidden) {
    incrementBlockedCount();
  }
}

function filterAll() {
  document.querySelectorAll(VIDEO_CARD_SELECTOR).forEach(filterCard);
}

let observer: MutationObserver | null = null;

export function startFocusFilter(mode: FocusMode, customKeywords: string[] = []): void {
  activeMode = mode;
  activeCustomKeywords = customKeywords;

  filterAll();

  if (observer) return;

  observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node.matches(VIDEO_CARD_SELECTOR)) filterCard(node);
        node.querySelectorAll(VIDEO_CARD_SELECTOR).forEach(filterCard);
      }
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("yt-navigate-finish", filterAll);
}

export function stopFocusFilter(): void {
  if (!observer) return;
  observer.disconnect();
  observer = null;
  window.removeEventListener("yt-navigate-finish", filterAll);
  document.querySelectorAll(VIDEO_CARD_SELECTOR).forEach((el) => {
    (el as HTMLElement).style.removeProperty("display");
  });
}

const VIDEO_CARD_SELECTOR = [
  "ytd-rich-item-renderer",
  "ytd-video-renderer",
  "ytd-compact-video-renderer",
  "ytd-grid-video-renderer",
].join(",");

let blocklist: string[] = [];

function getChannelFromCard(el: Element): string {
  return (
    el.querySelector("ytd-channel-name yt-formatted-string, #channel-name yt-formatted-string")
      ?.textContent
      ?.trim()
      .toLowerCase() ?? ""
  );
}

function filterCard(el: Element) {
  const channel = getChannelFromCard(el);
  if (!channel) return;
  const blocked = blocklist.some((name) => channel.includes(name));
  (el as HTMLElement).style.setProperty("display", blocked ? "none" : "", blocked ? "important" : "");
}

function filterAll() {
  document.querySelectorAll(VIDEO_CARD_SELECTOR).forEach(filterCard);
}

let observer: MutationObserver | null = null;

export function startChannelBlocker(channels: string[]): void {
  blocklist = channels.map((c) => c.toLowerCase().trim());

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

export function stopChannelBlocker(): void {
  if (!observer) return;
  observer.disconnect();
  observer = null;
  window.removeEventListener("yt-navigate-finish", filterAll);
  document.querySelectorAll(VIDEO_CARD_SELECTOR).forEach((el) => {
    (el as HTMLElement).style.removeProperty("display");
  });
}

import { isAdPlaying } from "./detector";

export function observePlayer(onAdDetected: () => void) {
  let adWasPlaying = false;

  const observer = new MutationObserver(() => {
    const adIsPlaying = isAdPlaying();
    if (adIsPlaying && !adWasPlaying) {
      onAdDetected();
    }
    adWasPlaying = adIsPlaying;
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class"],
  });
}
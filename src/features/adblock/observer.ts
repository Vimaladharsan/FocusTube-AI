import { isAdPlaying } from "./detector";

export function observePlayer(onAdDetected: () => void) {
  const observer = new MutationObserver(() => {
    if (isAdPlaying()) {
      console.log("🚨 YouTube Ad Detected");
      onAdDetected();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
  });
}
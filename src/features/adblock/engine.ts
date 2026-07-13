let skipInterval: number | null = null;

export function startAdBlocker() {
  console.log("FocusTube AI Ad Blocker Started");
  observePlayer();
}

function isAdPlaying(): boolean {
  return document.querySelector(".ad-showing") !== null;
}

function startSkipPolling() {
  if (skipInterval !== null) return;

  skipInterval = window.setInterval(() => {
    const skipButton = document.querySelector("#skip-button");

    if (skipButton instanceof HTMLButtonElement) {
      skipButton.click();

      console.log("✅ Skipped YouTube Ad");

      if (skipInterval !== null) {
        clearInterval(skipInterval);
         skipInterval = null;
      }
      skipInterval = null;
    }
  }, 200);
}

function observePlayer() {
  const observer = new MutationObserver(() => {
    if (isAdPlaying()) {
        console.log("🚨 YouTube Ad Detected");
        startSkipPolling();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
  });
}
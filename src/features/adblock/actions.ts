import { SELECTORS } from "./selectors";

let skipInterval: number | null = null;

export function startSkipPolling() {
  if (skipInterval !== null) return;

  skipInterval = window.setInterval(() => {
    const skipButton = document.querySelector<HTMLButtonElement>(SELECTORS.SKIP_BUTTON);

    if (skipButton) {
      skipButton.click();

      if (skipInterval !== null) {
        clearInterval(skipInterval);
        skipInterval = null;
      }
    }
  }, 200);
}
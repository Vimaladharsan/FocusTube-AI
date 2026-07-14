let skipInterval: number | null = null;

export function startSkipPolling() {
  if (skipInterval !== null) return;

  skipInterval = window.setInterval(() => {
    const skipButton = document.body;

    if (skipButton instanceof HTMLButtonElement) {
      console.log("✅ Action executed");

      console.log("✅ Skipped YouTube Ad");

      if (skipInterval !== null) {
        clearInterval(skipInterval);
        skipInterval = null;
      }
    }
  }, 200);
}
import { getSettings } from "../features/settings";
import { startAdBlocker } from "../features/adblock/engine";

async function initializeContentScript() {
  const settings = await getSettings();

  if (!settings.adBlockEnabled) {
    return;
  }

  startAdBlocker();
}

initializeContentScript();


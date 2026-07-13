import { getSettings } from "../features/settings";
import { startAdBlocker } from "../features/adblock/engine";

console.log("FocusTube AI Content Script Loaded");
async function initializeContentScript() {
  const settings = await getSettings();

  console.log("FocusTube AI Settings:", settings);
  console.log("Chrome object:", chrome);
  console.log("Chrome storage:", chrome.storage); 

  if (!settings.adBlockEnabled) {
    return;
  }

  startAdBlocker();;
}

initializeContentScript();


import { getSettings } from "../features/settings";

const RULESET_ID = "adblock_rules";

async function syncRulesets() {
  const { adBlockEnabled } = await getSettings();

  await chrome.declarativeNetRequest.updateEnabledRulesets(
    adBlockEnabled
      ? { enableRulesetIds: [RULESET_ID], disableRulesetIds: [] }
      : { enableRulesetIds: [], disableRulesetIds: [RULESET_ID] }
  );
}

chrome.runtime.onInstalled.addListener(syncRulesets);
chrome.storage.onChanged.addListener(syncRulesets);

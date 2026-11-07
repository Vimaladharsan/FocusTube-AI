import { getSettings, saveSettings } from "../settings";

export async function isHideSuggestedEnabled(): Promise<boolean> {
  const settings = await getSettings();
  return settings.hideSuggested;
}

export async function setHideSuggested(enabled: boolean): Promise<void> {
  const settings = await getSettings();
  settings.hideSuggested = enabled;
  await saveSettings(settings);
}

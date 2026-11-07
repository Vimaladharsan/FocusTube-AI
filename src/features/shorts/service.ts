import { getSettings, saveSettings } from "../settings";

export async function isHideShortsEnabled(): Promise<boolean> {
  const settings = await getSettings();
  return settings.hideShorts;
}

export async function setHideShorts(enabled: boolean): Promise<void> {
  const settings = await getSettings();
  settings.hideShorts = enabled;
  await saveSettings(settings);
}

import { getSettings, saveSettings } from "../settings";

export async function isFocusModeEnabled(): Promise<boolean> {
  const settings = await getSettings();
  return settings.focusModeEnabled;
}

export async function setFocusMode(enabled: boolean): Promise<void> {
  const settings = await getSettings();
  settings.focusModeEnabled = enabled;
  await saveSettings(settings);
}

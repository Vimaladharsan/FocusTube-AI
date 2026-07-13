import { getSettings, saveSettings } from "../settings";

export async function isAdBlockEnabled(): Promise<boolean> {
  const settings = await getSettings();
  return settings.adBlockEnabled;
}

export async function setAdBlockEnabled(
  enabled: boolean
): Promise<void> {
  const settings = await getSettings();

  settings.adBlockEnabled = enabled;

  await saveSettings(settings);
}
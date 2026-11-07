import { getSettings, saveSettings } from "../settings";

export async function isHideCommentsEnabled(): Promise<boolean> {
  const settings = await getSettings();
  return settings.hideComments;
}

export async function setHideComments(enabled: boolean): Promise<void> {
  const settings = await getSettings();
  settings.hideComments = enabled;
  await saveSettings(settings);
}

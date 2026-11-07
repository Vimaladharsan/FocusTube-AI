import type { FocusMode } from "../../types/settings";
import { getSettings, saveSettings } from "../settings";

export async function getFocusMode(): Promise<FocusMode> {
  const settings = await getSettings();
  return settings.focusMode;
}

export async function setFocusMode(mode: FocusMode): Promise<void> {
  const settings = await getSettings();
  settings.focusMode = mode;
  await saveSettings(settings);
}

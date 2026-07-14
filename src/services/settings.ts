import { get, set } from "./storage";
import type { ExtensionSettings } from "../types/settings";

const DEFAULT_SETTINGS: ExtensionSettings = {
  adBlockEnabled: true,
  focusModeEnabled: false,
  hideShorts: true,
  hideComments: false,
  dashboardEnabled: true,
  developerMode: false,
};

const SETTINGS_KEY = "settings";

export async function getSettings(): Promise<ExtensionSettings> {
  const settings = await get<ExtensionSettings>(SETTINGS_KEY);

  return settings ?? DEFAULT_SETTINGS;
}

export async function saveSettings(
  settings: ExtensionSettings
): Promise<void> {
  await set(SETTINGS_KEY, settings);
}

import { get, set } from "../../services/storage";
import type { ExtensionSettings } from "./types";
import { DEFAULT_SETTINGS } from "./defaults";




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

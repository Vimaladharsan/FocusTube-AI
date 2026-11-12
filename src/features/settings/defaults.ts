import type { ExtensionSettings } from "../../types/settings";

export const DEFAULT_SETTINGS: ExtensionSettings = {
  adBlockEnabled: true,
  focusMode: "off",
  customKeywords: [],
  hideShorts: true,
  hideComments: false,
  hideSuggested: false,
  watchTimeLimit: 0,
  developerMode: false,
  videoSpeed: 1,
  blockedChannels: [],
};
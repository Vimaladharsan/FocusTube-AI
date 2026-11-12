export type FocusMode = "off" | "education" | "business" | "learning" | "deepwork" | "custom";

export interface ExtensionSettings {
  adBlockEnabled: boolean;
  focusMode: FocusMode;
  customKeywords: string[];
  hideShorts: boolean;
  hideComments: boolean;
  hideSuggested: boolean;
  watchTimeLimit: number;
  developerMode: boolean;
  videoSpeed: number;
  blockedChannels: string[];
}
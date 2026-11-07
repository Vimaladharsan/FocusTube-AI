export type FocusMode = "off" | "education" | "business" | "learning" | "deepwork" | "custom";

export interface ExtensionSettings {
  adBlockEnabled: boolean;
  focusMode: FocusMode;
  customKeywords: string[];
  hideShorts: boolean;
  hideComments: boolean;
  developerMode: boolean;
  videoSpeed: number;
}
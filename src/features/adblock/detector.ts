import { SELECTORS } from "./selectors";

export function isAdPlaying(): boolean {
  return document.querySelector(SELECTORS.PLAYER) !== null;
}
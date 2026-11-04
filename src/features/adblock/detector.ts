export function isAdPlaying(): boolean {
  return document.documentElement.classList.contains("ad-showing");
}
import { getSettings } from "../features/settings";

const AD_HIDE_CSS = `
  /* Video player ad overlays */
  .video-ads.ytp-ad-module,
  .ytp-ad-player-overlay,
  .ytp-ad-overlay-container,
  .ytp-ad-text-overlay,
  .ytp-ad-timed-pie-countdown-container,
  .ytp-ad-skip-button-container,
  .ytp-ad-action-interstitial,

  /* In-feed ad cards */
  ytd-ad-slot-renderer,
  ytd-display-ad-renderer,
  ytd-action-companion-ad-renderer,
  ytd-video-masthead-ad-v3-renderer,
  ytd-in-feed-ad-layout-renderer,
  ytd-promoted-sparkles-web-renderer,
  ytd-promoted-video-renderer,
  ytd-search-pyv-renderer,
  ytd-compact-promoted-video-renderer,
  ytd-rich-item-renderer:has(ytd-ad-slot-renderer),
  ytd-rich-item-renderer:has([data-google-av-cxtype]),

  /* Masthead and banner ads */
  #masthead-ad,
  ytd-mealbar-promo-renderer,
  ytd-banner-promo-renderer,
  ytd-statement-banner-renderer,

  /* Player ads panel */
  #player-ads,
  #panels:has(ytd-ad-slot-renderer),

  /* Anti-adblock enforcement dialog */
  ytd-enforcement-message-view-model,
  tp-yt-paper-dialog:has(ytd-enforcement-message-view-model) {
    display: none !important;
  }
`;

function dismissEnforcementDialog() {
  const dialog = document.querySelector("ytd-enforcement-message-view-model");
  if (!dialog) return;

  dialog.remove();
  document.documentElement.style.removeProperty("overflow");
  document.body.style.removeProperty("overflow");

  const video = document.querySelector<HTMLVideoElement>("video.html5-main-video");
  if (video?.paused) video.play().catch(() => {});
}

function observeEnforcementDialog() {
  const observer = new MutationObserver(dismissEnforcementDialog);
  observer.observe(document.documentElement, { childList: true, subtree: true });
}

async function initializeContentScript() {
  const settings = await getSettings();

  localStorage.setItem("focustube_adblock", settings.adBlockEnabled ? "1" : "0");

  if (!settings.adBlockEnabled) return;

  const style = document.createElement("style");
  style.textContent = AD_HIDE_CSS;
  document.documentElement.appendChild(style);

  observeEnforcementDialog();
}

initializeContentScript();

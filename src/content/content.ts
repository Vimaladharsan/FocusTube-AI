import { getSettings } from "../features/settings";

const AD_HIDE_CSS = `
  ytd-ad-slot-renderer,
  ytd-banner-promo-renderer,
  ytd-statement-banner-renderer,
  ytd-promoted-sparkles-web-renderer,
  ytd-promoted-video-renderer,
  ytd-search-pyv-renderer,
  ytd-compact-promoted-video-renderer,
  #masthead-ad,
  .ytd-mealbar-promo-renderer,
  .video-ads.ytp-ad-module,
  .ytp-ad-player-overlay,
  .ytp-ad-overlay-container,
  .ytp-ad-text-overlay,
  .ytp-ad-timed-pie-countdown-container {
    display: none !important;
  }
`;

async function initializeContentScript() {
  const settings = await getSettings();
  if (!settings.adBlockEnabled) return;

  const style = document.createElement("style");
  style.textContent = AD_HIDE_CSS;
  document.documentElement.appendChild(style);
}

initializeContentScript();

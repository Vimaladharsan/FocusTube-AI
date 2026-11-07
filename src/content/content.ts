import { getSettings } from "../features/settings";
import { applyVideoSpeed } from "../features/speed/controller";

const SHORTS_HIDE_CSS = `
  ytd-rich-shelf-renderer[is-shorts],
  ytd-reel-shelf-renderer,
  ytd-guide-entry-renderer:has(a[href="/shorts"]),
  ytd-mini-guide-entry-renderer:has(a[href="/shorts"]),
  yt-tab-shape[tab-identifier="Shorts"],
  ytd-thumbnail-overlay-time-status-renderer[overlay-style="SHORTS"],
  ytd-video-renderer:has(ytd-thumbnail-overlay-time-status-renderer[overlay-style="SHORTS"]),
  ytd-grid-video-renderer:has(ytd-thumbnail-overlay-time-status-renderer[overlay-style="SHORTS"]),
  ytd-rich-item-renderer:has(ytd-thumbnail-overlay-time-status-renderer[overlay-style="SHORTS"]) {
    display: none !important;
  }
`;

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

let adPollInterval: number | null = null;

function getVideo(): HTMLVideoElement | null {
  const videos = Array.from(document.querySelectorAll<HTMLVideoElement>("video"));
  return videos.find(v => !v.paused && v.readyState > 0) ?? videos[0] ?? null;
}

function isAdPlaying(): boolean {
  return (
    document.documentElement.classList.contains("ad-showing") ||
    !!document.querySelector(".ytp-ad-player-overlay") ||
    !!document.querySelector(".ytp-ad-simple-ad-badge") ||
    !!document.querySelector(".ytp-ad-skip-button-container")
  );
}

function stopAdPoll() {
  if (adPollInterval === null) return;
  clearInterval(adPollInterval);
  adPollInterval = null;

  // restore video state when ad ends
  const video = getVideo();
  if (video) {
    video.muted = false;
    video.playbackRate = 1;
  }
}

function startAdPoll() {
  if (adPollInterval !== null) return;

  adPollInterval = window.setInterval(() => {
    if (!isAdPlaying()) {
      stopAdPoll();
      return;
    }

    const video = getVideo();
    if (video) {
      video.muted = true;
      video.playbackRate = 16;

      // seek to end if duration is known and seekable
      if (isFinite(video.duration) && video.duration > 0 && video.seekable.length > 0) {
        video.currentTime = video.duration;
      }
    }

    // click skip button if available
    const skipBtn = document.querySelector<HTMLButtonElement>(
      ".ytp-skip-ad-button, .ytp-ad-skip-button, .ytp-skip-ad-button-slot button"
    );
    if (skipBtn) skipBtn.click();

  }, 100);
}

function dismissEnforcementDialog() {
  const dialog = document.querySelector("ytd-enforcement-message-view-model");
  if (!dialog) return;
  dialog.remove();
  document.documentElement.style.removeProperty("overflow");
  document.body.style.removeProperty("overflow");
  const video = getVideo();
  if (video?.paused) video.play().catch(() => {});
}

function observeAds() {
  const observer = new MutationObserver(() => {
    if (isAdPlaying()) startAdPoll();
    dismissEnforcementDialog();
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
    childList: true,
    subtree: true,
  });
}

// Start ad detection immediately — do not wait for async settings
observeAds();
if (isAdPlaying()) startAdPoll();

async function initializeContentScript() {
  const settings = await getSettings();

  localStorage.setItem("focustube_adblock", settings.adBlockEnabled ? "1" : "0");

  if (!settings.adBlockEnabled) {
    stopAdPoll();
    return;
  }

  const style = document.createElement("style");
  style.textContent = AD_HIDE_CSS;
  document.documentElement.appendChild(style);

  if (settings.hideShorts) {
    const shortsStyle = document.createElement("style");
    shortsStyle.textContent = SHORTS_HIDE_CSS;
    document.documentElement.appendChild(shortsStyle);
  }

  if (settings.videoSpeed !== 1) {
    applyVideoSpeed(settings.videoSpeed);
  }
}

initializeContentScript();

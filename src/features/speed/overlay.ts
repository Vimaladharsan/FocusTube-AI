import { getVideoSpeed, setVideoSpeed } from "./service";
import { applyVideoSpeed } from "./controller";

const MIN = 0.25;
const MAX = 16;
const STEP = 0.25;

const OVERLAY_ID = "ft-speed-overlay";

const OVERLAY_CSS = `
  #ft-speed-overlay {
    position: absolute;
    bottom: 56px;
    left: 12px;
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    border-radius: 8px;
    padding: 5px 8px;
    z-index: 9999;
    opacity: 0.4;
    transition: opacity 0.2s;
    pointer-events: auto;
    user-select: none;
  }
  #movie_player:hover #ft-speed-overlay,
  #ft-speed-overlay:hover {
    opacity: 1;
  }
  .ft-speed-btn {
    background: none;
    border: 1px solid rgba(255,255,255,0.4);
    color: white;
    width: 22px;
    height: 22px;
    border-radius: 4px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    padding: 0;
    transition: background 0.15s;
  }
  .ft-speed-btn:hover { background: rgba(255,255,255,0.2); }
  .ft-speed-btn:disabled { opacity: 0.3; cursor: default; }
  #ft-speed-val {
    color: white;
    font-size: 13px;
    font-weight: 700;
    min-width: 36px;
    text-align: center;
    font-family: Inter, Arial, sans-serif;
    cursor: pointer;
  }
  #ft-speed-val:hover { color: #60a5fa; }
`;

let currentSpeed = 1;

function updateDisplay() {
  const val = document.getElementById("ft-speed-val");
  const dec = document.getElementById("ft-speed-dec") as HTMLButtonElement | null;
  const inc = document.getElementById("ft-speed-inc") as HTMLButtonElement | null;
  if (val) val.textContent = `${currentSpeed}x`;
  if (dec) dec.disabled = currentSpeed <= MIN;
  if (inc) inc.disabled = currentSpeed >= MAX;
}

async function changeSpeed(delta: number) {
  const next = Math.min(MAX, Math.max(MIN, Math.round((currentSpeed + delta) * 100) / 100));
  if (next === currentSpeed) return;
  currentSpeed = next;
  updateDisplay();
  applyVideoSpeed(next);
  await setVideoSpeed(next);
}

function injectOverlay() {
  if (document.getElementById(OVERLAY_ID)) return;

  const player = document.querySelector<HTMLElement>("#movie_player");
  if (!player) return;

  // inject styles once
  if (!document.getElementById("ft-speed-styles")) {
    const style = document.createElement("style");
    style.id = "ft-speed-styles";
    style.textContent = OVERLAY_CSS;
    document.head.appendChild(style);
  }

  const overlay = document.createElement("div");
  overlay.id = OVERLAY_ID;
  overlay.innerHTML = `
    <button class="ft-speed-btn" id="ft-speed-dec" title="Decrease speed">−</button>
    <span id="ft-speed-val" title="Click to reset speed">1x</span>
    <button class="ft-speed-btn" id="ft-speed-inc" title="Increase speed">+</button>
  `;
  player.appendChild(overlay);

  overlay.querySelector("#ft-speed-dec")?.addEventListener("click", (e) => {
    e.stopPropagation();
    changeSpeed(-STEP);
  });

  overlay.querySelector("#ft-speed-inc")?.addEventListener("click", (e) => {
    e.stopPropagation();
    changeSpeed(STEP);
  });

  overlay.querySelector("#ft-speed-val")?.addEventListener("click", async (e) => {
    e.stopPropagation();
    currentSpeed = 1;
    updateDisplay();
    applyVideoSpeed(1);
    await setVideoSpeed(1);
  });
}

function tryInject() {
  if (!document.getElementById(OVERLAY_ID)) {
    injectOverlay();
  }
}

export async function initSpeedOverlay(): Promise<void> {
  currentSpeed = await getVideoSpeed();

  tryInject();
  updateDisplay();

  // re-inject after SPA navigation
  window.addEventListener("yt-navigate-finish", () => {
    setTimeout(async () => {
      currentSpeed = await getVideoSpeed();
      tryInject();
      updateDisplay();
    }, 800);
  });

  // watch for player appearing (fullscreen exit, theatre mode, etc.)
  const obs = new MutationObserver(tryInject);
  obs.observe(document.body, { childList: true, subtree: true });
}

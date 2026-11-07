import { getTodayMinutes } from "./tracker";

const BANNER_ID = "ft-limit-banner";
const SESSION_KEY = "ft_limit_dismissed";

const BANNER_CSS = `
  #ft-limit-banner {
    position: fixed;
    inset: 0;
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.82);
    backdrop-filter: blur(6px);
    font-family: Inter, Arial, sans-serif;
  }
  #ft-limit-banner .ft-banner-box {
    background: #1e293b;
    border: 1px solid #334155;
    border-radius: 20px;
    padding: 40px 44px;
    max-width: 420px;
    text-align: center;
    color: white;
  }
  #ft-limit-banner .ft-banner-icon { font-size: 52px; margin-bottom: 16px; }
  #ft-limit-banner h2 {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  #ft-limit-banner p {
    font-size: 14px;
    color: #94a3b8;
    line-height: 1.6;
    margin-bottom: 28px;
  }
  #ft-limit-banner .ft-banner-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
  }
  #ft-limit-banner .ft-btn-stop {
    padding: 11px 24px;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }
  #ft-limit-banner .ft-btn-stop:hover { background: #1d4ed8; }
  #ft-limit-banner .ft-btn-keep {
    padding: 11px 24px;
    background: transparent;
    color: #64748b;
    border: 1px solid #334155;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: color 0.2s, border-color 0.2s;
  }
  #ft-limit-banner .ft-btn-keep:hover { color: #94a3b8; border-color: #475569; }
`;

export function showLimitBanner(limitMins: number): void {
  if (document.getElementById(BANNER_ID)) return;
  if (sessionStorage.getItem(SESSION_KEY)) return;

  if (!document.getElementById("ft-limit-banner-styles")) {
    const style = document.createElement("style");
    style.id = "ft-limit-banner-styles";
    style.textContent = BANNER_CSS;
    document.head.appendChild(style);
  }

  const watched = getTodayMinutes();

  const banner = document.createElement("div");
  banner.id = BANNER_ID;
  banner.innerHTML = `
    <div class="ft-banner-box">
      <div class="ft-banner-icon">⏱️</div>
      <h2>Daily limit reached</h2>
      <p>
        You've watched <strong>${watched} min</strong> today —
        your ${limitMins} min limit is up.<br/>
        Take a break and come back later.
      </p>
      <div class="ft-banner-actions">
        <button class="ft-btn-stop" id="ft-btn-stop">Take a break</button>
        <button class="ft-btn-keep" id="ft-btn-keep">Keep watching</button>
      </div>
    </div>
  `;

  document.body.appendChild(banner);

  document.getElementById("ft-btn-stop")?.addEventListener("click", () => {
    history.back();
    setTimeout(() => window.close(), 300);
  });

  document.getElementById("ft-btn-keep")?.addEventListener("click", () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    banner.remove();
  });
}

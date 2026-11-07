import { useEffect, useRef, useState } from "react";
import { getSettings, saveSettings } from "../features/settings";
import { MODES } from "../features/focus/modes";
import type { FocusMode } from "../types/settings";
import { getTodaySeconds } from "../features/watchtime/tracker";
import { getStreak, getLast7Days } from "../features/watchtime/streak";
import type { DayStat } from "../features/watchtime/streak";

const PRESETS = [15, 30, 60, 90, 120];

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

const ALL_MODES: { id: FocusMode; label: string; emoji: string; description: string }[] = [
  { id: "off", label: "Off", emoji: "⭕", description: "No filtering — show all videos" },
  ...Object.values(MODES),
  { id: "custom", label: "Custom", emoji: "⚙️", description: "Filter by your own keywords" },
];

export default function Dashboard() {
  const [activeMode, setActiveMode] = useState<FocusMode>("off");
  const [customKeywords, setCustomKeywords] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [saved, setSaved] = useState(false);
  const saveTimer = useRef<number | null>(null);

  const [watchedSeconds, setWatchedSeconds] = useState(0);
  const [limitMins, setLimitMins] = useState(0);
  const [limitInput, setLimitInput] = useState("");
  const [streak, setStreak] = useState(0);
  const [weekStats, setWeekStats] = useState<DayStat[]>([]);

  useEffect(() => {
    getSettings().then((s) => {
      setActiveMode(s.focusMode);
      setCustomKeywords(s.customKeywords ?? []);
      setLimitMins(s.watchTimeLimit ?? 0);
      setLimitInput(s.watchTimeLimit > 0 ? String(s.watchTimeLimit) : "");
      setWeekStats(getLast7Days(s.watchTimeLimit ?? 0));
    });
    setWatchedSeconds(getTodaySeconds());
    setStreak(getStreak());
    const id = window.setInterval(() => {
      setWatchedSeconds(getTodaySeconds());
    }, 5000);
    return () => clearInterval(id);
  }, []);

  async function selectMode(mode: FocusMode) {
    setActiveMode(mode);
    const settings = await getSettings();
    settings.focusMode = mode;
    await saveSettings(settings);
    flashSaved();
  }

  async function addKeyword() {
    const kw = inputValue.trim().toLowerCase();
    if (!kw || customKeywords.includes(kw)) return;
    const next = [...customKeywords, kw];
    setCustomKeywords(next);
    setInputValue("");
    const settings = await getSettings();
    settings.customKeywords = next;
    await saveSettings(settings);
    flashSaved();
  }

  async function removeKeyword(kw: string) {
    const next = customKeywords.filter((k) => k !== kw);
    setCustomKeywords(next);
    const settings = await getSettings();
    settings.customKeywords = next;
    await saveSettings(settings);
  }

  async function saveLimit(mins: number) {
    setLimitMins(mins);
    setLimitInput(mins > 0 ? String(mins) : "");
    setWeekStats(getLast7Days(mins));
    const settings = await getSettings();
    settings.watchTimeLimit = mins;
    await saveSettings(settings);
    flashSaved();
  }

  function flashSaved() {
    setSaved(true);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div className="dashboard">
      <header className="dash-header">
        <div className="dash-logo">
          <span className="dash-logo-icon">🎯</span>
          <div>
            <h1>FocusTube AI</h1>
            <p>Productivity Dashboard</p>
          </div>
        </div>
        {saved && <span className="saved-badge">✓ Saved</span>}
      </header>

      <section className="dash-section">
        <h2>Focus Mode</h2>
        <p className="dash-subtitle">Select a mode to filter your YouTube feed</p>
        <div className="mode-grid">
          {ALL_MODES.map((mode) => (
            <button
              key={mode.id}
              className={`mode-card ${activeMode === mode.id ? "mode-card--active" : ""}`}
              onClick={() => selectMode(mode.id)}
            >
              <span className="mode-emoji">{mode.emoji}</span>
              <span className="mode-label">{mode.label}</span>
              <span className="mode-desc">{mode.description}</span>
              {activeMode === mode.id && <span className="mode-active-badge">Active</span>}
            </button>
          ))}
        </div>
      </section>

      {activeMode === "custom" && (
        <section className="dash-section">
          <h2>Custom Keywords</h2>
          <p className="dash-subtitle">Only videos whose titles contain these words will show</p>
          <div className="keyword-input-row">
            <input
              className="keyword-input"
              type="text"
              placeholder="e.g. stoicism, economics, design..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addKeyword()}
            />
            <button className="keyword-add-btn" onClick={addKeyword}>
              Add
            </button>
          </div>
          <div className="keyword-list">
            {customKeywords.length === 0 && (
              <p className="keyword-empty">No keywords yet — add some above</p>
            )}
            {customKeywords.map((kw) => (
              <span key={kw} className="keyword-tag">
                {kw}
                <button className="keyword-remove" onClick={() => removeKeyword(kw)}>
                  ×
                </button>
              </span>
            ))}
          </div>
        </section>
      )}

      <section className="dash-section">
        <h2>Watch Time</h2>
        <p className="dash-subtitle">Today's YouTube usage</p>

        <div className="wt-stats-row">
          <div className="wt-stat">
            <span className="wt-stat-value">{formatTime(watchedSeconds)}</span>
            <span className="wt-stat-label">Watched today</span>
          </div>
          {limitMins > 0 && (
            <div className="wt-stat">
              <span className="wt-stat-value">{limitMins}m</span>
              <span className="wt-stat-label">Daily limit</span>
            </div>
          )}
          {limitMins > 0 && (
            <div className="wt-stat">
              <span className={`wt-stat-value ${watchedSeconds >= limitMins * 60 ? "wt-over" : "wt-under"}`}>
                {watchedSeconds >= limitMins * 60
                  ? "Limit reached"
                  : formatTime(Math.max(0, limitMins * 60 - watchedSeconds)) + " left"}
              </span>
              <span className="wt-stat-label">Status</span>
            </div>
          )}
          {limitMins > 0 && (
            <div className="wt-stat wt-streak">
              <span className="wt-stat-value">
                🔥 {streak}
              </span>
              <span className="wt-stat-label">Day streak</span>
            </div>
          )}
        </div>

        {limitMins > 0 && weekStats.length > 0 && (
          <div className="wt-week">
            {weekStats.map((day) => (
              <div key={day.label} className="wt-day">
                <div
                  className={`wt-day-dot ${
                    day.isToday
                      ? "wt-day-dot--today"
                      : day.underLimit
                      ? "wt-day-dot--good"
                      : "wt-day-dot--bad"
                  }`}
                  title={`${day.label}: ${formatTime(day.watchedSeconds)}`}
                />
                <span className="wt-day-label">{day.label}</span>
              </div>
            ))}
          </div>
        )}

        {limitMins > 0 && (
          <div className="wt-bar-wrap">
            <div
              className="wt-bar-fill"
              style={{ width: `${Math.min(100, (watchedSeconds / (limitMins * 60)) * 100)}%` }}
            />
          </div>
        )}

        <div className="wt-limit-row">
          <span className="wt-limit-label">Daily limit</span>
          <div className="wt-presets">
            {PRESETS.map((p) => (
              <button
                key={p}
                className={`wt-preset ${limitMins === p ? "wt-preset--active" : ""}`}
                onClick={() => saveLimit(p)}
              >
                {p}m
              </button>
            ))}
            <button
              className={`wt-preset ${limitMins === 0 ? "wt-preset--active" : ""}`}
              onClick={() => saveLimit(0)}
            >
              Off
            </button>
          </div>
          <div className="wt-custom-row">
            <input
              className="keyword-input"
              type="number"
              min="1"
              max="480"
              placeholder="Custom (mins)"
              value={limitInput}
              onChange={(e) => setLimitInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const v = parseInt(limitInput, 10);
                  if (v > 0) saveLimit(v);
                }
              }}
            />
            <button
              className="keyword-add-btn"
              onClick={() => {
                const v = parseInt(limitInput, 10);
                if (v > 0) saveLimit(v);
              }}
            >
              Set
            </button>
          </div>
        </div>
      </section>

      {activeMode !== "off" && activeMode !== "custom" && (
        <section className="dash-section">
          <h2>Active Filters</h2>
          <div className="filter-columns">
            <div className="filter-col">
              <h3 className="filter-col-title filter-col-title--allow">✓ Shows</h3>
              <div className="keyword-list">
                {MODES[activeMode as keyof typeof MODES].allowKeywords.map((kw) => (
                  <span key={kw} className="keyword-tag keyword-tag--allow">{kw}</span>
                ))}
              </div>
            </div>
            <div className="filter-col">
              <h3 className="filter-col-title filter-col-title--block">✕ Hides</h3>
              <div className="keyword-list">
                {MODES[activeMode as keyof typeof MODES].blockKeywords.map((kw) => (
                  <span key={kw} className="keyword-tag keyword-tag--block">{kw}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

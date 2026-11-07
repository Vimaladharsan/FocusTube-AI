import { useEffect, useRef, useState } from "react";
import { getSettings, saveSettings } from "../features/settings";
import { MODES } from "../features/focus/modes";
import type { FocusMode } from "../types/settings";

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

  useEffect(() => {
    getSettings().then((s) => {
      setActiveMode(s.focusMode);
      setCustomKeywords(s.customKeywords ?? []);
    });
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

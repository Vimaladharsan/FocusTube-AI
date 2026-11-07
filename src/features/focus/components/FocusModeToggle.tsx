import { useEffect, useState } from "react";
import { getSettings } from "../../settings";
import { getBlockedCount } from "../counter";
import type { FocusMode } from "../../../types/settings";

const MODE_META: Record<FocusMode, { label: string; emoji: string }> = {
  off:       { label: "Off",       emoji: "⭕" },
  education: { label: "Education", emoji: "🎓" },
  business:  { label: "Business",  emoji: "💼" },
  learning:  { label: "Learning",  emoji: "💻" },
  deepwork:  { label: "Deep Work", emoji: "🧠" },
  custom:    { label: "Custom",    emoji: "⚙️" },
};

export default function FocusModeToggle() {
  const [mode, setMode] = useState<FocusMode>("off");
  const [blocked, setBlocked] = useState(0);

  useEffect(() => {
    getSettings().then((s) => setMode(s.focusMode));
    getBlockedCount().then(setBlocked);
  }, []);

  function openDashboard() {
    chrome.runtime.openOptionsPage();
  }

  const meta = MODE_META[mode];
  const isActive = mode !== "off";

  return (
    <div className="setting-card">
      <div className="setting-card-content">
        <h3>Focus Mode</h3>
        <p>
          {isActive
            ? `${meta.emoji} ${meta.label} — ${blocked > 0 ? `${blocked} videos filtered today` : "filtering active"}`
            : "No filtering — all videos visible"}
        </p>
      </div>
      <div className="setting-card-action">
        <button className="dashboard-btn" onClick={openDashboard}>
          Configure
        </button>
      </div>
    </div>
  );
}

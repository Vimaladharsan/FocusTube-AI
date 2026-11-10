import { useEffect, useState } from "react";
import { getSettings } from "../../settings";
import { getPopupWatchSeconds } from "../popupReader";

function fmt(seconds: number): string {
  const m = Math.floor(seconds / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  const rem = m % 60;
  return rem > 0 ? `${h}h ${rem}m` : `${h}h`;
}

export default function WatchTimeCard() {
  const [seconds, setSeconds] = useState(0);
  const [limitMins, setLimitMins] = useState(0);

  useEffect(() => {
    getPopupWatchSeconds().then(setSeconds);
    getSettings().then((s) => setLimitMins(s.watchTimeLimit));
  }, []);

  const mins = Math.floor(seconds / 60);
  const hasLimit = limitMins > 0;
  const pct = hasLimit ? Math.min(100, Math.round((mins / limitMins) * 100)) : 0;
  const isOver = hasLimit && mins >= limitMins;
  const isNear = hasLimit && pct >= 80 && !isOver;

  const barColor = isOver ? "#ef4444" : isNear ? "#f59e0b" : "#2563eb";

  return (
    <div className="setting-card wt-card">
      <div className="setting-card-content">
        <h3>Watch Time</h3>
        <p>
          {hasLimit
            ? `${fmt(seconds)} of ${limitMins}m limit${isOver ? " — limit reached" : ""}`
            : `${fmt(seconds)} today`}
        </p>
      </div>
      {hasLimit && (
        <div className="wt-bar-wrap">
          <div
            className="wt-bar-fill"
            style={{ width: `${pct}%`, background: barColor }}
          />
        </div>
      )}
    </div>
  );
}

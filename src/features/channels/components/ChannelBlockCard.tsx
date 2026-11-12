import { useEffect, useState } from "react";
import { getSettings } from "../../settings";

export default function ChannelBlockCard() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    getSettings().then((s) => setCount((s.blockedChannels ?? []).length));
  }, []);

  return (
    <div className="setting-card">
      <div className="setting-card-content">
        <h3>Channel Blocklist</h3>
        <p>
          {count === 0
            ? "No channels blocked"
            : `${count} channel${count === 1 ? "" : "s"} blocked`}
        </p>
      </div>
      <div className="setting-card-action">
        <button className="dashboard-btn" onClick={() => chrome.runtime.openOptionsPage()}>
          Manage
        </button>
      </div>
    </div>
  );
}

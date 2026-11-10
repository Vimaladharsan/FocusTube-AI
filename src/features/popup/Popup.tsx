import AdBlockToggle from "../adblock/components/AdBlockToggle";
import SpeedController from "../speed/components/SpeedController";
import HideShortsToggle from "../shorts/components/HideShortsToggle";
import HideCommentsToggle from "../comments/components/HideCommentsToggle";
import HideSuggestedToggle from "../suggested/components/HideSuggestedToggle";
import FocusModeToggle from "../focus/components/FocusModeToggle";
import WatchTimeCard from "../watchtime/components/WatchTimeCard";

function SectionLabel({ children }: { children: string }) {
  return <p className="popup-section-label">{children}</p>;
}

function Popup() {
  return (
    <div className="popup">
      <header className="popup-header">
        <div className="popup-logo">🎯</div>
        <div>
          <h1>FocusTube AI</h1>
          <p>Your Productivity Companion</p>
        </div>
      </header>

      <main className="popup-content">

        <section className="popup-section">
          <SectionLabel>🛡️ Blocking</SectionLabel>
          <AdBlockToggle />
          <HideShortsToggle />
          <HideCommentsToggle />
          <HideSuggestedToggle />
        </section>

        <section className="popup-section">
          <SectionLabel>🧠 Focus</SectionLabel>
          <FocusModeToggle />
        </section>

        <section className="popup-section">
          <SectionLabel>⏱️ Activity</SectionLabel>
          <WatchTimeCard />
        </section>

        <section className="popup-section">
          <SectionLabel>⚡ Playback</SectionLabel>
          <SpeedController />
        </section>

      </main>
    </div>
  );
}

export default Popup;

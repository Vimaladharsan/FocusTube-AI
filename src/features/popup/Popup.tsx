import AdBlockToggle from "../adblock/components/AdBlockToggle";
import SpeedController from "../speed/components/SpeedController";
import HideShortsToggle from "../shorts/components/HideShortsToggle";
import HideCommentsToggle from "../comments/components/HideCommentsToggle";
import HideSuggestedToggle from "../suggested/components/HideSuggestedToggle";
import FocusModeToggle from "../focus/components/FocusModeToggle";

function Popup() {
  return (
    <div className="popup">
      <header className="popup-header">
        <h1>FocusTube AI</h1>
        <p>Your Productivity Companion</p>
      </header>

      <main className="popup-content">
        <AdBlockToggle />
        <FocusModeToggle />
        <HideShortsToggle />
        <HideCommentsToggle />
        <HideSuggestedToggle />
        <SpeedController />
      </main>
    </div>
  );
}

export default Popup;
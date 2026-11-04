import AdBlockToggle from "../adblock/components/AdBlockToggle";
import SpeedController from "../speed/components/SpeedController";

function Popup() {
  return (
    <div className="popup">
      <header className="popup-header">
        <h1>FocusTube AI</h1>
        <p>Your Productivity Companion</p>
      </header>

      <main className="popup-content">
        <AdBlockToggle />
        <SpeedController />
      </main>
    </div>
  );
}

export default Popup;
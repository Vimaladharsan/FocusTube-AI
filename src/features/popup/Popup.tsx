import AdBlockToggle from "../adblock/components/AdBlockToggle";

function Popup() {
  return (
    <div className="popup">
      <header className="popup-header">
        <h1>FocusTube AI</h1>
        <p>Your Productivity Companion</p>
      </header>

      <main className="popup-content">
          <AdBlockToggle />
      </main>
    </div>
  );
}

export default Popup;
interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
}

export default function ToggleSwitch({
  checked,
  onChange,
}: ToggleSwitchProps) {
  return (
    <button
      className={`toggle-switch ${checked ? "active" : ""}`}
      onClick={onChange}
      type="button"
    >
      <span className="toggle-thumb" />
    </button>
  );
}

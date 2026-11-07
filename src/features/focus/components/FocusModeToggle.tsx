import { useFocusMode } from "../hooks/useFocusMode";
import SettingCard from "../../popup/components/SettingCard";
import ToggleSwitch from "../../popup/components/ToggleSwitch";

export default function FocusModeToggle() {
  const { enabled, toggle } = useFocusMode();
  return (
    <SettingCard
      title="Focus Mode"
      description="Show only educational & productivity videos"
    >
      <ToggleSwitch checked={enabled} onChange={toggle} />
    </SettingCard>
  );
}

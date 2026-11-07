import { useHideSuggested } from "../hooks/useHideSuggested";
import SettingCard from "../../popup/components/SettingCard";
import ToggleSwitch from "../../popup/components/ToggleSwitch";

export default function HideSuggestedToggle() {
  const { enabled, toggle } = useHideSuggested();
  return (
    <SettingCard
      title="Hide Suggested Videos"
      description="Remove sidebar recommendations & end screen"
    >
      <ToggleSwitch checked={enabled} onChange={toggle} />
    </SettingCard>
  );
}

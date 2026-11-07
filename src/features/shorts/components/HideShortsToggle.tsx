import { useHideShorts } from "../hooks/useHideShorts";
import SettingCard from "../../popup/components/SettingCard";
import ToggleSwitch from "../../popup/components/ToggleSwitch";

export default function HideShortsToggle() {
  const { enabled, toggle } = useHideShorts();
  return (
    <SettingCard
      title="Hide Shorts"
      description="Remove Shorts from feed, search & sidebar"
    >
      <ToggleSwitch checked={enabled} onChange={toggle} />
    </SettingCard>
  );
}

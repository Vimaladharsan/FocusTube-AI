import { useHideComments } from "../hooks/useHideComments";
import SettingCard from "../../popup/components/SettingCard";
import ToggleSwitch from "../../popup/components/ToggleSwitch";

export default function HideCommentsToggle() {
  const { enabled, toggle } = useHideComments();
  return (
    <SettingCard
      title="Hide Comments"
      description="Remove comments section on videos"
    >
      <ToggleSwitch checked={enabled} onChange={toggle} />
    </SettingCard>
  );
}

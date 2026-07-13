import { useAdBlock } from "../hooks/useAdBlock";
import SettingCard from "../../popup/components/SettingCard";
import ToggleSwitch from "../../popup/components/ToggleSwitch";

export default function AdBlockToggle() {
    const { enabled, toggle } = useAdBlock();
    return (
  <SettingCard
    title="Universal Ad Blocker"
    description="Block intrusive advertisements"
  >
    <ToggleSwitch
        checked={enabled}
        onChange={toggle}
    />
  </SettingCard>
);
}
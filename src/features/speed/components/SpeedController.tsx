import { useVideoSpeed } from "../hooks/useVideoSpeed";
import SettingCard from "../../popup/components/SettingCard";

export default function SpeedController() {
  const { speed, decrease, increase, reset } = useVideoSpeed();

  return (
    <SettingCard
      title="Playback Speed"
      description="Adjust video playback rate"
    >
      <div className="speed-control">
        <button
          className="speed-btn"
          onClick={decrease}
          disabled={speed <= 0.25}
        >
          −
        </button>
        <button className="speed-value" onClick={reset} title="Reset to 1x">
          {speed}x
        </button>
        <button
          className="speed-btn"
          onClick={increase}
          disabled={speed >= 2}
        >
          +
        </button>
      </div>
    </SettingCard>
  );
}

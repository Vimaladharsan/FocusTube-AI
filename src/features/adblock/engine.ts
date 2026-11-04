import { observePlayer } from "./observer";
import { startSkipPolling } from "./actions";

export function startAdBlocker() {
  observePlayer(() => {
    startSkipPolling();
  });
}


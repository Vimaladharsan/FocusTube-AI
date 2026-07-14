import { observePlayer } from "./observer";
import { startSkipPolling } from "./actions";


export function startAdBlocker() {
  console.log("FocusTube AI Ad Blocker Started");
  observePlayer(() => {
    startSkipPolling();
  });
}




import { useSyncExternalStore } from "react";

const INTRO_READY_EVENT = "nexora:intro-ready";

function getSnapshot() {
  return document.documentElement.dataset.introReady === "true";
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(INTRO_READY_EVENT, onStoreChange);

  return () => window.removeEventListener(INTRO_READY_EVENT, onStoreChange);
}

export function markIntroReady() {
  document.documentElement.dataset.introReady = "true";
  window.dispatchEvent(new Event(INTRO_READY_EVENT));
}

export function useIntroReady() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

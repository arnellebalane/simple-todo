import { writable, derived } from 'svelte/store';
import { tweened } from 'svelte/motion';

const TOAST_TIMER_DURATION = 2000;
const TOAST_TIMER_INITIAL = 0;
const TOAST_TIMER_FINAL = 1;

function createStore() {
  const { subscribe, set: _set, update } = writable(null);

  const toastTimer = tweened(TOAST_TIMER_INITIAL, { duration: TOAST_TIMER_DURATION });
  toastTimer.subscribe((value) => {
    if (value === TOAST_TIMER_FINAL) {
      toastTimer.set(TOAST_TIMER_INITIAL, { duration: 0 });
    }
  });
  const toastTimerFinished = derived(toastTimer, (value) => value === TOAST_TIMER_FINAL);

  function set(data) {
    toastTimer.set(TOAST_TIMER_INITIAL, { duration: 0 });
    if (!data.timer) {
      data.timer = toastTimerFinished;
      toastTimer.set(TOAST_TIMER_FINAL);
    }
    _set(data);
  }

  function clear() {
    toastTimer.set(TOAST_TIMER_INITIAL, { duration: 0 });
    _set(null);
  }

  return { subscribe, set, update, clear, toastTimer, toastTimerFinished };
}

export const toast = createStore();
export const toastTimer = toast.toastTimer;
export const toastTimerFinished = toast.toastTimerFinished;

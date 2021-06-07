import { writable } from 'svelte/store';

function createStore() {
  const { subscribe, set, update } = writable(null);

  let promiseResolve = null;

  function show(options = {}) {
    const { message = 'Are you sure?', confirmLabel = 'Confirm', cancelLabel = 'Cancel' } = options;
    set({ message, confirmLabel, cancelLabel });
    return new Promise((resolve) => {
      promiseResolve = resolve;
    });
  }

  function confirm() {
    set(null);
    promiseResolve(true);
  }

  function cancel() {
    set(null);
    promiseResolve(false);
  }

  return { subscribe, set, update, show, confirm, cancel };
}

export const confirmation = createStore();

import { writable } from 'svelte/store';

function createStore() {
  const { subscribe, set, update } = writable(null);

  let promiseResolve = null;
  let promiseReject = null;

  function show(message) {
    set(message);
    return new Promise((resolve, reject) => {
      promiseResolve = resolve;
      promiseReject = reject;
    });
  }

  function confirm() {
    set(null);
    promiseResolve();
  }

  function cancel() {
    set(null);
    promiseReject();
  }

  return { subscribe, set, update, show, confirm, cancel };
}

export const confirmation = createStore();

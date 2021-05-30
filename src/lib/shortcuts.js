import shortcuts from '@lib/shortcuts.json';

let keybindings = [];

function isEqual(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

export function initializeKeyBindings() {
  document.addEventListener('keydown', (event) => {
    for (const [[modifier, key], callback] of keybindings) {
      if (event.code === key && event[modifier]) {
        return callback();
      }
    }
  });
}

export function addShortcut(combination, callback) {
  keybindings.push([combination, callback]);
}

export function removeShortcut(combination) {
  keybindings = keybindings.filter((keybinding) => !isEqual(keybinding[0], combination));
}

export function enableShortcut(key, callback) {
  const combinations = shortcuts[key];
  if (Array.isArray(combinations[0])) {
    combinations.map((combination) => addShortcut(combination, callback));
  } else {
    addShortcut(combinations, callback);
  }
}

export function disableShortcut(key) {
  const combinations = shortcuts[key];
  if (Array.isArray(combinations[0])) {
    combinations.map((combination) => removeShortcut(combination, callback));
  } else {
    removeShortcut(combinations, callback);
  }
}

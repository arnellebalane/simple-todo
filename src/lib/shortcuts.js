import shortcuts from '@lib/shortcuts.json';
import isEqual from 'lodash/isEqual';

let keybindings = [];

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
  const combinations = shortcuts[key].keys;
  if (Array.isArray(combinations[0])) {
    combinations.map((combination) => addShortcut(combination, callback));
  } else {
    addShortcut(combinations, callback);
  }
}

export function disableShortcut(key) {
  const combinations = shortcuts[key].keys;
  if (Array.isArray(combinations[0])) {
    combinations.map((combination) => removeShortcut(combination));
  } else {
    removeShortcut(combinations);
  }
}

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

export function addKeyBinding(combination, callback) {
  keybindings.push([combination, callback]);
}

export function removeKeyBinding(combination) {
  keybindings = keybindings.filter((keybinding) => !isEqual(keybinding[0], combination));
}

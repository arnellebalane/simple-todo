let keybindings = [];

export function initializeKeyBindings() {
  document.addEventListener('keydown', (event) => {
    for (const [check, callback] of keybindings) {
      if (check(event)) {
        callback();
        return;
      }
    }
  });
}

export function addKeyBinding(check, callback) {
  keybindings.push([check, callback]);
}

export function removeKeyBinding(check) {
  keybindings = keybindings.filter((keybinding) => keybinding[0] !== check);
}

import { writable } from 'svelte/store';
import { STORAGE_KEY_SETTINGS, THEME_SYSTEM } from '@lib/constants';

export const settings = writable({
  theme: THEME_SYSTEM,
});

settings.subscribe((value) => localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(value)));

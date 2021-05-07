import { writable } from 'svelte/store';
import { STORAGE_KEY_SETTINGS, THEME_SYSTEM } from '@lib/constants';

const cachedSettings = localStorage.getItem(STORAGE_KEY_SETTINGS);
const defaultSettings = {
  theme: THEME_SYSTEM,
};

export const settings = writable(cachedSettings ? JSON.parse(cachedSettings) : defaultSettings);

settings.subscribe((value) => localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(value)));

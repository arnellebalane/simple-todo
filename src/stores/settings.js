import { writable } from 'svelte/store';
import axios from '@lib/axios';
import { trackEvent } from '@lib/analytics';
import { STORAGE_KEY_SETTINGS, THEME_SYSTEM, COLOR_GREEN, BACKGROUND_REFRESH_DAILY } from '@lib/constants';

function createStore() {
  const cachedSettings = localStorage.getItem(STORAGE_KEY_SETTINGS);
  const defaultSettings = {
    theme: THEME_SYSTEM,
    color: COLOR_GREEN,
    background: false,
    backgroundRefreshFrequency: BACKGROUND_REFRESH_DAILY,
  };
  const settings = Object.assign({}, defaultSettings, cachedSettings && JSON.parse(cachedSettings));

  const { subscribe, set, update } = writable(settings);

  let settingsCache = null;

  function preview(data) {
    update((settings) => {
      settingsCache = settingsCache || settings;
      return { ...data, preview: true };
    });
  }

  function restore() {
    if (settingsCache) {
      set(settingsCache);
      settingsCache = null;
    }
  }

  function save(data) {
    set(data);
    settingsCache = null;
    saveInStorage(data);
  }

  function saveInStorage(data) {
    const settings = JSON.parse(localStorage.getItem(STORAGE_KEY_SETTINGS) || '{}');
    if (settings.theme !== data.theme) {
      trackEvent('settings', `theme-${data.theme}`);
    }
    if (settings.color !== data.color) {
      trackEvent('settings', `color-${data.color}`);
    }
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(data));
  }

  function getBackgroundImage() {
    const source = axios.CancelToken.source();
    const request = axios.get('/get-background-image', { cancelToken: source.token }).then((response) => {
      trackEvent('background', 'refresh');
      return response.data;
    });
    return { source, request };
  }

  return { subscribe, set, update, preview, restore, save, saveInStorage, getBackgroundImage };
}

export const settings = createStore();

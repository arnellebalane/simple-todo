import { writable } from 'svelte/store';
import cloneDeep from 'lodash/cloneDeep';
import pick from 'lodash/pick';

import axios from '@lib/axios';
import { trackEvent } from '@lib/umami';
import { STORAGE_KEY_SETTINGS, BACKGROUND_REFRESH_DAILY, BACKGROUND_AUTOMATIC } from '@lib/constants';
import { THEME_SYSTEM, COLOR_GREEN } from '@features/themes/constants';

function createStore() {
  const cachedSettings = localStorage.getItem(STORAGE_KEY_SETTINGS);
  const defaultSettings = {
    theme: THEME_SYSTEM,
    color: COLOR_GREEN,
    background: false,
    backgroundRefreshFrequency: BACKGROUND_REFRESH_DAILY,
    backgroundSource: BACKGROUND_AUTOMATIC,
    enablePrivacyMode: false,
    quickLinks: [],
    showFrequentLinks: false,
  };
  const settings = Object.assign({}, defaultSettings, cachedSettings && JSON.parse(cachedSettings));
  const allowedFields = [
    'background',
    'backgroundImage',
    'backgroundImageLastUpdate',
    'backgroundRefreshFrequency',
    'backgroundPreloaded',
    'backgroundSource',
    'enablePrivacyMode',
    'quickLinks',
    'showFrequentLinks',
    'color',
    'theme',
  ];

  const { subscribe, set, update } = writable(settings);

  let settingsCache = null;

  function preview(data) {
    update((settings) => {
      settingsCache = settingsCache || cloneDeep(settings);
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
    data = pick(data, allowedFields);
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
    if (
      data.background &&
      data.backgroundImage?.download_location &&
      data.backgroundImage?.id !== settings.backgroundImage?.id
    ) {
      axios.post('/report-unsplash-download', {
        download_location: data.backgroundImage.download_location,
      });
    }
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(data));
  }

  function getBackgroundImage(url) {
    const source = axios.CancelToken.source();
    const params = url ? { url } : {};
    const request = axios.get('/get-background-image', { params, cancelToken: source.token }).then((response) => {
      trackEvent('background', 'refresh');
      return response.data;
    });
    return { source, request };
  }

  function togglePrivacyMode() {
    update((settings) => {
      settings.enablePrivacyMode = !settings.enablePrivacyMode;
      if (!settings.preview) {
        save(settings);
      }
      return settings;
    });
  }

  return { subscribe, set, update, preview, restore, save, saveInStorage, getBackgroundImage, togglePrivacyMode };
}

export const settings = createStore();

import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import pick from 'lodash/pick';
import { writable } from 'svelte/store';

import { STORAGE_KEY_SETTINGS } from '@lib/constants';

import { settingsTabs } from './config';

function createStore() {
    const cachedSettings = localStorage.getItem(STORAGE_KEY_SETTINGS);
    const defaultSettings = settingsTabs.reduce((settings, tab) => {
        return typeof tab.getDefaultSettings === 'function'
            ? Object.assign(settings, tab.getDefaultSettings?.())
            : settings;
    }, {});
    const settings = Object.assign({}, defaultSettings, cachedSettings && JSON.parse(cachedSettings));
    const allowedFields = settingsTabs.map((tab) => get(tab, 'allowedFields', [])).flat();

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

    function saveKey(key, value) {
        update((settings) => {
            settings[key] = value;
            if (!settings.preview) {
                save(settings);
            }
            return settings;
        });
    }

    function saveInStorage(data) {
        const settings = JSON.parse(localStorage.getItem(STORAGE_KEY_SETTINGS) || '{}');
        settingsTabs.forEach((tab) => {
            if (typeof tab.onSave === 'function') {
                tab.onSave(settings, data);
            }
        });
        localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(data));
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

    return { subscribe, set, update, preview, restore, save, saveKey, saveInStorage, togglePrivacyMode };
}

export const settings = createStore();

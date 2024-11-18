import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { COLOR_GREEN, THEME_SYSTEM } from '@features/themes/constants';
import { STORAGE_KEY_SETTINGS } from '@lib/constants';

import { settings } from './store';

describe('settings store', () => {
    beforeEach(() => {
        settings.set({});
    });

    describe('settings.preview', () => {
        it('returns preview flag', () => {
            const settingsSpy = vi.fn();
            settings.subscribe(settingsSpy);

            const data = {
                theme: THEME_SYSTEM,
            };
            settings.preview(data);

            expect(settingsSpy).toHaveBeenCalledWith({ ...data, preview: true });
        });
    });

    describe('settings.restore', () => {
        it('restores original settings before preview', () => {
            const data = {
                theme: THEME_SYSTEM,
            };
            settings.preview(data);

            const settingsSpy = vi.fn();
            settings.subscribe(settingsSpy);

            settings.restore();

            expect(settingsSpy).toHaveBeenCalledWith({});
        });
    });

    describe('settings.save', () => {
        it('picks only allowed fields', () => {
            const settingsSpy = vi.fn();
            settings.subscribe(settingsSpy);

            const data = {
                theme: THEME_SYSTEM,
                unknown: 'UNKNOWN_VALUE',
            };
            settings.save(data);

            expect(settingsSpy).toHaveBeenCalledWith({
                theme: THEME_SYSTEM,
            });
        });
    });

    describe('settings.saveKey', () => {
        it('sets specified key in settings', () => {
            const data = {
                theme: THEME_SYSTEM,
            };
            settings.set(data);

            const settingsSpy = vi.fn();
            settings.subscribe(settingsSpy);

            settings.saveKey('color', COLOR_GREEN);

            expect(settingsSpy).toHaveBeenCalledWith({
                theme: THEME_SYSTEM,
                color: COLOR_GREEN,
            });
        });
    });

    describe('settings.saveInStorage', () => {
        afterEach(() => {
            localStorage.clear();
        });

        it('saves settings in localStorage', () => {
            const data = {
                theme: THEME_SYSTEM,
            };
            settings.saveInStorage(data);

            const storedSettings = localStorage.getItem(STORAGE_KEY_SETTINGS);
            const expectedSettings = JSON.stringify(data);

            expect(storedSettings).toEqual(expectedSettings);
        });
    });

    describe('settings.togglePrivacyMode', () => {
        it('toggles privacy mode value', () => {
            const data = {
                enablePrivacyMode: false,
            };
            settings.saveInStorage(data);

            const settingsSpy = vi.fn();
            settings.subscribe(settingsSpy);

            settings.togglePrivacyMode();

            expect(settingsSpy).toHaveBeenCalledWith({
                enablePrivacyMode: true,
            });
        });
    });
});

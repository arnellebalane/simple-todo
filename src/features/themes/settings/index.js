import ThemeSettings from './ThemeSettings.svelte';

import { trackEvent } from '@lib/umami';
import { COLOR_GREEN, THEME_SYSTEM } from '../constants';

export const id = 'THEME';
export const label = 'Theme';
export const component = ThemeSettings;

export const getDefaultSettings = () => ({
    theme: THEME_SYSTEM,
    color: COLOR_GREEN,
});
export const allowedFields = ['color', 'theme'];

export const onSave = (settings, updated) => {
    if (settings.theme !== updated.theme) {
        trackEvent('settings', `theme-${updated.theme}`);
    }
    if (settings.color !== updated.color) {
        trackEvent('settings', `color-${updated.color}`);
    }
};

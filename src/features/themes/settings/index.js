import { THEME_SYSTEM, COLOR_GREEN } from '../constants';
import ThemeSettings from './ThemeSettings.svelte';

export const id = 'THEME';
export const label = 'Theme';
export const component = ThemeSettings;

export const defaultSettings = {
  theme: THEME_SYSTEM,
  color: COLOR_GREEN,
};
export const allowedFields = ['color', 'theme'];

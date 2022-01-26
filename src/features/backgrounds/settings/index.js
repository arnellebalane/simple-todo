import { BACKGROUND_REFRESH_DAILY, BACKGROUND_AUTOMATIC } from '../constants';
import BackgroundSettings from './BackgroundSettings.svelte';

export const id = 'BACKGROUND';
export const label = 'Background';
export const component = BackgroundSettings;

export const defaultSettings = {
  background: false,
  backgroundRefreshFrequency: BACKGROUND_REFRESH_DAILY,
  backgroundSource: BACKGROUND_AUTOMATIC,
};
export const allowedFields = [
  'background',
  'backgroundImage',
  'backgroundImageLastUpdate',
  'backgroundRefreshFrequency',
  'backgroundPreloaded',
  'backgroundSource',
];

import axios from '@lib/axios';
import { BACKGROUND_REFRESH_DAILY, BACKGROUND_SOURCE_AUTOMATIC } from '../constants';
import BackgroundSettings from './BackgroundSettings.svelte';

export const id = 'BACKGROUND';
export const label = 'Background';
export const component = BackgroundSettings;

export const getDefaultSettings = () => ({
  background: false,
  backgroundRefreshFrequency: BACKGROUND_REFRESH_DAILY,
  backgroundSource: BACKGROUND_SOURCE_AUTOMATIC,
});
export const allowedFields = [
  'background',
  'backgroundImage',
  'backgroundImageLastUpdate',
  'backgroundRefreshFrequency',
  'backgroundPreloaded',
  'backgroundSource',
];

export const onSave = (settings, updated) => {
  if (
    updated.background &&
    updated.backgroundImage?.download_location &&
    updated.backgroundImage?.id !== settings.backgroundImage?.id
  ) {
    axios.post('/report-unsplash-download', {
      download_location: updated.backgroundImage.download_location,
    });
  }
};

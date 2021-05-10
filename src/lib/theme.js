import dayjs from 'dayjs';
import { decode } from 'blurhash';
import { settings } from '@stores/settings';
import axios from '@lib/axios';
import { BACKGROUND_REFRESH_DAILY, BACKGROUND_REFRESH_WEEKLY } from '@lib/constants';

function blurHashToDataUrl(blurhash) {
  const size = 32;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = size;
  canvas.height = size;

  const imageData = context.createImageData(size, size);
  imageData.data.set(decode(blurhash, size, size));
  context.putImageData(imageData, 0, 0);
  return canvas.toDataURL('image/jpg');
}

function renderBlurHash(backgroundImage) {
  const blurHashUrl = blurHashToDataUrl(backgroundImage.photo_blurhash);
  document.body.style.setProperty('--background-blurhash', `url(${blurHashUrl})`);
  document.body.dataset.background = backgroundImage.photo_blurhash;
  delete document.body.dataset.backgroundLoaded;
}

let currentRequest = null;

async function renderBackgroundImage(backgroundImage) {
  currentRequest?.cancel();
  currentRequest = axios.CancelToken.source();
  const response = await axios.get(backgroundImage.photo_url, {
    cancelToken: currentRequest.token,
    responseType: 'blob',
  });
  const photoUrl = URL.createObjectURL(response.data);
  document.body.style.backgroundImage = `url(${photoUrl})`;
  setTimeout(() => (document.body.dataset.backgroundLoaded = true), 100);
}

async function checkBackgroundImageUpdate(settingsData) {
  const { backgroundImageLastUpdate, backgroundRefreshFrequency } = settingsData;
  const now = dayjs();
  const lastUpdate = dayjs(backgroundImageLastUpdate);
  const daysSinceLastUpdate = now.diff(lastUpdate, 'day');

  let updateThresholdDays = Number.POSITIVE_INFINITY;
  if (backgroundRefreshFrequency === BACKGROUND_REFRESH_DAILY) {
    updateThresholdDays = 1;
  } else if (backgroundRefreshFrequency === BACKGROUND_REFRESH_WEEKLY) {
    updateThresholdDays = 7;
  }

  if (daysSinceLastUpdate >= updateThresholdDays) {
    const { request } = settings.getBackgroundImage();
    const backgroundImage = await request;
    const backgroundImageLastUpdate = Date.now();
    settings.saveInStorage({ ...settingsData, backgroundImage, backgroundImageLastUpdate });
  }
}

export function watchTheme() {
  settings.subscribe((settingsData) => {
    const { theme, color, background, backgroundImage } = settingsData;
    document.body.dataset.theme = theme;
    document.body.dataset.color = color;

    if (background && backgroundImage) {
      if (backgroundImage.photo_blurhash !== document.body.dataset.background) {
        renderBlurHash(backgroundImage);
        renderBackgroundImage(backgroundImage);
        checkBackgroundImageUpdate(settingsData);
      }
    } else {
      delete document.body.dataset.background;
      document.body.style.backgroundImage = '';
    }
  });
}
import dayjs from 'dayjs';
import { decode } from 'blurhash';

import axios from '@lib/axios';
import { settings } from '@features/settings/store';
import { backgrounds } from './store';
import { BACKGROUND_REFRESH_DAILY, BACKGROUND_REFRESH_WEEKLY } from './constants';
import './styles.css';

function isValidBlurHash(blurhash) {
  return blurhash ? blurhash.length ?? 0 >= 6 : false;
}

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

function renderBlurHash(blurhash) {
  const blurHashUrl = blurHashToDataUrl(blurhash);
  document.body.style.setProperty('--background-blurhash', `url(${blurHashUrl})`);
  document.body.dataset.background = blurhash;
  delete document.body.dataset.backgroundLoaded;
}

function removeBlurHash() {
  document.body.style.removeProperty('--background-blurhash');
  delete document.body.dataset.background;
}

// We keep a reference to any ongoing request so that we can abort it later on.
let currentRequest = null;

async function downloadBackgroundImage(imageUrl) {
  currentRequest?.cancel();
  currentRequest = axios.CancelToken.source();
  const response = await axios.get(imageUrl, {
    cancelToken: currentRequest.token,
    responseType: 'blob',
  });
  return URL.createObjectURL(response.data);
}

async function renderBackgroundImage(imageUrl) {
  try {
    const photoUrl = imageUrl.startsWith('data:') ? imageUrl : await downloadBackgroundImage(imageUrl);
    document.body.style.backgroundImage = `url(${photoUrl})`;
    setTimeout(() => (document.body.dataset.backgroundLoaded = true), 100);
  } catch (error) {
    console.error(error);
  }
}

function removeBackgroundImage() {
  currentRequest?.cancel();
  document.body.style.backgroundImage = '';
  delete document.body.dataset.backgroundLoaded;
}

function shouldUpdateBackgroundImage(settingsData) {
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

  return daysSinceLastUpdate >= updateThresholdDays;
}

async function maybeUpdateBackgroundImage(settingsData) {
  if (shouldUpdateBackgroundImage(settingsData)) {
    const { request } = backgrounds.getBackgroundImage();
    try {
      const backgroundImage = await request;
      const backgroundImageLastUpdate = Date.now();
      settings.saveInStorage({
        ...settingsData,
        backgroundImage,
        backgroundImageLastUpdate,
        backgroundPreloaded: false,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

async function maybeLoadBetterBackgroundImage(settingsData) {
  const { backgroundImage, backgroundPreloaded, preview } = settingsData;

  // We load a better background image if
  //   - we are not in settings preview mode (settings form is already saved)
  //   - a full image URL is available and we haven't preloaded it yet
  //   - the device is not in data saver mode
  const shouldLoadBetterImage =
    !preview && backgroundImage.photo_url_full && !backgroundPreloaded && !navigator.connection?.saveData;

  if (shouldLoadBetterImage) {
    try {
      await downloadBackgroundImage(backgroundImage.photo_url_full);
      settings.save({ ...settingsData, backgroundPreloaded: true });
    } catch (error) {
      console.error(error);
    }
  }
}

export function initializeBackgrounds() {
  settings.subscribe(async (settingsData) => {
    const { background, backgroundImage, backgroundPreloaded } = settingsData;

    if (background && backgroundImage) {
      if (backgroundImage.photo_url.startsWith('data:')) {
        document.body.dataset.background = 'custom';
      }
      if (backgroundImage.photo_blurhash !== document.body.dataset.background) {
        if (isValidBlurHash(backgroundImage.photo_blurhash)) {
          renderBlurHash(backgroundImage.photo_blurhash);
        }

        // If the background has been preloaded, it's hopefully already in the
        // browser cache, so we load the higher-resolution image. Otherwise we
        // load a smaller compressed image.
        const photoUrl = backgroundPreloaded ? backgroundImage.photo_url_full : backgroundImage.photo_url;
        await renderBackgroundImage(photoUrl);
      }

      await maybeLoadBetterBackgroundImage(settingsData);
      await maybeUpdateBackgroundImage(settingsData);
    } else {
      removeBlurHash();
      removeBackgroundImage();
    }
  });
}

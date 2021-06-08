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
  const photoUrl = imageUrl.startsWith('data:') ? imageUrl : await downloadBackgroundImage(imageUrl);
  document.body.style.backgroundImage = `url(${photoUrl})`;
  setTimeout(() => (document.body.dataset.backgroundLoaded = true), 100);
}

function removeBackgroundImage() {
  currentRequest?.cancel();
  document.body.style.backgroundImage = '';
  delete document.body.dataset.backgroundLoaded;
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
    settings.saveInStorage({
      ...settingsData,
      backgroundImage,
      backgroundImageLastUpdate,
      backgroundPreloaded: false,
    });
  }
}

async function lazyLoadExternalStyles() {
  const stylesheets = [...document.querySelectorAll('link[media="print"]')];
  await Promise.all(
    stylesheets.map(
      (stylesheet) =>
        new Promise((resolve) => {
          if ([...document.styleSheets].includes(stylesheet.sheet)) {
            stylesheet.media = 'all';
            return resolve();
          }

          stylesheet.addEventListener('load', () => {
            stylesheet.media = 'all';
            resolve();
          });
        })
    )
  );
  document.body.classList.remove('fonts-loading');
}

export function initializeTheme() {
  lazyLoadExternalStyles();

  settings.subscribe(async (settingsData) => {
    const { theme, color, background, backgroundImage, backgroundPreloaded, preview } = settingsData;
    document.body.dataset.theme = theme;
    document.body.dataset.color = color;

    if (background && backgroundImage) {
      if (backgroundImage.photo_url.startsWith('data:')) {
        document.body.dataset.background = 'custom';
      }
      if (backgroundImage.photo_blurhash !== document.body.dataset.background) {
        if (backgroundImage.photo_blurhash?.length ?? 0 >= 6) {
          renderBlurHash(backgroundImage.photo_blurhash);
        }
        await renderBackgroundImage(backgroundPreloaded ? backgroundImage.photo_url_full : backgroundImage.photo_url);
      }

      const shouldLoadBetterImage =
        backgroundImage.photo_url_full && !preview && !backgroundPreloaded && !navigator.connection?.saveData;
      if (shouldLoadBetterImage) {
        await downloadBackgroundImage(backgroundImage.photo_url_full);
        settings.save({ ...settingsData, backgroundPreloaded: true });
      }

      await checkBackgroundImageUpdate(settingsData);
    } else {
      removeBlurHash();
      removeBackgroundImage();
    }
  });
}

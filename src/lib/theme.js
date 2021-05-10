import { decode } from 'blurhash';
import { settings } from '@stores/settings';
import axios from '@lib/axios';

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

let currentRequest = null;

export function watchTheme() {
  settings.subscribe(async ({ theme, color, background, backgroundImage }) => {
    document.body.dataset.theme = theme;
    document.body.dataset.color = color;

    if (background && backgroundImage) {
      if (backgroundImage.photo_blurhash !== document.body.dataset.background) {
        const blurHashUrl = blurHashToDataUrl(backgroundImage.photo_blurhash);
        document.body.style.setProperty('--background-blurhash', `url(${blurHashUrl})`);
        document.body.dataset.background = backgroundImage.photo_blurhash;
        delete document.body.dataset.backgroundLoaded;

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
    } else {
      delete document.body.dataset.background;
      document.body.style.backgroundImage = '';
    }
  });
}

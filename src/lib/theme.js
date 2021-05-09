import { settings } from '@stores/settings';

export function watchTheme() {
  settings.subscribe(({ theme, color, background, backgroundImage }) => {
    document.body.dataset.theme = theme;
    document.body.dataset.color = color;
    document.body.style.backgroundImage = backgroundImage ? `url(${backgroundImage.photo_url})` : '';

    if (background) {
      document.body.dataset.background = background;
    } else {
      delete document.body.dataset.background;
    }
  });
}

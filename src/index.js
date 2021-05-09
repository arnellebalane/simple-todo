import App from './App.svelte';
import { settings } from '@stores/settings';
import '@styles/index.css';
import '@styles/theme.css';

settings.subscribe(({ theme, color, background, backgroundImage }) => {
  document.body.dataset.theme = theme;
  document.body.dataset.color = color;

  if (background) {
    document.body.dataset.background = background;
    document.body.style.backgroundImage = `url(${backgroundImage.photo_url})`;
  } else {
    delete document.body.dataset.background;
    document.body.style.backgroundImage = '';
  }
});

const app = new App({
  target: document.body,
});

export default app;

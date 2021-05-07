import App from './App.svelte';
import { settings } from '@stores/settings';
import '@styles/index.css';
import '@styles/theme.css';

settings.subscribe(({ theme, color }) => {
  document.body.dataset.theme = theme;
  document.body.dataset.color = color;
});

const app = new App({
  target: document.body,
});

export default app;

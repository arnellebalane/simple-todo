import App from './App.svelte';
import { initializeTheme } from '@lib/theme.js';
import '@styles/index.css';
import '@styles/theme.css';

initializeTheme();

const app = new App({
  target: document.body,
});

export default app;

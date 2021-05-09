import App from './App.svelte';
import { watchTheme } from '@lib/theme.js';
import '@styles/index.css';
import '@styles/theme.css';

watchTheme();

const app = new App({
  target: document.body,
});

export default app;

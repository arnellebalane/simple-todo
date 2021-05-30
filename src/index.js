import App from './App.svelte';
import { initializeSentry } from '@lib/sentry.js';
import { initializeTheme } from '@lib/theme.js';
import { initializeKeyBindings } from '@lib/shortcuts.js';
import '@styles/index.css';
import '@styles/theme.css';

initializeSentry();
initializeTheme();
initializeKeyBindings();

const app = new App({
  target: document.body,
});

export default app;

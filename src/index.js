import App from './App.svelte';
import { initializeSentry } from '@lib/sentry';
import { initializeTheme } from '@lib/theme';
import { initializeKeyBindings } from '@features/shortcuts';
import '@styles/index.css';
import '@styles/theme.css';

initializeSentry();
initializeTheme();
initializeKeyBindings();

const app = new App({
  target: document.body,
});

export default app;

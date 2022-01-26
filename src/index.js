import App from './App.svelte';
import { initializeSentry } from '@lib/sentry';
import { initializeThemes } from '@features/themes';
import { initializeKeyBindings } from '@features/shortcuts';
import '@styles/index.css';

initializeSentry();
initializeThemes();
initializeKeyBindings();

const app = new App({
  target: document.body,
});

export default app;

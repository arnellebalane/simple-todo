import App from '@app/App.svelte';

import { initializeBackgrounds } from '@features/backgrounds';
import { initializeKeyBindings } from '@features/shortcuts';
import { initializeThemes } from '@features/themes';
import { initializeTodos } from '@features/todos';
import { initializeSentry } from '@lib/sentry';

import '@app/app.css';

initializeSentry();
initializeThemes();
initializeBackgrounds();
initializeKeyBindings();
initializeTodos();

const app = new App({
    target: document.body,
});

export default app;

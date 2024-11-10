import path from 'path';
import { defineConfig } from 'vite';
import jsConfigPaths from 'vite-jsconfig-paths';

import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
    plugins: [svelte(), jsConfigPaths()],

    base: './',

    build: {
        outDir: path.join(__dirname, 'build'),
        assetsInlineLimit: 0,
    },

    define: {
        __APP_VERSION__: JSON.stringify(require('./package.json').version),
    },

    // https://github.com/cypress-io/cypress/issues/22557#issuecomment-1229654837
    optimizeDeps: {
        include: ['@sentry/browser'],
    },

    server: {
        port: 8080,
    },
});

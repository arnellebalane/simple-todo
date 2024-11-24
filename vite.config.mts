import path from 'path';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { svelteTesting } from '@testing-library/svelte/vite';
import { defineConfig } from 'vite';
import jsConfigPaths from 'vite-jsconfig-paths';

export default defineConfig({
    plugins: [svelte(), jsConfigPaths(), svelteTesting()],

    base: './',

    build: {
        outDir: path.join(__dirname, 'build'),
        assetsInlineLimit: 0,
    },

    test: {
        environment: 'jsdom',
        setupFiles: ['./test/setup.js'],
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

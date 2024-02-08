import path from 'path';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
    plugins: [svelte()],

    base: './',

    build: {
        outDir: path.join(__dirname, 'build'),
        assetsInlineLimit: 0,
    },

    resolve: {
        alias: {
            '@app': path.resolve(__dirname, 'src/app'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@features': path.resolve(__dirname, 'src/features'),
            '@lib': path.resolve(__dirname, 'src/lib'),
        },
    },

    define: {
        __APP_VERSION__: JSON.stringify(require('./package.json').version),
    },

    // https://github.com/cypress-io/cypress/issues/22557#issuecomment-1229654837
    optimizeDeps: {
        include: ['@sentry/browser', '@sentry/integrations', '@sentry/tracing'],
    },

    server: {
        port: 8080,
    },
});

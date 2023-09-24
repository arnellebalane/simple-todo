import path from 'path';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
    plugins: [svelte()],

    build: {
        assetsInlineLimit: 0,
    },

    resolve: {
        alias: {
            '@app': path.resolve(__dirname, 'src/app'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@features': path.resolve(__dirname, 'src/features'),
            '@lib': path.resolve(__dirname, 'src/lib'),
            '@stores': path.resolve(__dirname, 'src/stores'),
            '@styles': path.resolve(__dirname, 'src/styles'),
        },
    },

    define: {
        __APP_VERSION__: JSON.stringify(require('./package.json').version),
    },

    server: {
        port: 8080,
    },
});

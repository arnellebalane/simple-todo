const { defineConfig } = require('cypress');

module.exports = defineConfig({
    viewportWidth: 1920,
    viewportHeight: 1080,
    component: {
        specPattern: 'src/**/*.spec.js',
        devServer: {
            framework: 'svelte',
            bundler: 'vite',
        },
    },
});

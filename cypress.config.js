const { defineConfig } = require('cypress');

module.exports = defineConfig({
    component: {
        specPattern: 'src/**/*.spec.js',
        devServer: {
            framework: 'svelte',
            bundler: 'vite',
        },
    },
});

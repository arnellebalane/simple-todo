require('dotenv').config();
const { defineConfig } = require('cypress');
const vite = require('cypress-vite');

module.exports = defineConfig({
    projectId: 'dkoa9n',

    viewportWidth: 1920,
    viewportHeight: 1080,

    component: {
        specPattern: 'src/**/*.spec.js',
        devServer: {
            framework: 'svelte',
            bundler: 'vite',
        },
    },

    e2e: {
        specPattern: 'cypress/integration/**/*.spec.js',

        setupNodeEvents(on, config) {
            config.env = {
                ...config.env,
                APP_TESTING_ENDPOINT: process.env.APP_TESTING_ENDPOINT,
            };

            if (!config.env.APP_TESTING_ENDPOINT) {
                throw new Error('APP_TESTING_ENDPOINT variable is not defined.');
            }

            on('file:preprocessor', vite());

            return config;
        },
    },
});

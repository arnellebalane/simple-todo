const Sentry = require('@sentry/node');

Sentry.init({
    dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
    environment: process.env.FUNCTIONS_SENTRY_ENVIRONMENT || 'functions:development',
});

const Sentry = require('@sentry/node');
const { CaptureConsole } = require('@sentry/integrations');

Sentry.init({
  dsn: process.env.SNOWPACK_PUBLIC_SENTRY_DSN,
  environment: process.env.FUNCTIONS_SENTRY_ENVIRONMENT || 'functions:development',
  integrations: [
    new CaptureConsole({
      levels: ['error', 'warn'],
    }),
  ],
});

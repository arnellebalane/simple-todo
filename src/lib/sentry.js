import * as Sentry from '@sentry/browser';
import { CaptureConsole } from '@sentry/integrations';
import { Integrations } from '@sentry/tracing';

export function initializeSentry() {
  if (import.meta.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: import.meta.env.SNOWPACK_PUBLIC_SENTRY_DSN,
      environment: import.meta.env.SNOWPACK_PUBLIC_SENTRY_ENVIRONMENT || 'development',
      integrations: [
        new CaptureConsole({
          levels: ['error', 'warn'],
        }),
        new Integrations.BrowserTracing(),
      ],
      tracesSampleRate: 1,
    });
  }
}

import * as Sentry from '@sentry/browser';
import { Integrations } from '@sentry/tracing';

export function initializeSentry() {
  if (import.meta.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: import.meta.env.SNOWPACK_PUBLIC_SENTRY_DSN,
      environment: import.meta.env.SNOWPACK_PUBLIC_SENTRY_ENVIRONMENT,
      integrations: [new Integrations.BrowserTracing()],
      tracesSampleRate: 1,
    });
  }
}

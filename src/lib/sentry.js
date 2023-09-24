import * as Sentry from '@sentry/browser';
import { CaptureConsole } from '@sentry/integrations';
import { Integrations } from '@sentry/tracing';
import { APP_VERSION } from '@lib/constants';

const ignoredErrorMessages = ['Error: Network Error'];

export function initializeSentry() {
    if (import.meta.env.NODE_ENV === 'production') {
        Sentry.init({
            dsn: import.meta.env.VITE_PUBLIC_SENTRY_DSN,
            release: APP_VERSION,
            environment: import.meta.env.VITE_PUBLIC_SENTRY_ENVIRONMENT || 'web:development',
            integrations: [
                new CaptureConsole({
                    levels: ['error', 'warn'],
                }),
                new Integrations.BrowserTracing(),
            ],
            tracesSampleRate: 0.001,
            beforeSend(event) {
                if (ignoredErrorMessages.includes(event.message)) {
                    return null;
                }
                return event;
            },
        });
    }
}

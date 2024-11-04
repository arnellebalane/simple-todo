import { config } from '@lib/config';
import { APP_VERSION } from '@lib/constants';
import * as Sentry from '@sentry/browser';

const ignoredErrorMessages = ['Error: Network Error'];

export function initializeSentry() {
    if (config.MODE === 'production') {
        Sentry.init({
            dsn: config.VITE_PUBLIC_SENTRY_DSN,
            release: APP_VERSION,
            environment: config.VITE_PUBLIC_SENTRY_ENVIRONMENT || 'web:development',
            integrations: [
                Sentry.captureConsoleIntegration({
                    levels: ['error', 'warn'],
                }),
                Sentry.browserTracingIntegration(),
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

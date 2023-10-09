import * as Sentry from '@sentry/browser';
import { CaptureConsole } from '@sentry/integrations';
import { Integrations } from '@sentry/tracing';
import { APP_VERSION } from '@lib/constants';
import { config } from '@lib/config';

const ignoredErrorMessages = ['Error: Network Error'];

export function initializeSentry() {
    if (config.MODE === 'production') {
        Sentry.init({
            dsn: config.VITE_PUBLIC_SENTRY_DSN,
            release: APP_VERSION,
            environment: config.VITE_PUBLIC_SENTRY_ENVIRONMENT || 'web:development',
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

export const getConfig = () => {
    return {
        MODE: import.meta.env.MODE,
        VITE_PUBLIC_IS_WEB_BUILD: import.meta.env.VITE_PUBLIC_IS_WEB_BUILD,
        VITE_PUBLIC_FUNCTIONS_URL: import.meta.env.VITE_PUBLIC_FUNCTIONS_URL,
        VITE_PUBLIC_SENTRY_DSN: import.meta.env.VITE_PUBLIC_SENTRY_DSN,
        VITE_PUBLIC_SENTRY_ENVIRONMENT: import.meta.env.VITE_PUBLIC_SENTRY_ENVIRONMENT,
    };
};

export const config = getConfig();

export function trackEvent(type, value) {
  if (window.umami && typeof window.umami.trackEvent === 'function') {
    umami.trackEvent(value, type);
  }
}

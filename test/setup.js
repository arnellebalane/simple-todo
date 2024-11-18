import '@testing-library/jest-dom/vitest';
import 'vitest-canvas-mock';

import { vi } from 'vitest';

import changeLogs from '@cypress/fixtures/changelogs.json';
import quickLinks from '@cypress/fixtures/quicklinks.json';
import backgroundImage from '@cypress/fixtures/unsplash-image.json';
import axios from '@lib/axios';

import { customImageDataUrl } from './constants';

Object.defineProperty(window.URL, 'createObjectURL', {
    value: () => customImageDataUrl,
});

vi.spyOn(axios, 'get').mockImplementation((url) => {
    switch (url) {
        case '/get-version-changelog':
            return Promise.resolve({ data: changeLogs });
        case '/get-background-image':
            return Promise.resolve({ data: backgroundImage });
        case '/get-quick-link-details':
            return Promise.resolve({ data: quickLinks[0] });
        default:
            return Promise.resolve({ data: null });
    }
});

vi.spyOn(axios, 'post').mockImplementation(() => {
    return Promise.resolve({ data: null });
});

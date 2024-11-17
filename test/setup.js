import '@testing-library/jest-dom/vitest';
import 'vitest-canvas-mock';

import { vi } from 'vitest';

import changeLogs from '@cypress/fixtures/changelogs.json';
import axios from '@lib/axios';

import { customImageDataUrl } from './constants';

Object.defineProperty(window.URL, 'createObjectURL', {
    value: () => customImageDataUrl,
});

vi.spyOn(axios, 'get').mockImplementation((url) => {
    switch (url) {
        case '/get-version-changelog':
            return Promise.resolve({ data: changeLogs });
        default:
            return Promise.resolve({ data: null });
    }
});

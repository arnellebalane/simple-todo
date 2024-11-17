import '@testing-library/jest-dom/vitest';
import 'vitest-canvas-mock';

import { customImageDataUrl } from './constants';

Object.defineProperty(window.URL, 'createObjectURL', {
    value: () => customImageDataUrl,
});

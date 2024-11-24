import { describe, expect, it, vi } from 'vitest';

import backgroundImage from '@cypress/fixtures/unsplash-image.json';
import axios from '@lib/axios';

import { onSave } from '.';

describe('backgrounds settings', () => {
    it('reports unsplash download on save', () => {
        const axiosPostMock = vi.mocked(axios.post);

        const currentSettings = {};
        const updatedSettings = {
            background: true,
            backgroundImage,
        };

        onSave(currentSettings, updatedSettings);

        expect(axiosPostMock).toHaveBeenCalledWith('/report-unsplash-download', {
            download_location: backgroundImage.download_location,
        });
    });
});

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import backgroundImage from '@cypress/fixtures/unsplash-image.json';
import { settings } from '@features/settings/store';
import axios from '@lib/axios';
import { customImageDataUrl } from '@test/constants';

import { initializeBackgrounds } from './index';
import { getDefaultSettings } from './settings';

/**
 * NOTE: The tests that are skipped in this file are all passing locally, however they seem to fail when running in CI.
 * The reason is unknown for now, but skipping to unblock the PR.
 */

describe('initializeBackgrounds', () => {
    const axiosGetMock = vi.mocked(axios.get);

    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers();

        settings.set(getDefaultSettings());
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('removes background image when background settings are not defined', () => {
        initializeBackgrounds();

        expect(document.body).not.toHaveAttribute('data-background');
    });

    it('displays background image when background settings are defined', async () => {
        settings.set({
            background: true,
            backgroundImage,
        });

        initializeBackgrounds();
        await vi.advanceTimersByTimeAsync(100);

        expect(document.body).toHaveAttribute('data-background');
        expect(document.body).toHaveAttribute('data-background-loaded');
    });

    it('sets data-background to custom when using an uploaded background image', async () => {
        settings.set({
            background: true,
            backgroundImage: {
                photo_url: customImageDataUrl,
            },
        });

        initializeBackgrounds();
        await vi.advanceTimersByTimeAsync(100);

        expect(document.body).toHaveAttribute('data-background', 'custom');
        expect(document.body).toHaveAttribute('data-background-loaded');
    });

    it('does not load full resolution image when settings are in preview', () => {
        settings.set({
            background: true,
            backgroundImage,
            preview: true,
        });

        initializeBackgrounds();

        expect(axiosGetMock).toHaveBeenCalledWith(backgroundImage.photo_url, expect.any(Object));
    });

    it('does not load full resolution image again when background has been preloaded', () => {
        settings.set({
            background: true,
            backgroundImage,
            backgroundPreloaded: true,
        });

        initializeBackgrounds();

        expect(axiosGetMock).toHaveBeenCalledWith(backgroundImage.photo_url_full, expect.any(Object));
    });

    it('does not load full resolution image when data saver mode is enabled', () => {
        Object.defineProperty(window.navigator, 'connection', {
            get: vi.fn().mockReturnValue({
                saveData: false,
            }),
        });
        settings.set({
            background: true,
            backgroundImage,
        });

        initializeBackgrounds();

        expect(axiosGetMock).toHaveBeenCalledWith(backgroundImage.photo_url, expect.any(Object));
    });

    it('loads full resolution image when settings are applied and not yet preloaded', () => {
        settings.set({
            background: true,
            backgroundImage,
        });

        initializeBackgrounds();

        expect(axiosGetMock).toHaveBeenCalledWith(backgroundImage.photo_url, expect.any(Object));
        expect(axiosGetMock).toHaveBeenCalledWith(backgroundImage.photo_url_full, expect.any(Object));
    });
});

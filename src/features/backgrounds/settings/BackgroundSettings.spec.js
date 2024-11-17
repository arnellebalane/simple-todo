import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import backgroundImage from '@cypress/fixtures/unsplash-image.json';
import {
    BACKGROUND_REFRESH_DAILY,
    BACKGROUND_REFRESH_MANUALLY,
    BACKGROUND_SOURCE_AUTOMATIC,
    BACKGROUND_SOURCE_CUSTOM,
} from '../constants';
import { backgrounds } from '../store';

import { component as BackgroundSettings } from '.';

describe('BackgroundSettings', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        vi.spyOn(backgrounds, 'getBackgroundImage').mockReturnValue({
            request: Promise.resolve(backgroundImage),
        });
    });

    it('deselects background switch and hides background source selector when data.background prop is false', () => {
        render(BackgroundSettings, {
            props: {
                data: {
                    background: false,
                },
            },
        });

        expect(screen.getByTestId('toggle-background')).not.toBeChecked();
        expect(screen.queryByTestId('background-source-selector')).not.toBeInTheDocument();
    });

    it('selects background switch and displays background source selector when data.background prop is true', () => {
        render(BackgroundSettings, {
            props: {
                data: {
                    background: true,
                },
            },
        });

        expect(screen.getByTestId('toggle-background')).toBeChecked();
        expect(screen.getByTestId('background-source-selector')).toBeInTheDocument();
    });

    it('displays automatic source fieldset when background source is automatic', () => {
        render(BackgroundSettings, {
            props: {
                data: {
                    background: true,
                    backgroundSource: BACKGROUND_SOURCE_AUTOMATIC,
                },
            },
        });

        expect(screen.getByTestId('automatic-source-fieldset')).toBeInTheDocument();
        expect(screen.queryByTestId('custom-source-image-url-field')).not.toBeInTheDocument();
        expect(screen.queryByTestId('custom-source-image-upload-field')).not.toBeInTheDocument();
    });

    it('displays custom source fieldset when background source is manual', () => {
        render(BackgroundSettings, {
            props: {
                data: {
                    background: true,
                    backgroundSource: BACKGROUND_SOURCE_CUSTOM,
                },
            },
        });

        expect(screen.queryByTestId('automatic-source-fieldset')).not.toBeInTheDocument();
        expect(screen.getByTestId('custom-source-image-url-field')).toBeInTheDocument();
        expect(screen.getByTestId('custom-source-image-upload-field')).toBeInTheDocument();
    });

    it('calls "onChange" and resets data when background is disabled', async () => {
        const onChange = vi.fn();

        render(BackgroundSettings, {
            props: {
                data: {
                    background: true,
                },
                onChange,
            },
        });
        await userEvent.click(screen.getByTestId('toggle-background'));

        expect(onChange).toHaveBeenCalledWith({
            background: false,
            backgroundRefreshFrequency: BACKGROUND_REFRESH_DAILY,
            backgroundSource: BACKGROUND_SOURCE_AUTOMATIC,
        });
    });

    it('calls "onChange" on change in automatic source fieldset data', async () => {
        const onChange = vi.fn();
        const now = new Date(2023, 0, 1);
        vi.setSystemTime(now);

        render(BackgroundSettings, {
            props: {
                data: {
                    background: true,
                    backgroundSource: BACKGROUND_SOURCE_AUTOMATIC,
                },
                onChange,
            },
        });

        // NOTE: The automatic background field is supposed to get a background
        // image on mount but for some reason the mock function does not
        // register the call even if it got executed, so clicking the refresh
        // button instead to trigger another background image call
        await userEvent.click(screen.getByTestId('refresh-background-btn'));

        expect(onChange).toHaveBeenCalledWith({
            background: true,
            backgroundImage,
            backgroundImageLastUpdate: now.valueOf(),
            backgroundSource: BACKGROUND_SOURCE_AUTOMATIC,
        });
    });

    it('calls "onChange" on change in custom source fieldset data', async () => {
        const onChange = vi.fn();
        const now = new Date(2023, 0, 1);
        vi.setSystemTime(now);

        render(BackgroundSettings, {
            props: {
                data: {
                    background: true,
                    backgroundSource: BACKGROUND_SOURCE_CUSTOM,
                },
                onChange,
            },
        });
        await userEvent.type(screen.getByTestId('image-url-field-input'), backgroundImage.photo_url);
        await userEvent.click(screen.getByTestId('image-url-field-button'));

        expect(onChange).toHaveBeenCalledWith({
            background: true,
            backgroundImage,
            backgroundImageLastUpdate: now.valueOf(),
            backgroundSource: BACKGROUND_SOURCE_CUSTOM,
            backgroundRefreshFrequency: BACKGROUND_REFRESH_MANUALLY,
        });
    });
});

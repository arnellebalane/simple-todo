import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import AutomaticSourceFieldSet from './AutomaticSourceFieldSet.svelte';

import backgroundImage from '@cypress/fixtures/unsplash-image.json';
import { BACKGROUND_REFRESH_DAILY, BACKGROUND_REFRESH_WEEKLY, BACKGROUND_SOURCE_AUTOMATIC } from '../constants';
import { backgrounds } from '../store';

describe('AutomaticSourceFieldSet', () => {
    const source = { token: '' };

    beforeEach(() => {
        vi.resetAllMocks();

        vi.spyOn(backgrounds, 'getBackgroundImage').mockReturnValue({
            request: Promise.resolve(backgroundImage),
            source,
        });
    });

    it('disables refresh button when disabled prop is true', () => {
        render(AutomaticSourceFieldSet, {
            props: {
                disabled: true,
            },
        });

        expect(screen.getByTestId('refresh-background-btn')).toBeDisabled();
    });

    it('enables refresh button when disabled prop is false', () => {
        render(AutomaticSourceFieldSet, {
            props: {
                disabled: false,
            },
        });

        expect(screen.getByTestId('refresh-background-btn')).toBeEnabled();
    });

    it('selects refresh frequency selector value based on data prop', () => {
        render(AutomaticSourceFieldSet, {
            props: {
                data: {
                    backgroundRefreshFrequency: BACKGROUND_REFRESH_WEEKLY,
                },
            },
        });

        expect(screen.getByRole('radio', { name: 'Weekly' })).toBeChecked();
    });

    it('loads new background image when data has no backgroundImage', () => {
        const getBackgroundImage = vi.spyOn(backgrounds, 'getBackgroundImage');

        render(AutomaticSourceFieldSet, {
            props: {
                data: {
                    backgroundRefreshFrequency: BACKGROUND_REFRESH_WEEKLY,
                },
            },
        });

        expect(getBackgroundImage).toHaveBeenCalled();
    });

    it('calls "onChange" when refresh frequency value changes', async () => {
        const onChange = vi.fn();

        render(AutomaticSourceFieldSet, {
            props: {
                data: {
                    backgroundImage,
                    backgroundRefreshFrequency: BACKGROUND_REFRESH_WEEKLY,
                },
                onChange,
            },
        });
        await userEvent.click(screen.getByRole('radio', { name: 'Daily' }));

        expect(onChange).toHaveBeenCalledWith({
            backgroundImage,
            backgroundRefreshFrequency: BACKGROUND_REFRESH_DAILY,
            backgroundSource: BACKGROUND_SOURCE_AUTOMATIC,
        });
    });

    it('calls "onChange" when refresh button is clicked after background image is loaded', async () => {
        const onChange = vi.fn();
        const now = new Date(2023, 0, 1);
        vi.setSystemTime(now);

        render(AutomaticSourceFieldSet, {
            props: {
                data: {
                    backgroundRefreshFrequency: BACKGROUND_REFRESH_WEEKLY,
                },
                onChange,
            },
        });
        await userEvent.click(screen.getByTestId('refresh-background-btn'));

        expect(onChange).toHaveBeenCalledWith({
            backgroundImage,
            backgroundImageLastUpdate: now.valueOf(),
            backgroundRefreshFrequency: BACKGROUND_REFRESH_WEEKLY,
            backgroundSource: BACKGROUND_SOURCE_AUTOMATIC,
        });
    });

    it('calls "onRequest" when refresh button is clicked', async () => {
        const onRequest = vi.fn();

        render(AutomaticSourceFieldSet, {
            props: {
                data: {
                    backgroundImage,
                    backgroundRefreshFrequency: BACKGROUND_REFRESH_WEEKLY,
                },
                onRequest,
            },
        });
        await userEvent.click(screen.getByTestId('refresh-background-btn'));

        expect(onRequest).toHaveBeenCalledWith(source);
    });
});

import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import CustomSourceFieldSet from './CustomSourceFieldSet.svelte';

import backgroundImage from '@cypress/fixtures/unsplash-image.json';
import { BACKGROUND_REFRESH_MANUALLY, BACKGROUND_SOURCE_CUSTOM } from '../constants';

describe('CustomSourceFieldSet', () => {
    it('disables image url and upload fields when disabled prop is true', () => {
        render(CustomSourceFieldSet, {
            props: {
                disabled: true,
            },
        });

        expect(screen.getByTestId('image-url-field-input')).toBeDisabled();
        expect(screen.getByTestId('image-upload-field-input')).toBeDisabled();
    });

    it('enables image url and upload fields when disabled prop is false', () => {
        render(CustomSourceFieldSet, {
            props: {
                disabled: false,
            },
        });

        expect(screen.getByTestId('image-url-field-input')).toBeEnabled();
        expect(screen.getByTestId('image-upload-field-input')).toBeEnabled();
    });

    it('calls "onChange" when custom image url is specified', async () => {
        const onChange = vi.fn();
        const data = {};
        const now = new Date(2023, 0, 1);
        vi.setSystemTime(now);

        render(CustomSourceFieldSet, {
            props: {
                data,
                onChange,
            },
        });
        await userEvent.type(screen.getByTestId('image-url-field-input'), backgroundImage.photo_link);
        await userEvent.click(screen.getByTestId('image-url-field-button'));

        expect(onChange).toHaveBeenCalledWith({
            backgroundImage,
            backgroundImageLastUpdate: now.valueOf(),
            backgroundSource: BACKGROUND_SOURCE_CUSTOM,
            backgroundRefreshFrequency: BACKGROUND_REFRESH_MANUALLY,
        });
    });

    it('calls "onChange" when custom image is uploaded', async () => {
        const onChange = vi.fn();
        const data = {};
        const file = new File(['test-image'], 'image.jpg', { type: 'image/jpg' });

        render(CustomSourceFieldSet, {
            props: {
                data,
                onChange,
            },
        });
        await userEvent.upload(screen.getByTestId('image-upload-field-input'), file);
        await userEvent.click(screen.getByTestId('image-upload-field-button'));

        await vi.waitFor(() => expect(onChange).toHaveBeenCalled());
    });
});

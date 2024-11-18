import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import ImageUrlField from './ImageUrlField.svelte';

import backgroundImage from '@cypress/fixtures/unsplash-image.json';

const name = 'image-url-field';
const invalidImageUrl = 'this-is-not-a-url';

describe('ImageUrlField', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('disables image url input and set image button when disabled prop is true', () => {
        render(ImageUrlField, {
            props: {
                disabled: true,
                name,
            },
        });

        expect(screen.getByTestId('image-url-field-input')).toBeDisabled();
        expect(screen.getByTestId('image-url-field-button')).toBeDisabled();
    });

    it('enables image url input when disabled prop is false', () => {
        render(ImageUrlField, {
            props: { name },
        });

        expect(screen.getByTestId('image-url-field-input')).toBeEnabled();
        expect(screen.getByTestId('image-url-field-button')).toBeDisabled();
    });

    it('enables set image button when disabled prop is false and an image url is specified', async () => {
        render(ImageUrlField, {
            props: { name },
        });
        await userEvent.type(screen.getByTestId('image-url-field-input'), backgroundImage.photo_url);

        expect(screen.getByTestId('image-url-field-button')).toBeEnabled();
    });

    it('displays error when entered image url is not a valid url', async () => {
        render(ImageUrlField, {
            props: { name },
        });

        await userEvent.type(screen.getByTestId('image-url-field-input'), invalidImageUrl);
        await userEvent.click(screen.getByTestId('image-url-field-button'));

        expect(screen.getByTestId('image-url-field-error')).toHaveTextContent('Please input a valid URL.');
    });

    it('dispatches "change" and "request" events when image url is set and set image button is clicked', async () => {
        const onChange = vi.fn();
        const onRequest = vi.fn();

        render(ImageUrlField, {
            props: {
                name,
                onChange,
                onRequest,
            },
        });

        await userEvent.type(screen.getByTestId('image-url-field-input'), backgroundImage.photo_url);
        await userEvent.click(screen.getByTestId('image-url-field-button'));

        expect(onChange).toHaveBeenCalledWith(backgroundImage);
        expect(onRequest).toHaveBeenCalled();
    });
});

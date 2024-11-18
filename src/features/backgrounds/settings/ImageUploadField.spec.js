import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import ImageUploadField from './ImageUploadField.svelte';

const name = 'image-upload-field';
const validFile = new File(['test-image'], 'valid.jpg', { type: 'image/jpg' });
const invalidFile = new File(['test-pdf'], 'invalid.pdf', { type: 'application/pdf' });

describe('ImageUploadField', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('disables image upload input and set image button when disabled prop is true', () => {
        render(ImageUploadField, {
            props: {
                disabled: true,
                name,
            },
        });

        expect(screen.getByTestId('image-upload-field-input')).toBeDisabled();
        expect(screen.getByTestId('image-upload-field-button')).toBeDisabled();
    });

    it('enables image upload input when disabled prop is false', () => {
        render(ImageUploadField, {
            props: {
                name,
                disabled: false,
            },
        });

        expect(screen.getByTestId('image-upload-field-input')).toBeEnabled();
        expect(screen.getByTestId('image-upload-field-button')).toBeDisabled();
    });

    it('enables set image button when disabled prop is false and an image is selected', async () => {
        render(ImageUploadField, {
            props: { name },
        });
        await userEvent.upload(screen.getByTestId('image-upload-field-input'), validFile);

        expect(screen.getByTestId('image-upload-field-button')).toBeEnabled();
    });

    it('displays error when selected file is not an image', async () => {
        const onChange = vi.fn();

        render(ImageUploadField, {
            props: {
                name,
                onChange,
            },
        });
        await userEvent.upload(screen.getByTestId('image-upload-field-input'), invalidFile, { applyAccept: false });
        await userEvent.click(screen.getByTestId('image-upload-field-button'));

        expect(screen.getByTestId('image-upload-field-error')).toHaveTextContent('Selected file is not an image');
        expect(onChange).not.toHaveBeenCalled();
    });

    it.skip('calls "onChange" and "onRequest" when selected file is an image and set image button is clicked', async () => {
        const onChange = vi.fn();
        const onRequest = vi.fn();

        render(ImageUploadField, {
            props: {
                name,
                onChange,
                onRequest,
            },
        });
        await userEvent.upload(screen.getByTestId('image-upload-field-input'), validFile);
        await userEvent.click(screen.getByTestId('image-upload-field-button'));

        expect(onChange).toHaveBeenCalled();
        expect(onRequest).toHaveBeenCalled();
    });
});

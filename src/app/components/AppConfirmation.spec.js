import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import AppConfirmation from './AppConfirmation.svelte';

const message = 'Confirmation message';
const confirmLabel = 'Custom confirm';
const cancelLabel = 'Custom cancel';

describe('AppConfirmation', () => {
    it('hides confirmation modal when show = false', () => {
        render(AppConfirmation, {
            props: {
                message,
            },
        });

        expect(screen.queryByTestId('confirm-message')).not.toBeInTheDocument();
    });

    it('shows confirmation modal when show = true', () => {
        render(AppConfirmation, {
            props: {
                show: true,
                message,
            },
        });

        expect(screen.getByTestId('confirm-message')).toHaveTextContent(message);
    });

    it('displays custom confirm button label', () => {
        render(AppConfirmation, {
            props: {
                show: true,
                message,
                confirmLabel,
            },
        });

        expect(screen.getByTestId('confirm-btn')).toHaveTextContent(confirmLabel);
    });

    it('displays custom cancel button label', () => {
        render(AppConfirmation, {
            props: {
                show: true,
                message,
                cancelLabel,
            },
        });

        expect(screen.getByTestId('cancel-btn')).toHaveTextContent(cancelLabel);
    });

    it('calls "onConfirm" when confirm button is clicked', async () => {
        const onConfirm = vi.fn();

        render(AppConfirmation, {
            props: {
                show: true,
                message,
                onConfirm,
            },
        });
        await userEvent.click(screen.getByTestId('confirm-btn'));

        expect(onConfirm).toHaveBeenCalled();
    });

    it('calls "onCancel" when cancel button is clicked', async () => {
        const onCancel = vi.fn();

        render(AppConfirmation, {
            props: {
                show: true,
                message,
                onCancel,
            },
        });
        await userEvent.click(screen.getByTestId('cancel-btn'));

        expect(onCancel).toHaveBeenCalled();
    });
});

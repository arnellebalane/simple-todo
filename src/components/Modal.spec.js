import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Modal from './Modal.svelte';

describe('Modal', () => {
    it('hides modal when show prop is false', () => {
        render(Modal, {
            props: {
                'data-testid': 'modal',
            },
        });

        expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });

    it('displays modal when show prop is true', () => {
        render(Modal, {
            props: {
                show: true,
                'data-testid': 'modal',
            },
        });

        expect(screen.getByTestId('modal')).toBeInTheDocument();
    });

    it('does not call "onClose" when pressing escape key and closeOnEscape is false', async () => {
        const onClose = vi.fn();

        render(Modal, {
            props: {
                show: true,
                closeOnEscape: false,
                onClose,
            },
        });
        await userEvent.keyboard('{Escape}');

        expect(onClose).not.toHaveBeenCalled();
    });

    it('calls "onClose" when pressing escape key and closeOnEscape is true', async () => {
        const onClose = vi.fn();

        render(Modal, {
            props: {
                show: true,
                closeOnEscape: true,
                onClose,
            },
        });
        await userEvent.keyboard('{Escape}');

        expect(onClose).toHaveBeenCalled();
    });

    it('does not call "onClose" when clicking outside the modal content and closeOnClickOutside is false', async () => {
        const onClose = vi.fn();

        render(Modal, {
            props: {
                show: true,
                closeOnClickOutside: false,
                'data-testid': 'modal',
                onClose,
            },
        });
        await userEvent.click(screen.getByTestId('modal'));

        expect(onClose).not.toHaveBeenCalled();
    });

    it('does not call "onClose" when clicking inside the modal content', async () => {
        const onClose = vi.fn();

        render(Modal, {
            props: {
                show: true,
                closeOnClickOutside: true,
                'data-testid': 'modal',
                onClose,
            },
        });
        await userEvent.click(screen.getByTestId('modal-content'));

        expect(onClose).not.toHaveBeenCalled();
    });

    it('calls "onClose" when clicking outside the modal content and closeOnClickOutside is true', async () => {
        const onClose = vi.fn();

        render(Modal, {
            props: {
                show: true,
                closeOnClickOutside: true,
                'data-testid': 'modal',
                onClose,
            },
        });
        await userEvent.click(screen.getByTestId('modal'));

        expect(onClose).toHaveBeenCalled();
    });
});

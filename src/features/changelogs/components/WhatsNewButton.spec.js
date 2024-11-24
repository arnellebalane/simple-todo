import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import WhatsNewButton from './WhatsNewButton.svelte';

describe('WhatsNewButton', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('omits pulse class when pulse prop is false', () => {
        render(WhatsNewButton);

        expect(screen.queryByTestId('whats-new-btn')).not.toHaveClass('pulse');
    });

    it('includes pulse class when pulse prop is true', () => {
        render(WhatsNewButton, {
            props: {
                pulse: true,
            },
        });

        expect(screen.getByTestId('whats-new-btn')).toHaveClass('pulse');
    });

    it('dispatches "click" event when button is clicked', async () => {
        const onClick = vi.fn();

        render(WhatsNewButton, {
            props: { onClick },
        });
        await userEvent.click(screen.getByTestId('whats-new-btn'));

        expect(onClick).toHaveBeenCalled();
    });
});

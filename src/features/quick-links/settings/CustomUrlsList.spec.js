import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import CustomUrlsList from './CustomUrlsList.svelte';

import { confirmation } from '@app/stores/confirmation';
import quickLinks from '@cypress/fixtures/quicklinks.json';

describe('CustomUrlsList', () => {
    it('displays links in reversed order', () => {
        render(CustomUrlsList, {
            props: {
                links: quickLinks,
            },
        });

        const links = screen.getAllByTestId('custom-url-item');
        expect(links).toHaveLength(quickLinks.length);

        quickLinks.forEach((quickLink, i) => {
            expect(screen.getByText(quickLink.title)).toBeInTheDocument();
        });
    });

    it('calls "onRemove" when item remove button is clicked', async () => {
        const onRemove = vi.fn();

        render(CustomUrlsList, {
            props: {
                links: quickLinks,
                onRemove,
            },
        });
        await userEvent.click(screen.getAllByTestId('custom-url-item-remove-button')[0]);
        confirmation.confirm();

        await vi.waitFor(() =>
            expect(onRemove).toHaveBeenCalledWith(expect.objectContaining(quickLinks[quickLinks.length - 1])),
        );
    });
});

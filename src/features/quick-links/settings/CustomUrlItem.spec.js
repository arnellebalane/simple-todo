import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
import { describe, expect, it, vi } from 'vitest';

import CustomUrlItem from './CustomUrlItem.svelte';

import { confirmation } from '@app/stores/confirmation';
import quickLinks from '@cypress/fixtures/quicklinks.json';

describe('CustomUrlItem', () => {
    it('displays given link title and url', () => {
        const quickLink = quickLinks[0];
        render(CustomUrlItem, {
            props: {
                link: quickLink,
            },
        });

        expect(screen.getByTestId('custom-url-item')).toHaveTextContent(quickLink.title);
        expect(screen.getByTestId('custom-url-item')).toHaveTextContent(quickLink.url);
    });

    it('show confirmation when remove button is clicked', async () => {
        const onSubscribe = vi.fn();
        confirmation.subscribe(onSubscribe);

        render(CustomUrlItem, {
            props: {
                link: quickLinks[0],
            },
        });
        await userEvent.click(screen.getByTestId('custom-url-item-remove-button'));

        expect(onSubscribe).toHaveBeenCalledWith(
            expect.objectContaining({
                message: 'Are you sure you want to delete this custom quick link?',
            }),
        );
    });

    it('calls "onRemove" when remove confirmation is confirmed', async () => {
        const onRemove = vi.fn();

        render(CustomUrlItem, {
            props: {
                link: quickLinks[0],
                onRemove,
            },
        });
        await userEvent.click(screen.getByTestId('custom-url-item-remove-button'));
        confirmation.confirm();

        await vi.waitFor(() => expect(onRemove).toHaveBeenCalled());
    });

    it('does not dispatch "remove" event when remove confirmation is cancelled', async () => {
        const onRemove = vi.fn();

        render(CustomUrlItem, {
            props: {
                link: quickLinks[0],
                onRemove,
            },
        });
        await userEvent.click(screen.getByTestId('custom-url-item-remove-button'));
        confirmation.cancel();

        await vi.waitFor(() => expect(onRemove).not.toHaveBeenCalled());
    });

    it('displays item shadow when link has the drag and drop shadow marker', () => {
        const quickLink = { ...quickLinks[0], [SHADOW_ITEM_MARKER_PROPERTY_NAME]: true };

        render(CustomUrlItem, {
            props: {
                link: quickLink,
            },
        });

        expect(screen.getByTestId('custom-url-item-shadow')).toBeInTheDocument();
    });
});

import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { tags } from '../store';

import { component as TagsSettings } from '.';

describe('TagsSettings', () => {
    beforeEach(() => {
        tags.set({});
    });

    it('renders empty state when there are no existing tags', () => {
        render(TagsSettings);

        expect(screen.getByTestId('tags-empty')).toBeInTheDocument();
    });

    it('renders tags from the store', () => {
        const data = {
            one: { label: 'one' },
            two: { label: 'two' },
        };
        tags.set(data);

        render(TagsSettings);

        for (const { label } of Object.values(data)) {
            expect(screen.getByText(label)).toBeInTheDocument();
        }
    });

    it('includes "removed" class when the tag is marked for removal', () => {
        const data = {
            one: { label: 'one', removed: true },
        };
        tags.set(data);

        render(TagsSettings);

        expect(screen.getByTestId('tag-item')).toHaveClass('removed');
    });

    it('marks the tag for removal when the action button is clicked for a tag that is not yet marked for removal', async () => {
        const tagsSpy = vi.fn();
        const data = {
            one: { label: 'one' },
        };
        tags.set(data);
        tags.subscribe(tagsSpy);

        render(TagsSettings);
        await userEvent.click(screen.getByTestId('tag-action-btn'));

        expect(tagsSpy).toHaveBeenCalledWith({
            one: { label: 'one', removed: true },
        });
    });

    it('unmarks the tag for removal when the action button is clicked for a tag that is already marked for removal', async () => {
        const tagsSpy = vi.fn();
        const data = {
            one: { label: 'one', removed: true },
        };
        tags.set(data);
        tags.subscribe(tagsSpy);

        render(TagsSettings);
        await userEvent.click(screen.getByTestId('tag-action-btn'));

        expect(tagsSpy).toHaveBeenCalledWith({
            one: { label: 'one', removed: false },
        });
    });
});

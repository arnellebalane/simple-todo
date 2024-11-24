import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import SearchForm from './SearchForm.svelte';

import { search } from '@features/search/store';
import { settings } from '@features/settings/store';
import { tags } from '@features/tags/store';

describe('SearchForm', () => {
    it('renders search form when text filter is enabled', () => {
        settings.set({
            enableTextFilter: true,
            enableTagsFilter: false,
        });

        render(SearchForm);

        expect(screen.getByTestId('search-form')).toBeInTheDocument();
        expect(screen.getByTestId('search-form-text-filter')).toBeInTheDocument();
    });

    it('renders search form when tags filter is enabled and there are available tags', () => {
        settings.set({
            enableTextFilter: false,
            enableTagsFilter: true,
        });
        tags.set({
            TagOne: { label: 'TagOne' },
            TagTwo: { label: 'TagTwo' },
        });

        render(SearchForm);

        const options = screen.getAllByRole('option');
        expect(screen.getByTestId('search-form')).toBeInTheDocument();
        expect(options[0]).toHaveAttribute('value', '');
        expect(options[1]).toHaveAttribute('value', 'TagOne');
        expect(options[2]).toHaveAttribute('value', 'TagTwo');
    });

    it('hides search form when tags filters are enabled but there are no available tags', () => {
        settings.set({ enableTagsFilter: true });
        tags.set({});

        render(SearchForm);

        expect(screen.queryByTestId('search-form')).not.toBeInTheDocument();
    });

    it('hides search form when text and tags filters are disabled', () => {
        settings.set({
            enableTextFilter: false,
            enableTagsFilter: false,
        });

        render(SearchForm);

        expect(screen.queryByTestId('search-form')).not.toBeInTheDocument();
    });

    it('clears search input when escape key is pressed', async () => {
        settings.set({ enableTextFilter: true });
        tags.set({ TagOne: { label: 'TagOne' } });
        search.query.set('TodoName');
        search.tag.set('TagOne');

        const querySpy = vi.fn();
        const tagSpy = vi.fn();
        search.query.subscribe(querySpy);
        search.tag.subscribe(tagSpy);

        render(SearchForm);
        await userEvent.type(screen.getByTestId('search-form-text-filter'), '{Escape}');

        expect(querySpy).toHaveBeenCalledWith('');
        expect(tagSpy).toHaveBeenCalledWith(null);
    });

    it('clears search input when clear search button is clicked', async () => {
        settings.set({ enableTextFilter: true });
        tags.set({ TagOne: { label: 'TagOne' } });
        search.query.set('TodoName');
        search.tag.set('TagOne');

        const querySpy = vi.fn();
        const tagSpy = vi.fn();
        search.query.subscribe(querySpy);
        search.tag.subscribe(tagSpy);

        render(SearchForm);
        await userEvent.click(screen.getByTestId('search-form-clear-btn'));

        expect(querySpy).toHaveBeenCalledWith('');
        expect(tagSpy).toHaveBeenCalledWith(null);
    });
});

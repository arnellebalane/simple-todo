import SearchForm from './SearchForm.svelte';

import { search } from '@features/search/store';
import { settings } from '@features/settings/store';
import { tags } from '@features/tags/store';

describe('SearchForm', () => {
    beforeEach(() => {
        cy.viewport(500, 500);
    });

    it('renders search form when text filter is enabled', () => {
        settings.set({
            enableTextFilter: true,
            enableTagsFilter: false,
        });

        cy.mount(SearchForm);

        cy.get('[data-cy="search-form"]').should('be.visible');
        cy.get('[data-cy="search-form-text-filter"]').should('be.visible');
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

        cy.mount(SearchForm);

        cy.get('[data-cy="search-form"]').should('be.visible');
        cy.get('[data-cy="search-form-tags-filter"]').select(0).invoke('val').should('equal', 'null');
        cy.get('[data-cy="search-form-tags-filter"]').select(1).invoke('val').should('equal', 'TagOne');
        cy.get('[data-cy="search-form-tags-filter"]').select(2).invoke('val').should('equal', 'TagTwo');
    });

    it('hides search form when tags filters are enabled but there are no available tags', () => {
        settings.set({ enableTagsFilter: true });
        tags.set({});

        cy.mount(SearchForm);

        cy.get('[data-cy="search-form"]').should('not.exist');
    });

    it('hides search form when text and tags filters are disabled', () => {
        settings.set({
            enableTextFilter: false,
            enableTagsFilter: false,
        });

        cy.mount(SearchForm);

        cy.get('[data-cy="search-form"]').should('not.exist');
    });

    it('clears search input when escape key is pressed', () => {
        settings.set({ enableTextFilter: true });
        tags.set({ TagOne: { label: 'TagOne' } });
        search.query.set('TodoName');
        search.tag.set('TagOne');

        const querySpy = cy.spy();
        const tagSpy = cy.spy();
        search.query.subscribe(querySpy);
        search.tag.subscribe(tagSpy);

        cy.mount(SearchForm);
        cy.get('[data-cy="search-form-text-filter"]').focus();
        cy.get('[data-cy="search-form-text-filter"]').type('{esc}');

        cy.wrap(querySpy).should('have.been.calledWith', '');
        cy.wrap(tagSpy).should('have.been.calledWith', null);
    });
});

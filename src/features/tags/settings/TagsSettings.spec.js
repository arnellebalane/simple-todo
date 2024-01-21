import { component as TagsSettings } from '.';
import { tags } from '../store';

describe('TagsSettings', () => {
    beforeEach(() => {
        cy.viewport(500, 500);

        tags.set({});
    });

    it('renders empty state when there are no existing tags', () => {
        cy.mount(TagsSettings);

        cy.get('[data-cy="tags-empty"]').should('be.visible');
    });

    it('renders tags from the store', () => {
        const data = {
            one: { label: 'one' },
            two: { label: 'two' },
        };
        tags.set(data);

        cy.mount(TagsSettings);

        for (const { label } of Object.values(data)) {
            cy.contains(label);
        }
    });

    it('includes "removed" class when the tag is marked for removal', () => {
        const data = {
            one: { label: 'one', removed: true },
        };
        tags.set(data);

        cy.mount(TagsSettings);

        cy.get('[data-cy="tag-item"]').should('have.class', 'removed');
    });

    it('marks the tag for removal when the action button is clicked for a tag that is not yet marked for removal', () => {
        const data = {
            one: { label: 'one' },
        };
        tags.set(data);

        cy.mount(TagsSettings);

        const tagsSpy = cy.spy();
        tags.subscribe(tagsSpy);

        cy.get('[data-cy="tag-action-btn"]').click();
        cy.wrap(tagsSpy).should('have.been.calledWith', {
            one: { label: 'one', removed: true },
        });
    });

    it('unmarks the tag for removal when the action button is clicked for a tag that is already marked for removal', () => {
        const data = {
            one: { label: 'one', removed: true },
        };
        tags.set(data);

        cy.mount(TagsSettings);

        const tagsSpy = cy.spy();
        tags.subscribe(tagsSpy);

        cy.get('[data-cy="tag-action-btn"]').click();
        cy.wrap(tagsSpy).should('have.been.calledWith', {
            one: { label: 'one', removed: false },
        });
    });
});

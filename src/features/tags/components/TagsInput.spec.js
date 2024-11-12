import TagsInput from './TagsInput.svelte';

describe('TagsInput', () => {
    beforeEach(() => {
        cy.viewport(500, 500);
    });

    it('renders current list of values', () => {
        const value = ['one', 'two'];

        cy.mount(TagsInput, {
            props: {
                value,
                choices: [],
            },
        });

        for (const tag of value) {
            cy.get('[data-testid="tags-value"]').contains(tag);
        }
    });

    it('renders new value in list of values and resets input when enter key is pressed', () => {
        cy.mount(TagsInput, {
            props: {
                value: [],
                choices: [],
            },
        });

        cy.get('[data-testid="tags-input"]').type('one');
        cy.get('[data-testid="tags-input"]').focus().trigger('keydown', { code: 'Enter' });

        cy.get('[data-testid="tags-value"]').contains('one');
        cy.get('[data-testid="tags-input"]').should('have.value', '');
    });

    it('ignores new value when it is already in the list of values', () => {
        cy.mount(TagsInput, {
            props: {
                value: ['one'],
                choices: [],
            },
        });

        cy.get('[data-testid="tags-input"]').type('one');
        cy.get('[data-testid="tags-input"]').focus().trigger('keydown', { code: 'Enter' });

        cy.get('[data-testid="tags-value"]').contains('one').should('have.length', 1);
        cy.get('[data-testid="tags-input"]').should('have.value', '');
    });

    it('removes value from values when it is clicked', () => {
        cy.mount(TagsInput, {
            props: {
                value: ['one'],
                choices: [],
            },
        });

        cy.get('[data-testid="tags-value"]').click();
        cy.get('[data-testid="tags-value"]').should('have.length', 0);
    });
});

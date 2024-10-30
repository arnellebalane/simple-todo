import Badge from './Badge.svelte';

describe('Badge', () => {
    it('renders as li when variant=li', () => {
        cy.mount(Badge, {
            props: {
                variant: 'li',
                'data-cy': 'badge',
            },
        });

        cy.get('li[data-cy="badge"]').should('be.visible');
        cy.get('li[data-cy="badge"] span').should('not.exist');
    });

    it('renders as span when variant=span', () => {
        cy.mount(Badge, {
            props: {
                variant: 'span',
                'data-cy': 'badge',
            },
        });

        cy.get('span[data-cy="badge"]').should('be.visible');
        cy.get('span[data-cy="badge"] span').should('not.exist');
    });

    it('renders icon slot when icon=true', () => {
        cy.mount(Badge, {
            props: {
                variant: 'span',
                icon: true,
                'data-cy': 'badge',
            },
        });

        cy.get('span[data-cy="badge"] span').should('be.visible');
    });
});

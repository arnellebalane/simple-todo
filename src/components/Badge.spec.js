import Badge from './Badge.svelte';

describe('Badge', () => {
    it('renders as li when variant=li', () => {
        cy.mount(Badge, {
            props: {
                variant: 'li',
                'data-testid': 'badge',
            },
        });

        cy.get('li[data-testid="badge"]').should('be.visible');
        cy.get('li[data-testid="badge"] span').should('not.exist');
    });

    it('renders as span when variant=span', () => {
        cy.mount(Badge, {
            props: {
                variant: 'span',
                'data-testid': 'badge',
            },
        });

        cy.get('span[data-testid="badge"]').should('be.visible');
        cy.get('span[data-testid="badge"] span').should('not.exist');
    });

    it('renders icon slot when icon=true', () => {
        cy.mount(Badge, {
            props: {
                variant: 'span',
                icon: true,
                'data-testid': 'badge',
            },
        });

        cy.get('span[data-testid="badge"] span').should('be.visible');
    });
});

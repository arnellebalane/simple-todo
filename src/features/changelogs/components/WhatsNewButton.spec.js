import WhatsNewButton from './WhatsNewButton.svelte';

describe('WhatsNewButton', () => {
    beforeEach(() => {
        cy.viewport(500, 500);
    });

    it('omits pulse class when pulse prop is false', () => {
        cy.mount(WhatsNewButton);

        cy.get('[data-testid="whats-new-btn"]').should('not.have.class', 'pulse');
    });

    it('includes pulse class when pulse prop is true', () => {
        cy.mount(WhatsNewButton, {
            props: {
                pulse: true,
            },
        });

        cy.get('[data-testid="whats-new-btn"]').should('have.class', 'pulse');
    });

    it('dispatches "click" event when button is clicked', () => {
        const onClick = cy.spy();

        cy.mount(WhatsNewButton).then(({ component }) => {
            component.$on('click', onClick);
        });

        cy.get('[data-testid="whats-new-btn"]').click();
        cy.wrap(onClick).should('have.been.called');
    });
});

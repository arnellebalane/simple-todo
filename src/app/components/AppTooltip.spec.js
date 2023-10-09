import AppTooltip from './AppTooltip.svelte';

const tooltipMessage = 'This is the tooltip message';

describe('AppTooltip', () => {
    it('displays tooltip when mouse enters an element with data-toooltip', () => {
        cy.mount(AppTooltip);

        cy.get('[data-cy="tooltip-target"]')
            .invoke('attr', 'data-tooltip', tooltipMessage)
            .trigger('mouseenter', { force: true });

        cy.get('[data-cy="app-tooltip"]').should('be.visible').should('contain.text', tooltipMessage);
    });

    it('hides tooltip when mouse leaves an element with data-tooltip', () => {
        cy.mount(AppTooltip);

        cy.get('[data-cy="tooltip-target"]')
            .invoke('attr', 'data-tooltip', tooltipMessage)
            .trigger('mouseenter', { force: true })
            .trigger('mouseleave', { force: true });

        cy.get('[data-cy="app-tooltip"]').should('be.hidden');
    });
});

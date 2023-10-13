import QuickLinks from './QuickLinks.svelte';

describe('QuickLinks', () => {
    beforeEach(() => {
        cy.viewport(500, 500);
    });

    it('displays the links provided in the links prop', () => {
        cy.fixture('quicklinks.json').then((quickLinks) => {
            cy.mount(QuickLinks, {
                props: {
                    links: quickLinks,
                },
            });

            cy.get('[data-cy="quick-links"] a').should('have.length', quickLinks.length);
            quickLinks.forEach((quickLink, i) => {
                const link = cy.get('[data-cy="quick-links"] a');
                link.eq(i)
                    .should('have.attr', 'href', quickLink.url)
                    .should('have.attr', 'data-tooltip', quickLink.title);
            });
        });
    });
});

import FrequentLinks from './FrequentLinks.svelte';

describe('FrequentLinks', () => {
    beforeEach(() => {
        cy.viewport(500, 500);
    });

    it('displays the links provided in the links prop', () => {
        cy.fixture('quicklinks.json').then((quickLinks) => {
            cy.mount(FrequentLinks, {
                props: {
                    links: quickLinks,
                },
            });

            cy.get('[data-testid="frequent-links"] a').should('have.length', quickLinks.length);
            quickLinks.forEach((quickLink, i) => {
                const link = cy.get('[data-testid="frequent-links"] a');
                link.eq(i)
                    .should('have.attr', 'href', quickLink.url)
                    .should('have.attr', 'data-tooltip', quickLink.title);
            });
        });
    });
});

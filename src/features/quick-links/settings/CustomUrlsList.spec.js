import { TRIGGERS } from 'svelte-dnd-action';

import CustomUrlsList from './CustomUrlsList.svelte';

import { confirmation } from '@app/stores/confirmation';

describe('CustomUrlsList', () => {
    beforeEach(() => {
        cy.viewport(500, 500);
    });

    it('displays links in reversed order', () => {
        cy.fixture('quicklinks.json').then((quickLinks) => {
            cy.mount(CustomUrlsList, {
                props: {
                    links: quickLinks,
                },
            });

            cy.get('[data-testid="custom-url-item"]').should('have.length', quickLinks.length);
            quickLinks.forEach((quickLink, i) => {
                cy.get('[data-testid="custom-url-item"]')
                    .eq(quickLinks.length - (i + 1))
                    .should('contain.text', quickLink.title);
            });
        });
    });

    it('dispatches "remove" event when item remove button is clicked', () => {
        const onRemove = cy.spy();

        cy.fixture('quicklinks.json').then((quickLinks) => {
            cy.mount(CustomUrlsList, {
                props: {
                    links: quickLinks,
                },
            }).then(({ component }) => {
                component.$on('remove', onRemove);
            });

            cy.get('[data-testid="custom-url-item-remove-button"]')
                .eq(0)
                .click()
                .then(() => {
                    confirmation.confirm();

                    cy.wrap(onRemove).should(
                        'have.been.calledWith',
                        Cypress.sinon.match({
                            detail: quickLinks.pop(),
                        }),
                    );
                });
        });
    });

    it('dispatches "change" event when item is dropped into the drag and drop zone', () => {
        cy.fixture('quicklinks.json').then((quickLinks) => {
            const onChange = cy.spy();
            const keyedQuickLinks = quickLinks.map((quickLink) => ({ ...quickLink, id: quickLink.url }));

            cy.mount(CustomUrlsList, {
                props: {
                    links: keyedQuickLinks,
                },
            }).then(({ component }) => {
                component.$on('change', onChange);
            });

            cy.get('[data-testid="custom-urls-list"]').trigger('finalize', {
                detail: {
                    items: keyedQuickLinks.slice().reverse(),
                    info: {
                        id: keyedQuickLinks[0].url,
                        trigger: TRIGGERS.DROPPED_INTO_ZONE,
                    },
                },
            });

            cy.wrap(onChange).should('have.been.calledWith', Cypress.sinon.match({ detail: quickLinks }));
        });
    });
});

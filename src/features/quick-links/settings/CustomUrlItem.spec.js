import { SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
import { confirmation } from '@app/stores/confirmation';
import CustomUrlItem from './CustomUrlItem.svelte';

describe('CustomUrlItem', () => {
    beforeEach(() => {
        cy.viewport(500, 500);
    });

    it('displays given link title and url', () => {
        cy.fixture('quicklinks.json').then((quickLinks) => {
            const quickLink = quickLinks[0];

            cy.mount(CustomUrlItem, {
                props: {
                    link: quickLink,
                },
            });

            cy.get('[data-cy="custom-url-item"]')
                .should('contain.text', quickLink.title)
                .should('contain.text', quickLink.url);
        });
    });

    it('show confirmation when remove button is clicked', () => {
        cy.fixture('quicklinks.json').then((quickLinks) => {
            const onSubscribe = cy.spy();
            confirmation.subscribe(onSubscribe);

            cy.mount(CustomUrlItem, {
                props: {
                    link: quickLinks[0],
                },
            });

            cy.get('[data-cy="custom-url-item-remove-button"]').click();
            cy.wrap(onSubscribe).should(
                'have.been.calledWith',
                Cypress.sinon.match({
                    message: 'Are you sure you want to delete this custom quick link?',
                }),
            );
        });
    });

    it('dispatches "remove" event when remove confirmation is confirmed', () => {
        cy.fixture('quicklinks.json').then((quickLinks) => {
            const onRemove = cy.spy();

            cy.mount(CustomUrlItem, {
                props: {
                    link: quickLinks[0],
                },
            }).then(({ component }) => {
                component.$on('remove', onRemove);
            });

            cy.get('[data-cy="custom-url-item-remove-button"]')
                .click()
                .then(() => {
                    confirmation.confirm();
                    cy.wrap(onRemove).should('have.been.called');
                });
        });
    });

    it('does not dispatch "remove" event when remove confirmation is cancelled', () => {
        cy.fixture('quicklinks.json').then((quickLinks) => {
            const onRemove = cy.spy();

            cy.mount(CustomUrlItem, {
                props: {
                    link: quickLinks[0],
                },
            }).then(({ component }) => {
                component.$on('remove', onRemove);
            });

            cy.get('[data-cy="custom-url-item-remove-button"]')
                .click()
                .then(() => {
                    confirmation.cancel();

                    cy.wrap(onRemove).should('not.have.been.called');
                });
        });
    });

    it('displays item shadow when link has the drag and drop shadow marker', () => {
        cy.fixture('quicklinks.json').then((quickLinks) => {
            const quickLink = { ...quickLinks[0], [SHADOW_ITEM_MARKER_PROPERTY_NAME]: true };

            cy.mount(CustomUrlItem, {
                props: {
                    link: quickLink,
                },
            });

            cy.get('[data-cy="custom-url-item-shadow"]').should('be.visible');
        });
    });
});

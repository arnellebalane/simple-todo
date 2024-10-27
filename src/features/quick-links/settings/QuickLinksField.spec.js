import omit from 'lodash/omit';

import QuickLinksField from './QuickLinksField.svelte';

import { confirmation } from '@app/stores/confirmation';
import { BUILTIN_QUICK_LINKS } from '../constants';

const validQuickLink = 'https://arnellebalane.com';

describe('QuickLinksField', () => {
    beforeEach(() => {
        cy.viewport(500, 500);
    });

    it('displays choices prop items in default links section', () => {
        cy.mount(QuickLinksField, {
            props: {
                choices: BUILTIN_QUICK_LINKS,
            },
        });

        cy.get('[data-cy="default-link"]').should('have.length', BUILTIN_QUICK_LINKS.length);
        BUILTIN_QUICK_LINKS.forEach((link, i) => {
            cy.get(`[data-cy="default-link"]:nth-child(${i + 1})`).should('contain.text', link.title);
        });
    });

    it('selects choices prop items that are also present in value prop', () => {
        cy.mount(QuickLinksField, {
            props: {
                choices: BUILTIN_QUICK_LINKS,
                value: [BUILTIN_QUICK_LINKS[0]],
            },
        });

        cy.get('[data-cy="default-link"]').first().should('have.class', 'selected');
        BUILTIN_QUICK_LINKS.slice(1).forEach((link, i) => {
            cy.get(`[data-cy="default-link"]:nth-child(${i + 2})`).should('not.have.class', 'selected');
        });
    });

    it('displays custom links list when there are custom links in the value prop', () => {
        cy.fixture('quicklinks.json').then((quickLinks) => {
            cy.mount(QuickLinksField, {
                props: {
                    choices: BUILTIN_QUICK_LINKS,
                    value: quickLinks,
                },
            });

            cy.get('[data-cy="custom-urls-list"]').should('be.visible');
        });
    });

    it('dispatches "change" event when a default link is selected', () => {
        const onChange = cy.spy();

        cy.mount(QuickLinksField, {
            props: {
                choices: BUILTIN_QUICK_LINKS,
            },
        }).then(({ component }) => {
            component.$on('change', onChange);
        });

        cy.get(`[data-cy="default-link"]:first-child`).click();
        cy.wrap(onChange).should(
            'have.been.calledWith',
            Cypress.sinon.match({
                detail: [omit(BUILTIN_QUICK_LINKS[0], ['selected'])],
            }),
        );
    });

    it('dispatches "change" event when a default link is unselected', () => {
        const onChange = cy.spy();

        cy.mount(QuickLinksField, {
            props: {
                choices: BUILTIN_QUICK_LINKS,
                value: [BUILTIN_QUICK_LINKS[0]],
            },
        }).then(({ component }) => {
            component.$on('change', onChange);
        });

        cy.get(`[data-cy="default-link"]:first-child`).click();
        cy.wrap(onChange).should('have.been.calledWith', Cypress.sinon.match({ detail: [] }));
    });

    it('dispatches "change" event when a custom link is added', () => {
        const onChange = cy.spy();

        cy.mount(QuickLinksField, {
            props: {
                choices: BUILTIN_QUICK_LINKS,
            },
        }).then(({ component }) => {
            component.$on('change', onChange);
        });

        cy.fixture('quicklinks.json').then((quickLinks) => {
            cy.intercept('GET', '**/.netlify/functions/get-quick-link-details**', quickLinks[0]);

            cy.get('[data-cy="custom-url-field-input"]').type(quickLinks[0].url);
            cy.get('[data-cy="custom-url-field-button"]').click();

            cy.wrap(onChange).should(
                'have.been.calledWith',
                Cypress.sinon.match({
                    detail: [{ ...quickLinks[0], custom: true }],
                }),
            );
        });
    });

    it('dispatches "change" event when a custom link is removed', () => {
        const onChange = cy.spy();

        cy.fixture('quicklinks.json').then((quickLinks) => {
            cy.mount(QuickLinksField, {
                props: {
                    choices: BUILTIN_QUICK_LINKS,
                    value: quickLinks,
                },
            }).then(({ component }) => {
                component.$on('change', onChange);
            });

            cy.get('[data-cy="custom-url-item-remove-button"]')
                .click()
                .then(() => {
                    confirmation.confirm();

                    cy.wrap(onChange).should(
                        'have.been.calledWith',
                        Cypress.sinon.match({
                            detail: quickLinks.filter((link) => !link.custom),
                        }),
                    );
                });
        });
    });

    it('displays error when the custom link being added already exists in the value prop', () => {
        cy.fixture('quicklinks.json').then((quickLinks) => {
            cy.intercept('GET', '**/.netlify/functions/get-quick-link-details**', quickLinks[0]);

            cy.mount(QuickLinksField, {
                props: {
                    choices: BUILTIN_QUICK_LINKS,
                    value: quickLinks,
                },
            });

            cy.get('[data-cy="custom-url-field-input"]').type(quickLinks[0].url);
            cy.get('[data-cy="custom-url-field-button"]').click();

            cy.get('[data-cy="custom-url-field-error"]').should(
                'have.text',
                'Custom link is a duplicate of an existing link.',
            );
        });
    });
});

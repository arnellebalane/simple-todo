import CustomSourceFieldSet from './CustomSourceFieldSet.svelte';

import { BACKGROUND_REFRESH_MANUALLY, BACKGROUND_SOURCE_CUSTOM } from '../constants';

describe('CustomSourceFieldSet', () => {
    beforeEach(() => {
        cy.viewport(500, 500);
        cy.intercept('**/.netlify/functions/get-background-image**', {
            fixture: 'unsplash-image.json',
        }).as('getBackgroundImage');
    });

    it('disables image url and upload fields when disabled prop is true', () => {
        cy.mount(CustomSourceFieldSet, {
            props: {
                disabled: true,
            },
        });

        cy.get('[data-testid="image-url-field-input"]').should('be.disabled');
        cy.get('[data-testid="image-upload-field-input"]').should('be.disabled');
    });

    it('enables image url and upload fields when disabled prop is false', () => {
        cy.mount(CustomSourceFieldSet, {
            props: {
                disabled: false,
            },
        });

        cy.get('[data-testid="image-url-field-input"]').should('be.enabled');
        cy.get('[data-testid="image-upload-field-input"]').should('be.enabled');
    });

    it('dispatches "change" event when custom image url is specified', () => {
        const onChange = cy.spy();
        const data = {};
        const now = new Date(2023, 0, 1);
        cy.clock(now);

        cy.mount(CustomSourceFieldSet, {
            props: { data },
        }).then(({ component }) => {
            component.$on('change', onChange);
        });

        cy.fixture('unsplash-image.json').then((backgroundImage) => {
            cy.get('[data-testid="image-url-field-input"]').type(backgroundImage.photo_link);
            cy.get('[data-testid="image-url-field-button"]').click();

            cy.wrap(onChange).should(
                'have.been.calledWith',
                Cypress.sinon.match({
                    detail: {
                        backgroundImage,
                        backgroundImageLastUpdate: now.valueOf(),
                        backgroundSource: BACKGROUND_SOURCE_CUSTOM,
                        backgroundRefreshFrequency: BACKGROUND_REFRESH_MANUALLY,
                    },
                }),
            );
        });
    });

    it('dispatches "change" event when custom image is uploaded', () => {
        const onChange = cy.spy();
        const data = {};
        const now = new Date(2023, 0, 1);
        cy.clock(now);

        cy.mount(CustomSourceFieldSet, {
            props: { data },
        }).then(({ component }) => {
            component.$on('change', onChange);
        });

        cy.fixture('unsplash-image.jpeg').as('customImage');
        cy.get('[data-testid="image-upload-field-input"]').selectFile('@customImage', { force: true });
        cy.get('[data-testid="image-upload-field-button"]').click();

        cy.wrap(onChange).should('have.been.called');
    });
});

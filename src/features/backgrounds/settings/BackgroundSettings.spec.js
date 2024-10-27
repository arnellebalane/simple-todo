import { BACKGROUND_REFRESH_MANUALLY, BACKGROUND_SOURCE_AUTOMATIC, BACKGROUND_SOURCE_CUSTOM } from '../constants';

import { component as BackgroundSettings } from '.';

describe('BackgroundSettings', () => {
    beforeEach(() => {
        cy.viewport(500, 500);
        cy.intercept('**/.netlify/functions/get-background-image**', {
            fixture: 'unsplash-image.json',
        }).as('getBackgroundImage');
    });

    it('deselects background switch and hides background source selector when data.background prop is false', () => {
        cy.mount(BackgroundSettings, {
            props: {
                data: {
                    background: false,
                },
            },
        });

        cy.get('[data-cy="toggle-background"]').should('not.be.checked');
        cy.get('[data-cy="background-source-selector"]').should('not.exist');
    });

    it('selects background switch and displays background source selector when data.background prop is true', () => {
        cy.mount(BackgroundSettings, {
            props: {
                data: {
                    background: true,
                },
            },
        });

        cy.get('[data-cy="toggle-background"]').should('be.checked');
        cy.get('[data-cy="background-source-selector"]').should('be.visible');
    });

    it('displays automatic source fieldset when background source is automatic', () => {
        cy.mount(BackgroundSettings, {
            props: {
                data: {
                    background: true,
                    backgroundSource: BACKGROUND_SOURCE_AUTOMATIC,
                },
            },
        });

        cy.get('[data-cy="automatic-source-fieldset"]').should('be.visible');
        cy.get('[data-cy="custom-source-image-url-field"]').should('not.exist');
        cy.get('[data-cy="custom-source-image-upload-field"]').should('not.exist');
    });

    it('displays custom source fieldset when background source is manual', () => {
        cy.mount(BackgroundSettings, {
            props: {
                data: {
                    background: true,
                    backgroundSource: BACKGROUND_SOURCE_CUSTOM,
                },
            },
        });

        cy.get('[data-cy="automatic-source-fieldset"]').should('not.exist');
        cy.get('[data-cy="custom-source-image-url-field"]').should('be.visible');
        cy.get('[data-cy="custom-source-image-upload-field"]').should('be.visible');
    });

    it('dispatches "change" event and resets data when background is disabled', () => {
        const onChange = cy.spy();
        const data = {
            background: true,
        };

        cy.mount(BackgroundSettings, {
            props: { data },
        }).then(({ component }) => {
            component.$on('change', onChange);
        });

        cy.get('[data-cy="toggle-background"]').parent().click();

        cy.wrap(onChange).should('have.been.called');
        cy.wrap(data).should('deep.equal', {
            background: false,
        });
    });

    it('dispatches "change" event on change in automatic source fieldset data', () => {
        const onChange = cy.spy();
        const data = {
            background: true,
            backgroundSource: BACKGROUND_SOURCE_AUTOMATIC,
        };
        const now = new Date(2023, 0, 1);
        cy.clock(now);

        cy.mount(BackgroundSettings, {
            props: { data },
        }).then(({ component }) => {
            component.$on('change', onChange);
        });

        cy.fixture('unsplash-image.json').then((backgroundImage) => {
            cy.wrap(onChange).should('have.been.called');
            cy.wrap(data).should('deep.equal', {
                background: true,
                backgroundImage,
                backgroundImageLastUpdate: now.valueOf(),
                backgroundSource: BACKGROUND_SOURCE_AUTOMATIC,
            });
        });
    });

    it('dispatches "change" event on change in custom source fieldset data', () => {
        const onChange = cy.spy();
        const data = {
            background: true,
            backgroundSource: BACKGROUND_SOURCE_CUSTOM,
        };
        const now = new Date(2023, 0, 1);
        cy.clock(now);

        cy.mount(BackgroundSettings, {
            props: { data },
        }).then(({ component }) => {
            component.$on('change', onChange);
        });

        cy.fixture('unsplash-image.json').then((backgroundImage) => {
            cy.get('[data-cy="image-url-field-input"]').type(backgroundImage.photo_url);
            cy.get('[data-cy="image-url-field-button"]').click();

            cy.wrap(onChange).should('have.been.called');
            cy.wrap(data).should('deep.equal', {
                background: true,
                backgroundImage,
                backgroundImageLastUpdate: now.valueOf(),
                backgroundSource: BACKGROUND_SOURCE_CUSTOM,
                backgroundRefreshFrequency: BACKGROUND_REFRESH_MANUALLY,
            });
        });
    });
});

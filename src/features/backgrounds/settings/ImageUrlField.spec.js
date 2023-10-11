import ImageUrlField from './ImageUrlField.svelte';

const name = 'image-url-field';
const invalidImageUrl = 'this-is-not-a-url';

describe('ImageUrlField', () => {
    beforeEach(() => {
        cy.viewport(500, 500);
        cy.intercept('**/.netlify/functions/get-background-image**', { fixture: 'unsplash-image.json' });
    });

    it('disables image url input and set image button when disabled prop is true', () => {
        cy.mount(ImageUrlField, {
            props: {
                disabled: true,
                name,
            },
        });

        cy.get('[data-cy="image-url-field-input"]').should('be.disabled');
        cy.get('[data-cy="image-url-field-button"]').should('be.disabled');
    });

    it('enables image url input when disabled prop is false', () => {
        cy.mount(ImageUrlField, {
            props: { name },
        });

        cy.get('[data-cy="image-url-field-input"]').should('be.enabled');
        cy.get('[data-cy="image-url-field-button"]').should('be.disabled');
    });

    it('enables set image button when disabled prop is false and an image url is specified', () => {
        cy.mount(ImageUrlField, {
            props: { name },
        });

        cy.fixture('unsplash-image.json').then((backgroundImage) => {
            cy.get('[data-cy="image-url-field-input"]').type(backgroundImage.photo_url);
            cy.get('[data-cy="image-url-field-button"]').should('be.enabled');
        });
    });

    it('displays error when entered image url is not a valid url', () => {
        cy.mount(ImageUrlField, {
            props: { name },
        });

        cy.get('[data-cy="image-url-field-input"]').type(invalidImageUrl);
        cy.get('[data-cy="image-url-field-button"]').click();

        cy.get('[data-cy="image-url-field-error"]').should('have.text', 'Please input a valid URL.');
    });

    it('displays error when get background image request fails', () => {
        cy.intercept('**/.netlify/functions/get-background-image**', { forceNetworkError: true });

        cy.mount(ImageUrlField, {
            props: { name },
        });

        cy.fixture('unsplash-image.json').then((backgroundImage) => {
            cy.get('[data-cy="image-url-field-input"]').type(backgroundImage.photo_url);
            cy.get('[data-cy="image-url-field-button"]').click();

            cy.get('[data-cy="image-url-field-error"]').should('have.text', 'Something went wrong, please try again.');
        });
    });

    it('dispatches "change" and "request" events when image url is set and set image button is clicked', () => {
        const onChange = cy.spy();
        const onRequest = cy.spy();

        cy.mount(ImageUrlField, {
            props: { name },
        }).then(({ component }) => {
            component.$on('change', onChange);
            component.$on('request', onRequest);
        });

        cy.fixture('unsplash-image.json').then((backgroundImage) => {
            cy.get('[data-cy="image-url-field-input"]').type(backgroundImage.photo_url);
            cy.get('[data-cy="image-url-field-button"]').click();

            cy.wrap(onChange).should(
                'have.been.calledWith',
                Cypress.sinon.match({
                    detail: backgroundImage,
                }),
            );
            cy.wrap(onRequest).should('have.been.called');
        });
    });
});

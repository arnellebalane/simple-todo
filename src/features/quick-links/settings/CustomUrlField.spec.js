import CustomUrlField from './CustomUrlField.svelte';

const error = 'This is the error message';
const validQuickLink = 'https://arnellebalane.com';
const invalidQuickLink = 'this-is-not-a-url';

describe('CustomUrlField', () => {
    beforeEach(() => {
        cy.viewport(500, 500);
        cy.fixture('quicklinks.json').then((quickLinks) => {
            cy.intercept('GET', '**/.netlify/functions/get-quick-link-details**', quickLinks[0]);
        });
    });

    it('hides error when error prop is empty', () => {
        cy.mount(CustomUrlField);

        cy.get('[data-cy="custom-url-field-error"]').should('not.exist');
    });

    it('displays error when error prop is present', () => {
        cy.mount(CustomUrlField, {
            props: {
                error,
            },
        });

        cy.get('[data-cy="custom-url-field-error"]').should('have.text', error);
    });

    it('displays error if quick link url is empty when add link button is clicked', () => {
        cy.mount(CustomUrlField);

        cy.get('[data-cy="custom-url-field-button"]').click();
        cy.get('[data-cy="custom-url-field-error"]').should('have.text', 'Please input a valid URL.');
    });

    it('displays error if given quick link url is invalid when add link button is clicked', () => {
        cy.mount(CustomUrlField);

        cy.get('[data-cy="custom-url-field-input"]').type(invalidQuickLink);
        cy.get('[data-cy="custom-url-field-button"]').click();

        cy.get('[data-cy="custom-url-field-error"]').should('have.text', 'Please input a valid URL.');
    });

    it('displays error if request to get quick link details fails', () => {
        cy.intercept('GET', '**/.netlify/functions/get-quick-link-details**', { forceNetworkError: true });

        cy.mount(CustomUrlField);

        cy.get('[data-cy="custom-url-field-input"]').type(validQuickLink);
        cy.get('[data-cy="custom-url-field-button"]').click();

        cy.get('[data-cy="custom-url-field-error"]').should(
            'have.text',
            'Failed to fetch quick link data, please try again.',
        );
    });

    it('clears error when typing a value in the url input field', () => {
        cy.mount(CustomUrlField, {
            props: {
                error,
            },
        });

        cy.get('[data-cy="custom-url-field-input"]').type(validQuickLink);
        cy.get('[data-cy="custom-url-field-error"]').should('not.exist');
    });

    it('clears input field when request to get quick link details succeeds', () => {
        cy.mount(CustomUrlField);

        cy.get('[data-cy="custom-url-field-input"]').type(validQuickLink);
        cy.get('[data-cy="custom-url-field-button"]').click();

        cy.get('[data-cy="custom-url-field-input"]').should('have.value', '');
    });

    it('dispatches "data" event with quick link details', () => {
        const onData = cy.spy();

        cy.mount(CustomUrlField).then(({ component }) => {
            component.$on('data', onData);
        });

        cy.get('[data-cy="custom-url-field-input"]').type(validQuickLink);
        cy.get('[data-cy="custom-url-field-button"]').click();

        cy.fixture('quicklinks.json').then((quickLinks) => {
            cy.wrap(onData).should(
                'have.been.calledWith',
                Cypress.sinon.match({
                    detail: quickLinks[0],
                }),
            );
        });
    });
});

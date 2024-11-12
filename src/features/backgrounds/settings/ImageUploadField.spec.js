import ImageUploadField from './ImageUploadField.svelte';

const name = 'image-upload-field';

// NOTE: Usually this would be done using cy.fixture() and then passing the alias to .selectFile(), however after the
// first time the fixture is used it seems to yield a file with no name and type, making the image checks fail. Passing
// a file path to .selectFile() seems to mitigate the issue.
const customImagePath = 'cypress/fixtures/unsplash-image.jpeg';
const invalidFilePath = 'cypress/fixtures/unsplash-image.json';

describe('ImageUploadField', () => {
    beforeEach(() => {
        cy.viewport(500, 500);
    });

    it('disables image upload input and set image button when disabled prop is true', () => {
        cy.mount(ImageUploadField, {
            props: {
                disabled: true,
                name,
            },
        });

        cy.get('[data-testid="image-upload-field-input"]').should('be.disabled');
        cy.get('[data-testid="image-upload-field-button"]').should('be.disabled');
    });

    it('enables image upload input when disabled prop is false', () => {
        cy.mount(ImageUploadField, {
            props: { name },
        });

        cy.get('[data-testid="image-upload-field-input"]').should('be.enabled');
        cy.get('[data-testid="image-upload-field-button"]').should('be.disabled');
    });

    it('enables set image button when disabled prop is false and an image is selected', () => {
        cy.mount(ImageUploadField, {
            props: { name },
        });

        cy.get('[data-testid="image-upload-field-input"]').selectFile(customImagePath, { force: true });
        cy.get('[data-testid="image-upload-field-button"]').should('be.enabled');
    });

    it('displays error when selected file is not an image', () => {
        const onChange = cy.spy();

        cy.mount(ImageUploadField, {
            props: { name },
        }).then(({ component }) => {
            component.$on('change', onChange);
        });

        cy.get('[data-testid="image-upload-field-input"]').selectFile(invalidFilePath, { force: true });
        cy.get('[data-testid="image-upload-field-button"]').click();

        cy.get('[data-testid="image-upload-field-error"]').should('have.text', 'Selected file is not an image.');
        cy.wrap(onChange).should('not.have.been.called');
    });

    it('dispatches "change" and "request" events when selected file is an image and set image button is clicked', () => {
        const onChange = cy.spy();
        const onRequest = cy.spy();

        cy.mount(ImageUploadField, {
            props: { name },
        }).then(({ component }) => {
            component.$on('change', onChange);
            component.$on('request', onRequest);
        });

        cy.get('[data-testid="image-upload-field-input"]').selectFile(customImagePath, { force: true });
        cy.get('[data-testid="image-upload-field-button"]').click();

        cy.wrap(onChange).should('have.been.called');
        cy.wrap(onRequest).should('have.been.called');
    });
});

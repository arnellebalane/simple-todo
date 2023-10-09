import AppConfirmation from './AppConfirmation.svelte';

const message = 'Confirmation message';
const confirmLabel = 'Custom confirm';
const cancelLabel = 'Custom cancel';

describe('AppConfirmation', () => {
    it('hides confirmation modal when show = false', () => {
        cy.mount(AppConfirmation, {
            props: {
                message,
            },
        });

        cy.get('[data-cy="confirm-message"]').should('not.exist');
    });

    it('shows confirmation modal when show = true', () => {
        cy.mount(AppConfirmation, {
            props: {
                show: true,
                message,
            },
        });

        cy.get('[data-cy="confirm-message"]').should('contain', message);
    });

    it('displays custom confirm button label', () => {
        cy.mount(AppConfirmation, {
            props: {
                show: true,
                message,
                confirmLabel,
            },
        });

        cy.get('[data-cy="confirm-btn"]').should('have.text', confirmLabel);
    });

    it('displays custom cancel button label', () => {
        cy.mount(AppConfirmation, {
            props: {
                show: true,
                message,
                cancelLabel,
            },
        });

        cy.get('[data-cy="cancel-btn"]').should('have.text', cancelLabel);
    });

    it('dispatches "confirm" event when confirm button is clicked', () => {
        const onConfirm = cy.spy();

        cy.mount(AppConfirmation, {
            props: {
                show: true,
                message,
            },
        }).then(({ component }) => {
            component.$on('confirm', onConfirm);
        });

        cy.get('[data-cy="confirm-btn"]').click();
        cy.wrap(onConfirm).should('have.been.called');
    });

    it('dispatches "cancel" event when cancel button is clicked', () => {
        const onCancel = cy.spy();

        cy.mount(AppConfirmation, {
            props: {
                show: true,
                message,
            },
        }).then(({ component }) => {
            component.$on('cancel', onCancel);
        });

        cy.get('[data-cy="cancel-btn"]').click();
        cy.wrap(onCancel).should('have.been.called');
    });
});

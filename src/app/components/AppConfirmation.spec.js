import AppConfirmation from './AppConfirmation.svelte';

describe('AppConfirmation', () => {
    const message = 'Confirmation message';
    const confirmLabel = 'Custom confirm';
    const cancelLabel = 'Custom cancel';

    it('hides confirmation modal when show = false', () => {
        cy.mount(AppConfirmation, {
            props: {
                message,
            },
        });
        cy.contains(message).should('not.exist');
    });

    it('shows confirmation modal when show = true', () => {
        cy.mount(AppConfirmation, {
            props: {
                show: true,
                message,
            },
        });
        cy.contains(message).should('be.visible');
    });

    it('renders custom confirm button label', () => {
        cy.mount(AppConfirmation, {
            props: {
                show: true,
                message,
                confirmLabel,
            },
        });
        cy.get('button').contains(confirmLabel).should('be.visible');
    });

    it('renders custom cancel button label', () => {
        cy.mount(AppConfirmation, {
            props: {
                show: true,
                message,
                cancelLabel,
            },
        });
        cy.get('button').contains(cancelLabel).should('be.visible');
    });

    it('dispatches "confirm" event when confirm button is clicked', () => {
        const onConfirm = cy.spy();
        cy.mount(AppConfirmation, {
            props: {
                show: true,
                message,
                confirmLabel,
            },
        }).then(({ component }) => {
            component.$on('confirm', onConfirm);
        });

        cy.get('button').contains(confirmLabel).click();
        cy.wrap(onConfirm).should('have.been.called');
    });

    it('dispatches "cancel" event when cancel button is clicked', () => {
        const onCancel = cy.spy();
        cy.mount(AppConfirmation, {
            props: {
                show: true,
                message,
                cancelLabel,
            },
        }).then(({ component }) => {
            component.$on('cancel', onCancel);
        });

        cy.get('button').contains(cancelLabel).click();
        cy.wrap(onCancel).should('have.been.called');
    });
});

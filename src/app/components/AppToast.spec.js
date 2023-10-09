import { toast } from '@app/stores/toast';
import AppToast from './AppToast.svelte';

const toastMessage = 'This is the toast message';
const actionLabel = 'Close';

describe('AppToast', () => {
    beforeEach(() => {
        toast.clear();
    });

    it('hides toast when there is no toast data in the store', () => {
        cy.mount(AppToast);

        cy.get('[data-cy="app-toast"]').should('not.exist');
    });

    it('displays toast when there is toast data in the store', () => {
        toast.set({ text: toastMessage });

        cy.mount(AppToast);

        cy.get('[data-cy="app-toast"]').should('be.visible');
        cy.get('[data-cy="toast-message"]').should('have.text', toastMessage);
    });

    it('displays toast action when a callback is specified in the toast data', () => {
        toast.set({
            text: toastMessage,
            onAction: cy.stub(),
        });

        cy.mount(AppToast);

        cy.get('[data-cy="toast-action"]').should('be.visible').should('have.text', 'OK');
    });

    it('displays toast action custom text when specified in the toast data', () => {
        toast.set({
            text: toastMessage,
            onAction: cy.stub(),
            actionText: actionLabel,
        });

        cy.mount(AppToast);

        cy.get('[data-cy="toast-action"]').should('have.text', actionLabel);
    });

    it('calls toast action callback when action button is clicked', () => {
        const onAction = cy.stub();
        toast.set({
            text: toastMessage,
            onAction,
        });

        cy.mount(AppToast);

        cy.get('[data-cy="toast-action"]').click();
        cy.wrap(onAction).should('have.been.called');
    });
});

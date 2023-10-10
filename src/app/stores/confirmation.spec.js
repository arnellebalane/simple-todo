import { confirmation } from '@app/stores/confirmation';

const message = 'Confirmation message';
const confirmLabel = 'Custom confirm';
const cancelLabel = 'Custom cancel';

describe('confirmation store', () => {
    it('sets confirmation state when confirmation.show is called', () => {
        const subscribe = cy.spy();

        confirmation.subscribe(subscribe);

        confirmation.show({ message, confirmLabel, cancelLabel });
        cy.wrap(subscribe).should('have.been.calledWith', { message, confirmLabel, cancelLabel });
    });

    it('resolves confirmation to true when confirmation.confirm is called', () => {
        const subscribe = cy.spy();

        confirmation.subscribe(subscribe);
        const promise = confirmation.show();

        confirmation.confirm();
        cy.wrap(promise).should('be.true');
    });

    it('resolves confirmation to false when confirmation.cancel is called', () => {
        const subscribe = cy.spy();

        confirmation.subscribe(subscribe);
        const promise = confirmation.show();

        confirmation.cancel();
        cy.wrap(promise).should('be.false');
    });
});

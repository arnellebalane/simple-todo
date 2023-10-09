import Modal from './Modal.svelte';

describe('Modal', () => {
    it('hides modal when show prop is false', () => {
        cy.mount(Modal, {
            props: {
                'data-cy': 'modal',
            },
        });

        cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('displays modal when show prop is true', () => {
        cy.mount(Modal, {
            props: {
                show: true,
                'data-cy': 'modal',
            },
        });

        cy.get('[data-cy="modal"]').should('be.visible');
    });

    it('does not dispatch "close" event when pressing escape key and closeOnEscape is false', () => {
        const onClose = cy.spy();

        cy.mount(Modal, {
            props: {
                show: true,
                closeOnEscape: false,
            },
        }).then(({ component }) => {
            component.$on('close', onClose);
        });

        cy.get('body').type('{esc}');
        cy.wrap(onClose).should('not.have.been.called');
    });

    it('dispatches "close" event when pressing escape key and closeOnEscape is true', () => {
        const onClose = cy.spy();

        cy.mount(Modal, {
            props: {
                show: true,
                closeOnEscape: true,
            },
        }).then(({ component }) => {
            component.$on('close', onClose);
        });

        cy.get('body').type('{esc}');
        cy.wrap(onClose).should('have.been.called');
    });

    it('does not dispatch "close" event when clicking outside the modal content and closeOnClickOutside is false', () => {
        const onClose = cy.spy();

        cy.mount(Modal, {
            props: {
                show: true,
                closeOnClickOutside: false,
                'data-cy': 'modal',
            },
        }).then(({ component }) => {
            component.$on('close', onClose);
        });

        cy.get('[data-cy="modal"]').click();
        cy.wrap(onClose).should('not.have.been.called');
    });

    it('does not dispatch "close" event when clicking inside the modal content', () => {
        const onClose = cy.spy();

        cy.mount(Modal, {
            props: {
                show: true,
                closeOnClickOutside: true,
                'data-cy': 'modal',
            },
        }).then(({ component }) => {
            component.$on('close', onClose);
        });

        cy.get('[data-cy="modal-content"]').click();
        cy.wrap(onClose).should('not.have.been.called');
    });

    it('dispatches "close" event when clicking outside the modal content and closeOnClickOutside is true', () => {
        const onClose = cy.spy();

        cy.mount(Modal, {
            props: {
                show: true,
                closeOnClickOutside: true,
                'data-cy': 'modal',
            },
        }).then(({ component }) => {
            component.$on('close', onClose);
        });

        cy.get('[data-cy="modal"]').click();
        cy.wrap(onClose).should('have.been.called');
    });
});

import TodoFormModal from './TodoFormModal.svelte';

describe('TodoFormModal', () => {
    it('hides the modal when show prop is false', () => {
        cy.mount(TodoFormModal);

        cy.get('[data-testid="todo-form-modal"]').should('not.exist');
    });

    it('displays the modal when show prop is true', () => {
        cy.mount(TodoFormModal, {
            props: {
                show: true,
            },
        });

        cy.get('[data-testid="todo-form-modal"]').should('be.visible');
    });
});

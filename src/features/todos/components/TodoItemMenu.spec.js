import TodoItemMenu from './TodoItemMenu.svelte';

describe('TodoItemMenu', () => {
    beforeEach(() => {
        cy.viewport(100, 100);
    });

    it('displays toggle button by default', () => {
        cy.mount(TodoItemMenu);

        cy.get('[data-cy="todo-item-toggle"]').should('be.visible');
        cy.get('[data-cy="todo-item-edit"]').should('not.be.visible');
        cy.get('[data-cy="todo-item-delete"]').should('not.be.visible');
    });

    it('dispatches "edit" event when edit menu action is clicked', () => {
        const editSpy = cy.spy();

        cy.mount(TodoItemMenu).then(({ component }) => {
            component.$on('edit', editSpy);
        });

        cy.get('[data-cy="todo-item-edit"]').click({ force: true });
        cy.wrap(editSpy).should('have.been.called');
    });

    it('dispatches "delete" event when delete menu action is clicked', () => {
        const deleteSpy = cy.spy();

        cy.mount(TodoItemMenu).then(({ component }) => {
            component.$on('delete', deleteSpy);
        });

        cy.get('[data-cy="todo-item-delete"]').click({ force: true });
        cy.wrap(deleteSpy).should('have.been.called');
    });
});

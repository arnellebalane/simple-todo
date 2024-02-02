import TodoListHeader from './TodoListHeader.svelte';

const title = 'list title';
const total = 1;

describe('TodoListHeader', () => {
    beforeEach(() => {
        cy.viewport(500, 500);
    });

    it('displays todo list title and add todo button', () => {
        cy.mount(TodoListHeader, {
            props: {
                title,
                total,
            },
        });

        cy.get('[data-cy="todo-list-header"]').should('contain.text', title);
        cy.get('[data-cy="todo-list-header-add-btn"]').should('be.visible');
    });

    it('hides add todo button when there are no todos', () => {
        cy.mount(TodoListHeader, {
            props: {
                title,
                total: 0,
            },
        });

        cy.get('[data-cy="todo-list-header-add-btn"]').should('not.exist');
    });

    it('dispatches "addtodo" event when add todo button is clicked', () => {
        const addTodoSpy = cy.spy();

        cy.mount(TodoListHeader, {
            props: {
                title,
                total,
            },
        }).then(({ component }) => {
            component.$on('addtodo', addTodoSpy);
        });

        cy.get('[data-cy="todo-list-header-add-btn"]').click();
        cy.wrap(addTodoSpy).should('have.been.called');
    });
});

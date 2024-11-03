import TodoItemTags from './TodoItemTags.svelte';

describe('TodoItemTags', () => {
    beforeEach(() => {
        cy.viewport(200, 200);
    });

    it('displays the provided list of tags', () => {
        const tags = ['one', 'two', 'three'];

        cy.mount(TodoItemTags, {
            props: { tags },
        });

        for (const tag of tags) {
            cy.get('[data-cy="todo-item-tag"]').contains(tag).should('be.visible');
        }
    });
});

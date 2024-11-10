<script>
import { dndzone, TRIGGERS } from 'svelte-dnd-action';

import TodoItem from './TodoItem.svelte';

let { todos, onUpdate, onUpdateTodo, onEditTodo, onDeleteTodo } = $props();

const handleDragAndDrop = (event) => {
    todos = event.detail.items.map((todo, i, items) => ({ ...todo, order: items.length - i }));
    if (event.detail.info.trigger == TRIGGERS.DROPPED_INTO_ZONE) {
        onUpdate?.(todos);
    }
};
</script>

<ol
    class="TodoListItems"
    use:dndzone={{ items: todos, dropTargetStyle: {} }}
    onconsider={handleDragAndDrop}
    onfinalize={handleDragAndDrop}
    data-cy="todo-list-dropzone"
>
    {#each todos as todo (todo.id)}
        <TodoItem
            {todo}
            onChange={onUpdateTodo}
            onEdit={() => onEditTodo?.(todo)}
            onDelete={() => onDeleteTodo?.(todo)}
        />
    {/each}
</ol>

<style>
.TodoListItems {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    height: 100%;
    padding: 0 6px 6px 1.4rem;
    margin: 0 -1.4rem;
    list-style: none;
    overflow-y: scroll;
}

.TodoListItems::-webkit-scrollbar {
    width: 8px;
}

.TodoListItems::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    background-color: var(--dimmed-300);
}
</style>

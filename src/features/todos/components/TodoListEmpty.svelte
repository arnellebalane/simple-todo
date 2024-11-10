<script>
import { dndzone, TRIGGERS } from 'svelte-dnd-action';

import Button from '@components/Button.svelte';
import TodoItem from './TodoItem.svelte';

let { text, class: componentClass, onUpdate, onAddTodo } = $props();

let todos = $state([]);
const isEmpty = $derived(todos.length === 0);

const handleDragAndDrop = (event) => {
    todos = event.detail.items;
    if (event.detail.info.trigger == TRIGGERS.DROPPED_INTO_ZONE) {
        onUpdate?.(todos);
    }
};
</script>

<div class="TodoListEmpty {componentClass}" data-cy="todo-list-empty">
    <div
        class="DropZone"
        class:absolute={isEmpty}
        use:dndzone={{ items: todos, dropTargetStyle: {} }}
        onconsider={handleDragAndDrop}
        onfinalize={handleDragAndDrop}
        data-cy="todo-list-dropzone"
    >
        {#each todos as todo (todos.id)}
            <TodoItem {todo} />
        {/each}
    </div>

    {#if isEmpty}
        <p>{text}</p>
        <Button small class="Button" onClick={onAddTodo} data-cy="todo-list-empty-add-btn">Add Todo</Button>
    {/if}
</div>

<style>
.TodoListEmpty {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(50% - 2rem);
}

p {
    position: relative;
    padding: 1.2rem 2.4rem;
    text-align: center;
    color: var(--dimmed-500);
}

div :global(.Button) {
    position: relative;
}

.DropZone {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200%;
}

:global(body[data-background]) .DropZone {
    position: initial;
}

:global(body[data-background]) .DropZone.absolute {
    position: absolute;
    height: 100%;
}
</style>

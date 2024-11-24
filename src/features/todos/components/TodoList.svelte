<script>
import TodoListEmpty from './TodoListEmpty.svelte';
import TodoListHeader from './TodoListHeader.svelte';
import TodoListItems from './TodoListItems.svelte';

let { title, todos, emptyText, onUpdate, onAddTodo, onUpdateTodo, onEditTodo, onDeleteTodo, ...restProps } = $props();

const total = $derived(todos.length);
const isEmpty = $derived(total === 0);
</script>

<article {...restProps}>
    <TodoListHeader {title} {total} {onAddTodo} />

    {#if isEmpty}
        <TodoListEmpty text={emptyText} {onUpdate} {onAddTodo} />
    {:else}
        <TodoListItems {todos} {onUpdate} {onUpdateTodo} {onEditTodo} {onDeleteTodo} />
    {/if}
</article>

<style>
article {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;

    padding: 2rem;
    border-radius: 1.6rem;
    background-color: var(--dimmed-100);
}

:global(body[data-background]) article {
    background-color: var(--main-transparent);
}
</style>

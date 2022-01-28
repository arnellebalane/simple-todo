<script>
import TodoListHeader from './TodoListHeader.svelte';
import TodoListEmpty from './TodoListEmpty.svelte';
import TodoListItems from './TodoListItems.svelte';

export let title;
export let todos;
export let emptyText;

$: total = todos.length;
$: isEmpty = total === 0;
</script>

<article class={$$props.class}>
  <TodoListHeader {title} {total} on:addtodo />

  {#if isEmpty}
    <TodoListEmpty text={emptyText} on:update on:addtodo />
  {:else}
    <TodoListItems {todos} on:update on:updatetodo on:edittodo on:deletetodo />
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

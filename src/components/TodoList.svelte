<script>
import TodoListHeader from '@components/TodoListHeader.svelte';
import TodoListEmpty from '@components/TodoListEmpty.svelte';
import TodoItem from '@components/TodoItem.svelte';

export let title;
export let todos;
export let emptyText;

$: done = todos.filter((todo) => todo.done).length;
$: total = todos.length;
$: isEmpty = total === 0;
</script>

<article>
  <TodoListHeader {title} {done} {total} />

  {#if isEmpty}
    <TodoListEmpty text={emptyText} />
  {:else}
    <ol>
      {#each todos as todo}
        <TodoItem {todo} on:toggle />
      {/each}
    </ol>
  {/if}
</article>

<style>
article {
  display: grid;
  grid-template-rows: max-content 1fr;
  row-gap: 2rem;

  padding: 2rem;
  border-radius: 1.6rem;
  background-color: #f9fafb;
}

ol {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  padding: 0;
  padding-right: 6px;
  margin-right: -1.4rem;
  list-style: none;
  overflow-y: scroll;
}

ol::-webkit-scrollbar {
  width: 8px;
}

ol::-webkit-scrollbar-thumb {
  border-radius: 1rem;
  background-color: #e5e7eb;
}
</style>

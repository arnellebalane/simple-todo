<script>
import TodoListHeader from '@components/TodoListHeader.svelte';
import TodoAddButton from '@components/TodoAddButton.svelte';
import TodoItem from '@components/TodoItem.svelte';

export let title;
export let todos;

$: done = todos.filter((todo) => todo.done).length;
$: total = todos.length;
</script>

<article>
  <TodoListHeader {title} {done} {total} />
  <TodoAddButton />

  <ol>
    {#each todos as todo}
      <TodoItem {todo} on:toggle />
    {/each}
  </ol>
</article>

<style>
article {
  display: grid;
  grid-template-rows: repeat(2, max-content) 1fr;
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
  padding-right: 8px;
  margin-right: -1.6rem;
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

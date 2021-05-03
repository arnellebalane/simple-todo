<script>
import TodoListHeader from '@components/TodoListHeader.svelte';
import TodoAddButton from '@components/TodoAddButton.svelte';
import TodoItem from '@components/TodoItem.svelte';

export let title;
export let todos;
</script>

<article>
  <TodoListHeader {title} />
  <TodoAddButton />

  <ol>
    {#each todos as todo}
      <TodoItem {todo} />
    {/each}
  </ol>
</article>

<style>
article {
  padding: 2rem;
  border-radius: 1.6rem;
  background-color: #f9fafb;
}

ol {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  padding: 0;
  list-style: none;
}
</style>

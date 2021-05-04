<script>
import { createEventDispatcher } from 'svelte';
import TodoItem from '@components/TodoItem.svelte';

const dispatch = createEventDispatcher();

export let todos;

function handleUpdateTodo(event) {
  dispatch('updatetodo', event.detail);
}
</script>

<ol>
  {#each todos as todo}
    <TodoItem {todo} on:update={handleUpdateTodo} />
  {/each}
</ol>

<style>
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

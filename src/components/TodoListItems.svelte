<script>
import { createEventDispatcher } from 'svelte';
import { dndzone, TRIGGERS } from 'svelte-dnd-action';
import TodoItem from '@components/TodoItem.svelte';

const dispatch = createEventDispatcher();

export let todos;

function handleUpdateTodo(event) {
  dispatch('updatetodo', event.detail);
}

function handleConsider(event) {
  todos = event.detail.items.map((todo, i, items) => ({ ...todo, order: items.length - i }));
}

function handleFinalize(event) {
  todos = event.detail.items.map((todo, i, items) => ({ ...todo, order: items.length - i }));
  if (event.detail.info.trigger == TRIGGERS.DROPPED_INTO_ZONE) {
    dispatch('update', todos);
  }
}
</script>

<ol use:dndzone={{ items: todos }} on:consider={handleConsider} on:finalize={handleFinalize}>
  {#each todos as todo (todo.id)}
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

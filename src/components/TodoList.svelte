<script>
import TodoListHeader from '@components/TodoListHeader.svelte';
import TodoListEmpty from '@components/TodoListEmpty.svelte';
import TodoListItems from '@components/TodoListItems.svelte';

export let title;
export let todos;
export let emptyText;

$: done = todos.filter((todo) => todo.done).length;
$: total = todos.length;
$: isEmpty = total === 0;
</script>

<article class={$$props.class}>
  <TodoListHeader {title} {done} {total} />

  {#if isEmpty}
    <TodoListEmpty text={emptyText} on:addtodo />
  {:else}
    <TodoListItems {todos} on:updatetodo />
  {/if}
</article>

<style>
article {
  display: grid;
  grid-template-rows: max-content 1fr;
  row-gap: 2rem;
  width: 100%;

  padding: 2rem;
  border-radius: 1.6rem;
  background-color: #f9fafb;
}
</style>

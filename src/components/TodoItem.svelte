<script>
import { createEventDispatcher } from 'svelte';
import Checkbox from '@components/Checkbox.svelte';

export let todo;

const dispatch = createEventDispatcher();

function toggleTodoDone(event) {
  dispatch('update', { id: todo.id, done: event.detail });
}
</script>

<li class={$$props.class} class:done={todo.done}>
  <Checkbox checked={todo.done} on:change={toggleTodoDone} />
  <p>{todo.body}</p>
</li>

<style>
li {
  display: flex;
  align-items: flex-start;
  gap: 1.6rem;

  padding: 1.6rem;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.01) 0px 2px 4px -1px;
}

li.done {
  opacity: 0.6;
}

li.done p {
  text-decoration: line-through;
  color: #9ca3af;
}

p {
  word-break: break-word;
}
</style>

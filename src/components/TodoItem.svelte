<script>
import { createEventDispatcher } from 'svelte';
import { SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
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

  {#if todo[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
    <div class="TodoItemShadow" />
  {/if}
</li>

<style>
li {
  position: relative;
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

p {
  word-break: break-word;
}

li.done p {
  text-decoration: line-through;
  color: #9ca3af;
}

.TodoItemShadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px dashed #e5e7eb;
  border-radius: 8px;
  background-color: #f3f4f6;
  visibility: visible;
}
</style>

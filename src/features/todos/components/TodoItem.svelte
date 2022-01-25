<script>
import { createEventDispatcher } from 'svelte';
import { SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';

import { settings } from '@stores/settings';

import Checkbox from '@components/Checkbox.svelte';
import TodoItemMenu from './TodoItemMenu.svelte';
import TodoItemTags from './TodoItemTags.svelte';

export let todo;
$: hasTags = (todo.tags?.length ?? 0) > 0;

const dispatch = createEventDispatcher();
const toggleTodoDone = (event) => dispatch('update', { id: todo.id, done: event.detail });
</script>

<li
  class={$$props.class}
  class:done={todo.done}
  class:private={$settings.enablePrivacyMode}
  on:dblclick={() => dispatch('edit')}
>
  <Checkbox checked={todo.done} on:change={toggleTodoDone} />
  <div class="TodoDetails">
    <p><span>{todo.body}</span></p>
    {#if hasTags}
      <TodoItemTags class="TodoItemTags" tags={todo.tags} />
    {/if}
  </div>
  <TodoItemMenu class="TodoItemMenu" on:edit on:delete />

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
  background-color: var(--main);
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.01) 0px 2px 4px -1px;
}

li.done {
  opacity: 0.6;
}

li.private {
  pointer-events: none;
}

li.private > :global(*) {
  opacity: 0;
}

@supports (filter: blur(1px)) {
  li.private > :global(*) {
    opacity: initial;
    filter: blur(1rem);
  }
}

p {
  flex-grow: 1;
  word-break: break-word;
}

p span {
  white-space: pre-line;
}

li.done p {
  text-decoration: line-through;
  color: var(--dimmed-400);
}

.TodoItemShadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px dashed var(--dimmed-300);
  border-radius: 8px;
  background-color: var(--dimmed-200);
  visibility: visible;
}

li :global(.TodoItemMenu) {
  position: absolute;
  top: 1px;
  right: 1px;
  height: calc(100% - 2px);
}

li:not(:hover) :global(.TodoItemMenu) {
  display: none;
}

li :global(.TodoItemTags) {
  margin-top: 1.6rem;
}
</style>

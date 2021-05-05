<script>
import { createEventDispatcher } from 'svelte';
import { dndzone, TRIGGERS } from 'svelte-dnd-action';
import Button from '@components/Button.svelte';
import TodoItem from '@components/TodoItem.svelte';

const dispatch = createEventDispatcher();

export let text;

let todos = [];
$: isEmpty = todos.length === 0;

function handleDragAndDrop(event) {
  todos = event.detail.items;
  if (event.detail.info.trigger == TRIGGERS.DROPPED_INTO_ZONE) {
    dispatch('update', todos);
  }
}
</script>

<div class={`TodoListEmpty ${$$props.class ?? ''}`}>
  <div
    class="DropZone"
    use:dndzone={{ items: todos, dropTargetStyle: {} }}
    on:consider={handleDragAndDrop}
    on:finalize={handleDragAndDrop}
  >
    {#each todos as todo (todos.id)}
      <TodoItem {todo} />
    {/each}
  </div>

  {#if isEmpty}
    <p>{text}</p>
    <Button class="Button" small on:click={() => dispatch('addtodo')}>Add Todo</Button>
  {/if}
</div>

<style>
.TodoListEmpty {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50%;
}

p {
  position: relative;
  padding: 1.2rem 2.4rem;
  text-align: center;
  color: #6b7280;
}

div :global(.Button) {
  position: relative;
}

.DropZone {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200%;
}
</style>

<script>
import { createEventDispatcher } from 'svelte';
import dayjs from 'dayjs';
import Button from '@components/Button.svelte';
import { todos, removeDoneTimer } from '@stores/todos';

$: canUndoRemove = $removeDoneTimer > 0;
$: hasDoneTodos = $todos.some((todo) => todo.done);

const dispatch = createEventDispatcher();

const today = dayjs().format('dddd, MMMM D');
</script>

<header class={$$props.class}>
  <h1>{today}</h1>

  <Button primary on:click={() => dispatch('addtodo')}>Add Todo</Button>
  {#if canUndoRemove}
    <Button class="UndoRemoveButton" on:click={() => dispatch('undoremovedone')}>
      <div class="Progress" style="--progress: {$removeDoneTimer * 100}%" />
      <span>Undo Remove</span>
    </Button>
  {:else}
    <Button class="RemoveDoneButton" text on:click={() => dispatch('removedone')} disabled={!hasDoneTodos}>
      Remove Done
    </Button>
  {/if}
</header>

<style>
header {
  display: flex;
  align-items: center;
  gap: 4px;
}

h1 {
  margin-right: auto;
  font-size: 4.2rem;
  font-weight: 700;
  letter-spacing: -1px;
}

header :global(.UndoRemoveButton) {
  position: relative;
  background-color: var(--dimmed-200);
  overflow: hidden;
}

header :global(.UndoRemoveButton),
header :global(.RemoveDoneButton) {
  min-width: 15rem;
}

span {
  position: relative;
}

.Progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--dimmed-300);
  transform: translateX(calc(var(--progress) * -1));
}
</style>

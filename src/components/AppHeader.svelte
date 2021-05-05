<script>
import { createEventDispatcher } from 'svelte';
import dayjs from 'dayjs';
import Button from '@components/Button.svelte';
import { todos } from '@stores/todos';

const removeDoneTimer = todos.removeDoneTimer;
$: canUndoRemove = $removeDoneTimer > 0;

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
    <Button text on:click={() => dispatch('removedone')}>Remove Done</Button>
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
  font-size: 4.8rem;
  font-weight: 100;
}

header :global(.UndoRemoveButton) {
  position: relative;
  background-color: var(--dimmed-200);
  overflow: hidden;
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

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

  <div class="ButtonsWrapper">
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
  </div>
</header>

<style>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  margin-right: auto;
  font-size: 4.4rem;
  font-weight: 700;
  line-height: 6rem;
  letter-spacing: -1px;
}

:global(body.fonts-loading) h1 {
  font-size: 4.1rem;
  line-height: 1.45;
  letter-spacing: -0.45px;
}

:global(body[data-background]) h1 {
  text-shadow: 0 -1px 0 var(--main-transparent), 1px 0 0 var(--main-transparent), 0 1px 0 var(--main-transparent),
    -1px 0 0 var(--main-transparent);
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

.ButtonsWrapper {
  display: flex;
  gap: 8px;
  padding: 8px;
  border-radius: 8px;
}

:global(body[data-background]) .ButtonsWrapper {
  background-color: var(--main-transparent);
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

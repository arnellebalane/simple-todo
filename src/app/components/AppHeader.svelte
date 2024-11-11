<script>
import dayjs from 'dayjs';

import Button from '@components/Button.svelte';
import SearchForm from '@features/search/components/SearchForm.svelte';

import { removeDoneTimer, todos } from '@features/todos/store';

let { class: componentClass, onAddTodo, onRemoveDone, onUndoRemoveDone } = $props();

const canUndoRemove = $derived($removeDoneTimer > 0);
const hasDoneTodos = $derived($todos.some((todo) => todo.done));

const today = dayjs().format('dddd, MMMM D');
</script>

<header class={componentClass} data-cy="app-header">
    <h1 data-cy="today">{today}</h1>

    <div class="HeaderActions">
        <SearchForm />

        <div class="HeaderButtons">
            <Button primary onClick={onAddTodo} data-cy="add-todo-btn">Add Todo</Button>
            {#if canUndoRemove}
                <Button class="UndoRemoveButton" onClick={onUndoRemoveDone} data-cy="undo-remove-btn">
                    <div class="Progress" style="--progress: {$removeDoneTimer * 100}%"></div>
                    <span>Undo Remove</span>
                </Button>
            {:else}
                <Button
                    text
                    class="RemoveDoneButton"
                    onClick={onRemoveDone}
                    disabled={!hasDoneTodos}
                    data-cy="remove-done-btn"
                >
                    Remove Done
                </Button>
            {/if}
        </div>
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
    font-size: 3.6rem;
    font-weight: 700;
    line-height: 6rem;
    letter-spacing: -1px;
}

:global(body.fonts-loading) h1 {
    letter-spacing: -1.5px;
}

:global(body[data-background]) h1 {
    text-shadow:
        0 -1px 0 var(--main-transparent),
        1px 0 0 var(--main-transparent),
        0 1px 0 var(--main-transparent),
        -1px 0 0 var(--main-transparent);
}

header :global(.UndoRemoveButton) {
    position: relative;
    background-color: var(--dimmed-200);
    overflow: hidden;
}

header :global(.UndoRemoveButton),
header :global(.RemoveDoneButton) {
    min-width: 15.6rem;
}

.HeaderActions,
.HeaderButtons {
    display: flex;
    gap: 8px;
}

.HeaderButtons {
    padding: 8px;
    border-radius: 8px;
}

:global(body[data-background]) .HeaderButtons {
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

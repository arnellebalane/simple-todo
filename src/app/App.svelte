<script>
import cloneDeep from 'lodash/cloneDeep';
import { onDestroy, onMount } from 'svelte';

import TodoBoard from '@features/todos/components/TodoBoard.svelte';
import TodoFormModal from '@features/todos/components/TodoFormModal.svelte';
import AppBottomBar from './components/AppBottomBar.svelte';
import AppConfirmation from './components/AppConfirmation.svelte';
import AppHeader from './components/AppHeader.svelte';
import AppTooltip from './components/AppTooltip.svelte';
import AppTopBar from './components/AppTopBar.svelte';

import { confirmation } from '@app/stores/confirmation';
import { search } from '@features/search/store';
import { disableShortcut, enableShortcut } from '@features/shortcuts';
import { tags } from '@features/tags/store';
import { initialTodoFormData } from '@features/todos';
import { todos } from '@features/todos/store';
import { config } from '@lib/config';

const filteredTodos = $derived(search.filterTodos($todos));

let todoFormData = $state(initialTodoFormData);
let showTodoForm = $state(false);
const setShowTodoForm = (show, data = initialTodoFormData) => {
    showTodoForm = show;
    todoFormData = cloneDeep(data);
};
const updateTodoFormData = (data) => (todoFormData = data);
const showTodoFormWithData = (data) => setShowTodoForm(true, data);

const removeTodoItem = async (todo) => {
    const confirmed = await confirmation.show({
        message: 'Are you sure you want to remove this todo?',
        confirmLabel: 'Remove',
    });
    if (confirmed) {
        todos.remove(todo);
    }
};
const saveTodoItem = (todo) => {
    todos.save(todo);
    tags.add(todo.tags);
    setShowTodoForm(false);
};

onMount(() => enableShortcut('addTodo', () => setShowTodoForm(true)));
onDestroy(() => disableShortcut('addTodo'));
</script>

<svelte:head>
    {#if config.MODE === 'production'}
        <script
            async
            defer
            data-website-id="04fff70a-12ee-4ce7-9666-c61bedf0a5e7"
            data-do-not-track="true"
            data-auto-track={config.VITE_PUBLIC_IS_WEB_BUILD === 'true'}
            data-host-url="https://umami.arnelle.dev"
            src="./vendor/umami.js"
        ></script>
    {/if}
</svelte:head>

<main>
    <AppTopBar />

    <div class="AppContent">
        <AppHeader
            class="AppHeader"
            onAddTodo={() => setShowTodoForm(true)}
            onRemoveDone={todos.removeDone}
            onUndoRemoveDone={todos.undoRemoveDone}
        />
        <TodoBoard
            class="TodoBoard"
            todos={$filteredTodos}
            onAddTodo={showTodoFormWithData}
            onUpdateTodo={todos.update}
            onEditTodo={showTodoFormWithData}
            onDeleteTodo={removeTodoItem}
            onUpdate={todos.updateList}
        />
    </div>

    <AppBottomBar />
</main>

<TodoFormModal
    show={showTodoForm}
    bind:data={todoFormData}
    onChange={updateTodoFormData}
    onSubmit={saveTodoItem}
    onCancel={() => setShowTodoForm(false)}
/>

<AppConfirmation
    show={Boolean($confirmation)}
    message={$confirmation?.message}
    confirmLabel={$confirmation?.confirmLabel}
    cancelLabel={$confirmation?.cancelLabel}
    onConfirm={confirmation.confirm}
    onCancel={confirmation.cancel}
/>
<AppTooltip />

<style>
main {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
}

.AppContent {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 4.8rem;
    width: 100%;
    min-width: 90rem;
    max-width: 140rem;
    padding: 0 4.8rem;
}

.AppContent :global(.AppHeader) {
    margin-top: auto;
}

.AppContent :global(.TodoBoard) {
    flex-grow: 1;
    margin-bottom: auto;
}
</style>

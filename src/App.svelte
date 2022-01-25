<script>
import { onMount, onDestroy } from 'svelte';
import cloneDeep from 'lodash/cloneDeep';

import { enableShortcut, disableShortcut } from '@lib/shortcuts';
import { confirmation } from '@stores/confirmation';
import { tags } from '@stores/tags';
import { todos } from '@features/todos/store';

import AppTopBar from '@components/AppTopBar.svelte';
import AppBottomBar from '@components/AppBottomBar.svelte';
import AppHeader from '@components/AppHeader.svelte';
import AppTooltip from '@components/AppTooltip.svelte';
import ConfirmationModal from '@components/ConfirmationModal.svelte';
import TodoFormModal from '@features/todos/components/TodoFormModal.svelte';
import TodoBoard from '@features/todos/components/TodoBoard.svelte';

let todoFormData = {};
let showTodoForm = false;
const setShowTodoForm = (show, data) => {
  showTodoForm = show;
  todoFormData = cloneDeep(data);
};

const showTodoFormWithData = (event) => setShowTodoForm(true, event.detail);
const updateTodoItem = (event) => todos.update(event.detail);
const removeTodoItem = async (event) => {
  const confirmed = await confirmation.show({
    message: 'Are you sure you want to remove this todo?',
    confirmLabel: 'Remove',
  });
  if (confirmed) {
    todos.remove(event.detail);
  }
};
const saveTodoItem = (event) => {
  todos.save(event.detail);
  tags.add(event.detail.tags);
  setShowTodoForm(false);
};
const updateTodos = (event) => todos.set(event.detail);
const removeDoneTodos = () => todos.removeDone();
const undoRemoveDoneTodos = () => todos.undoRemoveDone();

onMount(() => enableShortcut('addTodo', () => setShowTodoForm(true)));
onDestroy(() => disableShortcut('togglePrivacyMode'));
</script>

<svelte:head>
  {#if import.meta.env.NODE_ENV === 'production'}
    <script
      async
      defer
      data-website-id="3937ad1a-ecfd-44cb-8e16-07cda3b01dc4"
      data-do-not-track="true"
      data-auto-track={import.meta.env.SNOWPACK_PUBLIC_IS_WEB_BUILD === 'true'}
      data-host-url="https://umami.patootie.app"
      src="./vendor/umami.js"></script>
  {/if}
</svelte:head>

<main>
  <AppTopBar />

  <div class="AppContent">
    <AppHeader
      class="AppHeader"
      on:addtodo={() => setShowTodoForm(true)}
      on:removedone={removeDoneTodos}
      on:undoremovedone={undoRemoveDoneTodos}
    />
    <TodoBoard
      class="TodoBoard"
      todos={$todos}
      on:addtodo={showTodoFormWithData}
      on:updatetodo={updateTodoItem}
      on:edittodo={showTodoFormWithData}
      on:deletetodo={removeTodoItem}
      on:update={updateTodos}
    />
  </div>

  <AppBottomBar />
</main>

<TodoFormModal
  show={showTodoForm}
  data={todoFormData}
  on:submit={saveTodoItem}
  on:cancel={() => setShowTodoForm(false)}
/>
<ConfirmationModal
  show={Boolean($confirmation)}
  message={$confirmation?.message}
  confirmLabel={$confirmation?.confirmLabel}
  cancelLabel={$confirmation?.cancelLabel}
  on:confirm={confirmation.confirm}
  on:cancel={confirmation.cancel}
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

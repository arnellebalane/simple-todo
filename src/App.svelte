<script>
import AppTopBar from '@components/AppTopBar.svelte';
import AppBottomBar from '@components/AppBottomBar.svelte';
import AppHeader from '@components/AppHeader.svelte';
import Toast from '@components/Toast.svelte';
import TodoFormModal from '@components/TodoFormModal.svelte';
import TodoBoard from '@components/TodoBoard.svelte';
import { todos } from '@stores/todos';
import { toast } from '@stores/toast';

let todoFormData = {};
let showTodoForm = false;
const toggleTodoForm = (show, data) => {
  showTodoForm = show;
  todoFormData = data;
};

const showTodoFormWithData = (event) => toggleTodoForm(true, event.detail);
const updateTodoItem = (event) => todos.update(event.detail);
const removeTodoItem = (event) => {
  todos.remove(event.detail);
  toast.set({
    text: 'Todo deleted',
    actionText: 'Undo',
    onAction: () => todos.undoRemove(),
    timer: todos.removeTodoTimerFinished,
  });
};
const saveTodoItem = (event) => {
  todos.save(event.detail);
  toggleTodoForm(false);
};
const updateTodos = (event) => todos.set(event.detail);
const removeDoneTodos = () => todos.removeDone();
const undoRemoveDoneTodos = () => todos.undoRemoveDone();
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
      on:addtodo={() => toggleTodoForm(true)}
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
  on:cancel={() => toggleTodoForm(false)}
/>

<Toast />

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

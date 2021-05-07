<script>
import AppTopBar from '@components/AppTopBar.svelte';
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

<TodoFormModal
  show={showTodoForm}
  data={todoFormData}
  on:submit={saveTodoItem}
  on:cancel={() => toggleTodoForm(false)}
/>

<Toast />

<style>
.AppContent {
  display: flex;
  flex-direction: column;
  gap: 4.8rem;
  min-width: 90rem;
  max-width: 140rem;
  min-height: 100vh;
  padding: 4.8rem;
  padding-top: calc(4.8rem + 6.4rem);
  margin: auto;
}

.AppContent :global(.AppHeader) {
  margin-top: auto;
}

.AppContent :global(.TodoBoard) {
  flex-grow: 1;
  min-height: 30rem;
  max-height: 80rem;
  margin-bottom: auto;
}
</style>

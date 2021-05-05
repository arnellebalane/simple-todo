<script>
import AppHeader from '@components/AppHeader.svelte';
import Modal from '@components/Modal.svelte';
import TodoForm from '@components/TodoForm.svelte';
import TodoBoard from '@components/TodoBoard.svelte';
import { todos } from '@stores/todos';

let todoFormData = {};
let openTodoForm = false;
const toggleTodoForm = (show, data) => {
  openTodoForm = show;
  todoFormData = data;
};

const openTodoFormWithData = (event) => toggleTodoForm(true, event.detail);
const updateTodoItem = (event) => todos.update(event.detail);
const removeTodoItem = (event) => todos.remove(event.detail);
const saveTodoItem = (event) => {
  todos.save(event.detail);
  toggleTodoForm(false);
};
const updateTodos = (event) => todos.set(event.detail);
const removeDoneTodos = () => todos.removeDone();
const undoRemoveDoneTodos = () => todos.undoRemoveDone();
</script>

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
    on:addtodo={openTodoFormWithData}
    on:updatetodo={updateTodoItem}
    on:edittodo={openTodoFormWithData}
    on:deletetodo={removeTodoItem}
    on:update={updateTodos}
  />
</div>

<Modal open={openTodoForm}>
  <TodoForm data={todoFormData} on:submit={saveTodoItem} on:cancel={() => toggleTodoForm(false)} />
</Modal>

<style>
.AppContent {
  display: flex;
  flex-direction: column;
  gap: 4.8rem;
  min-width: 90rem;
  max-width: 140rem;
  min-height: 100vh;
  padding: 4.8rem;
  margin: auto;
}

.AppContent :global(.AppHeader) {
  flex-shrink: 0;
  margin-top: auto;
}

.AppContent :global(.TodoBoard) {
  flex-grow: 1;
  min-height: 30rem;
  max-height: 80rem;
  margin-bottom: auto;
}
</style>

<script>
import * as uuid from 'uuid';
import AppHeader from '@components/AppHeader.svelte';
import Modal from '@components/Modal.svelte';
import TodoForm from '@components/TodoForm.svelte';
import TodoBoard from '@components/TodoBoard.svelte';
import { LOCALSTORAGE_KEY } from '@lib/constants';

const cachedTodos = localStorage.getItem(LOCALSTORAGE_KEY);
let todos = cachedTodos ? JSON.parse(cachedTodos) : [];
$: localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(todos));

let todoFormData = {};
let openTodoForm = false;
function toggleTodoForm(show, data = {}) {
  openTodoForm = show;
  todoFormData = data;
}

function updateTodoItem(event) {
  todos = todos.map((todo) => (todo.id === event.detail.id ? { ...todo, ...event.detail } : todo));
}

function addTodoItem(event) {
  todos = [
    ...todos,
    {
      id: uuid.v4(),
      body: event.detail.body,
      done: false,
      list: event.detail.list,
      createdAt: Date.now(),
    },
  ];
  toggleTodoForm(false);
}

function removeDoneTodos() {
  todos = todos.filter((todo) => !todo.done);
}
</script>

<div class="AppContent">
  <AppHeader class="AppHeader" on:addtodo={() => toggleTodoForm(true)} on:removedone={removeDoneTodos} />
  <TodoBoard
    class="TodoBoard"
    {todos}
    on:addtodo={(event) => toggleTodoForm(true, event.detail)}
    on:updatetodo={updateTodoItem}
  />
</div>

<Modal open={openTodoForm}>
  <TodoForm data={todoFormData} on:submit={addTodoItem} on:cancel={() => toggleTodoForm(false)} />
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

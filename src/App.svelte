<script>
import * as uuid from 'uuid';
import Header from '@components/Header.svelte';
import Modal from '@components/Modal.svelte';
import TodoList from '@components/TodoList.svelte';
import TodoForm from '@components/TodoForm.svelte';
import { TODOS_TODAY, TODOS_THIS_WEEK, TODOS_EVENTUALLY } from '@lib/constants';

let todos = [];
let openTodoForm = false;

$: todosToday = todos.filter((todo) => todo.list === TODOS_TODAY);
$: todosThisWeek = todos.filter((todo) => todo.list === TODOS_THIS_WEEK);
$: todosEventually = todos.filter((todo) => todo.list === TODOS_EVENTUALLY);

function toggleTodoForm(show) {
  openTodoForm = show;
}

function toggleTodoItem(event) {
  todos = todos.map((todo) => (todo.id === event.detail.id ? { ...todo, done: event.detail.done } : todo));
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
</script>

<div class="TodoBoard">
  <Header class="Header" on:addtodo={() => toggleTodoForm(true)} />

  <TodoList title="Today" todos={todosToday} on:toggle={toggleTodoItem} />
  <TodoList title="This week" todos={todosThisWeek} on:toggle={toggleTodoItem} />
  <TodoList title="Eventually" todos={todosEventually} on:toggle={toggleTodoItem} />
</div>

<Modal open={openTodoForm}>
  <TodoForm on:submit={addTodoItem} on:cancel={() => toggleTodoForm(false)} />
</Modal>

<style>
.TodoBoard {
  display: grid;
  grid-template-columns: repeat(3, 40rem);
  grid-template-rows: max-content minmax(50rem, 50vh);
  column-gap: 3.2rem;
  row-gap: 6.4rem;
  justify-content: center;
  align-content: center;
  height: 100vh;
  padding: 3.2rem;
}

.TodoBoard :global(.Header) {
  grid-column: 1 / 4;
}
</style>

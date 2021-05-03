<script>
import Header from '@components/Header.svelte';
import Modal from '@components/Modal.svelte';
import TodoList from '@components/TodoList.svelte';
import TodoForm from '@components/TodoForm.svelte';

const TODOS_TODAY = 'TODAY';
const TODOS_THIS_WEEK = 'THIS_WEEK';
const TODOS_EVERYTHING_ELSE = 'EVERYTHING_ELSE';

let todos = [
  {
    id: '1',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    done: false,
    list: TODOS_TODAY,
  },
  {
    id: '2',
    body:
      'Morbi a malesuada purus. Nullam tempor tortor ac euismod consequat. Aenean varius auctor leo, vel aliquet leo',
    done: true,
    list: TODOS_THIS_WEEK,
  },
  {
    id: '3',
    body:
      'Nulla lacus mi, vulputate sit amet aliquet non, mollis et tortor. Quisque vulputate dui sagittis imperdiet accumsan',
    done: false,
    list: TODOS_THIS_WEEK,
  },
  {
    id: '4',
    body: 'Quisque consequat massa vel nisi ornare condimentum',
    done: false,
    list: TODOS_EVERYTHING_ELSE,
  },
  {
    id: '5',
    body: 'Nullam eu enim lacinia urna hendrerit varius. Duis quis felis eros',
    done: true,
    list: TODOS_EVERYTHING_ELSE,
  },
  {
    id: '6',
    body: 'Sed a dolor nunc. Ut quis volutpat dui, non eleifend erat. Vivamus cursus egestas felis eget lacinia',
    done: true,
    list: TODOS_EVERYTHING_ELSE,
  },
  {
    id: '7',
    body: 'Sed a dolor nunc. Ut quis volutpat dui, non eleifend erat. Vivamus cursus egestas felis eget lacinia',
    done: true,
    list: TODOS_EVERYTHING_ELSE,
  },
  {
    id: '8',
    body: 'Sed a dolor nunc. Ut quis volutpat dui, non eleifend erat. Vivamus cursus egestas felis eget lacinia',
    done: true,
    list: TODOS_EVERYTHING_ELSE,
  },
  {
    id: '9',
    body: 'Sed a dolor nunc. Ut quis volutpat dui, non eleifend erat. Vivamus cursus egestas felis eget lacinia',
    done: true,
    list: TODOS_EVERYTHING_ELSE,
  },
  {
    id: '10',
    body: 'Sed a dolor nunc. Ut quis volutpat dui, non eleifend erat. Vivamus cursus egestas felis eget lacinia',
    done: true,
    list: TODOS_EVERYTHING_ELSE,
  },
  {
    id: '11',
    body: 'Sed a dolor nunc. Ut quis volutpat dui, non eleifend erat. Vivamus cursus egestas felis eget lacinia',
    done: true,
    list: TODOS_EVERYTHING_ELSE,
  },
  {
    id: '12',
    body: 'Sed a dolor nunc. Ut quis volutpat dui, non eleifend erat. Vivamus cursus egestas felis eget lacinia',
    done: true,
    list: TODOS_EVERYTHING_ELSE,
  },
];

let openTodoForm = false;

$: todosToday = todos.filter((todo) => todo.list === TODOS_TODAY);
$: todosThisWeek = todos.filter((todo) => todo.list === TODOS_THIS_WEEK);
$: todosEverythingElse = todos.filter((todo) => todo.list === TODOS_EVERYTHING_ELSE);

function toggleTodoForm(show) {
  openTodoForm = show;
}

function toggleTodoItem(event) {
  todos = todos.map((todo) => (todo.id === event.detail.id ? { ...todo, done: event.detail.done } : todo));
}

function addTodoItem(event) {
  console.log(event.detail);
  toggleTodoForm(false);
}
</script>

<div class="TodoBoard">
  <Header class="Header" on:addtodo={() => toggleTodoForm(true)} />

  <TodoList title="Today" todos={todosToday} on:toggle={toggleTodoItem} />
  <TodoList title="This week" todos={todosThisWeek} on:toggle={toggleTodoItem} />
  <TodoList title="Everything else" todos={todosEverythingElse} on:toggle={toggleTodoItem} />
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

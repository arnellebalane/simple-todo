<script>
import TodoList from '@components/TodoList.svelte';

const todosToday = [{ id: '1' }];
const todosThisWeek = [{ id: '2' }, { id: '3' }];
const todosEverythingElse = [{ id: '4' }, { id: '5' }, { id: '6' }];
</script>

<div class="TodoBoard">
  <TodoList title="Today" todos={todosToday} />
  <TodoList title="This week" todos={todosThisWeek} />
  <TodoList title="Everything else" todos={todosEverythingElse} />
</div>

<style>
.TodoBoard {
  display: grid;
  grid-template-columns: repeat(3, 40rem);
  grid-template-rows: minmax(50rem, 50vh);
  column-gap: 3.2rem;
  justify-content: center;
  align-content: center;
  height: 100vh;
  padding: 3.2rem;
}
</style>

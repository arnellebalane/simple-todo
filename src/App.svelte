<script>
import TodoList from '@components/TodoList.svelte';
</script>

<div class="TodoBoard">
  <TodoList title="Today" />
  <TodoList title="This week" />
  <TodoList title="Everything else" />
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

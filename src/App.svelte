<script>
  import TodoList from '@components/TodoList.svelte';
</script>

<style>
  .TodoBoard {
    display: grid;
    grid-template-columns: repeat(3, 40rem);
    column-gap: 3.2rem;
    justify-content: center;
    height: 100vh;
    padding: 10vh 3.2rem;
  }
</style>

<div class="TodoBoard">
  <TodoList title="Today" />
  <TodoList title="This week" />
  <TodoList title="Everything else" />
</div>

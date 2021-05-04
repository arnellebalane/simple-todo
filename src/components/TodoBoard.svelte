<script>
import TodoList from '@components/TodoList.svelte';
import { TODOS_TODAY, TODOS_THIS_WEEK, TODOS_EVENTUALLY } from '@lib/constants';

export let todos = [];
$: todosToday = todos.filter((todo) => todo.list === TODOS_TODAY);
$: todosThisWeek = todos.filter((todo) => todo.list === TODOS_THIS_WEEK);
$: todosEventually = todos.filter((todo) => todo.list === TODOS_EVENTUALLY);
</script>

<section class={$$props.class}>
  <TodoList title="Today" emptyText="Hurray! No more todos for today!" todos={todosToday} on:updatetodo />
  <TodoList title="This week" emptyText="Great! No more todos for this week!" todos={todosThisWeek} on:updatetodo />
  <TodoList title="Eventually" emptyText="No other things to do. Good job!" todos={todosEventually} on:updatetodo />
</section>

<style>
section {
  display: flex;
  gap: 3.2rem;
}
</style>

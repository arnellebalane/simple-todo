<script>
import { createEventDispatcher } from 'svelte';
import TodoList from '@components/TodoList.svelte';
import { TODOS_TODAY, TODOS_THIS_WEEK, TODOS_EVENTUALLY } from '@lib/constants';

const dispatch = createEventDispatcher();

export let todos = [];
const byOrderDesc = (a, b) => b.order - a.order;
$: todosToday = todos.filter((todo) => todo.list === TODOS_TODAY).sort(byOrderDesc);
$: todosThisWeek = todos.filter((todo) => todo.list === TODOS_THIS_WEEK).sort(byOrderDesc);
$: todosEventually = todos.filter((todo) => todo.list === TODOS_EVENTUALLY).sort(byOrderDesc);

function addTodo(list) {
  dispatch('addtodo', { list });
}

function handleUpdate(event, list) {
  const updatedTodos = todos.map((todo) => {
    const updated = event.detail.find((updated) => updated.id === todo.id);
    return updated ? { ...updated, list } : todo;
  });
  dispatch('update', updatedTodos);
}
</script>

<section class={$$props.class}>
  <TodoList
    title="Today"
    emptyText="Hurray! No more todos for today!"
    todos={todosToday}
    on:update={(event) => handleUpdate(event, TODOS_TODAY)}
    on:addtodo={() => addTodo(TODOS_TODAY)}
    on:updatetodo
  />
  <TodoList
    title="This week"
    emptyText="Great! No more todos for this week!"
    todos={todosThisWeek}
    on:update={(event) => handleUpdate(event, TODOS_THIS_WEEK)}
    on:addtodo={() => addTodo(TODOS_THIS_WEEK)}
    on:updatetodo
  />
  <TodoList
    title="Eventually"
    emptyText="No other things to do. Good job!"
    todos={todosEventually}
    on:update={(event) => handleUpdate(event, TODOS_EVENTUALLY)}
    on:addtodo={() => addTodo(TODOS_EVENTUALLY)}
    on:updatetodo
  />
</section>

<style>
section {
  display: flex;
  gap: 3.2rem;
}
</style>

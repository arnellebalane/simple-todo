<script>
import { createEventDispatcher } from 'svelte';
import { TODOS_TODAY, TODOS_THIS_WEEK, TODOS_EVENTUALLY } from '../constants';

import TodoList from './TodoList.svelte';

export let todos = [];
const byOrderDesc = (a, b) => b.order - a.order;
$: todosToday = todos.filter((todo) => todo.list === TODOS_TODAY).sort(byOrderDesc);
$: todosThisWeek = todos.filter((todo) => todo.list === TODOS_THIS_WEEK).sort(byOrderDesc);
$: todosEventually = todos.filter((todo) => todo.list === TODOS_EVENTUALLY).sort(byOrderDesc);

const dispatch = createEventDispatcher();

const addTodo = (list) => dispatch('addtodo', { list });
const handleUpdate = (event, list) => {
    const updatedTodos = todos.map((todo) => {
        const updated = event.detail.find((updated) => updated.id === todo.id);
        return updated ? { ...updated, list } : todo;
    });
    dispatch('update', updatedTodos);
};
</script>

<section class={$$props.class}>
    <TodoList
        title="Today"
        emptyText="Hurray! No more todos for today!"
        todos={todosToday}
        class="TodoList"
        on:update={(event) => handleUpdate(event, TODOS_TODAY)}
        on:addtodo={() => addTodo(TODOS_TODAY)}
        on:updatetodo
        on:edittodo
        on:deletetodo
        data-cy="todo-list-today"
    />
    <TodoList
        title="This week"
        emptyText="Great! No more todos for this week!"
        todos={todosThisWeek}
        class="TodoList"
        on:update={(event) => handleUpdate(event, TODOS_THIS_WEEK)}
        on:addtodo={() => addTodo(TODOS_THIS_WEEK)}
        on:updatetodo
        on:edittodo
        on:deletetodo
        data-cy="todo-list-this-week"
    />
    <TodoList
        title="Eventually"
        emptyText="No other things to do. Good job!"
        todos={todosEventually}
        class="TodoList"
        on:update={(event) => handleUpdate(event, TODOS_EVENTUALLY)}
        on:addtodo={() => addTodo(TODOS_EVENTUALLY)}
        on:updatetodo
        on:edittodo
        on:deletetodo
        data-cy="todo-list-eventually"
    />
</section>

<style>
section {
    display: flex;
    gap: 3.2rem;
    min-height: 30rem;
    max-height: 80rem;
}

:global(body[data-background]) section {
    align-items: flex-start;
}

section :global(.TodoList) {
    max-height: 80rem;
}
</style>

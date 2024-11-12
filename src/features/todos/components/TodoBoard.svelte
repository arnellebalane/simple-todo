<script>
import TodoList from './TodoList.svelte';

import { TODOS_EVENTUALLY, TODOS_THIS_WEEK, TODOS_TODAY } from '../constants';

let { todos = [], class: componentClass, onUpdate, onAddTodo, onUpdateTodo, onEditTodo, onDeleteTodo } = $props();

const byOrderDesc = (a, b) => b.order - a.order;
const todosToday = $derived(todos.filter((todo) => todo.list === TODOS_TODAY).sort(byOrderDesc));
const todosThisWeek = $derived(todos.filter((todo) => todo.list === TODOS_THIS_WEEK).sort(byOrderDesc));
const todosEventually = $derived(todos.filter((todo) => todo.list === TODOS_EVENTUALLY).sort(byOrderDesc));

const handleAddTodo = (list) => () => onAddTodo?.({ list });
const handleUpdate = (list) => {
    return (data) => {
        const updatedTodos = todos.map((todo) => {
            const updated = data.find((updated) => updated.id === todo.id);
            return updated ? { ...updated, list } : todo;
        });
        onUpdate?.(updatedTodos);
    };
};
</script>

<section class={componentClass}>
    <TodoList
        title="Today"
        emptyText="Hurray! No more todos for today!"
        todos={todosToday}
        class="TodoList"
        data-testid="todo-list-today"
        onUpdate={handleUpdate(TODOS_TODAY)}
        onAddTodo={handleAddTodo(TODOS_TODAY)}
        {onUpdateTodo}
        {onEditTodo}
        {onDeleteTodo}
    />
    <TodoList
        title="This week"
        emptyText="Great! No more todos for this week!"
        todos={todosThisWeek}
        class="TodoList"
        data-testid="todo-list-this-week"
        onUpdate={handleUpdate(TODOS_THIS_WEEK)}
        onAddTodo={handleAddTodo(TODOS_THIS_WEEK)}
        {onUpdateTodo}
        {onEditTodo}
        {onDeleteTodo}
    />
    <TodoList
        title="Eventually"
        emptyText="No other things to do. Good job!"
        todos={todosEventually}
        class="TodoList"
        data-testid="todo-list-eventually"
        onUpdate={handleUpdate(TODOS_EVENTUALLY)}
        onAddTodo={handleAddTodo(TODOS_EVENTUALLY)}
        {onUpdateTodo}
        {onEditTodo}
        {onDeleteTodo}
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

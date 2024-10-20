import { TODOS_THIS_WEEK, TODOS_TODAY } from '@features/todos/constants';
import { getDifferenceInDays } from './lib/format';
import { todos } from './store';

export function initializeTodos() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let isFirstRun = true;
    const unsubscribe = todos.subscribe((todosData) => {
        if (!isFirstRun) return;
        isFirstRun = false;

        const updatedTodos = todosData.map((todo) => {
            if (!todo.date) {
                return todo;
            }

            const date = new Date(`${todo.date}T00:00:00`);
            const difference = getDifferenceInDays(date);
            if (difference === 0) {
                todo.list = TODOS_TODAY;
            } else if (difference < 7) {
                todo.list = TODOS_THIS_WEEK;
            }
            return todo;
        });
        todos.set(updatedTodos);
    });
    unsubscribe();
}

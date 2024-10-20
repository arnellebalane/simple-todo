import { settings } from '@features/settings/store';
import { TODOS_THIS_WEEK, TODOS_TODAY } from '@features/todos/constants';

import { getDifferenceInDays, isDateThisWeek, isDateToday, today } from './lib/date';
import { todos } from './store';

export function initializeTodos() {
    settings.subscribe((settingsData) => {
        if (!settingsData.moveTodosAutomatically) return;

        let isFirstRun = true;
        todos.subscribe((todosData) => {
            if (!isFirstRun) return;
            isFirstRun = false;

            const todosListLastUpdated = new Date(settingsData.todosListLastUpdated);
            todosListLastUpdated.setHours(0, 0, 0, 0);

            if (getDifferenceInDays(today, todosListLastUpdated) >= 0) return;
            settings.saveKey('todosListLastUpdated', new Date().getTime());

            const updatedTodos = todosData.map((todo) => {
                if (!todo.date) {
                    return todo;
                }

                const date = new Date(`${todo.date}T00:00:00`);
                if (isDateToday(date)) {
                    todo.list = TODOS_TODAY;
                } else if (isDateThisWeek(date) && getDifferenceInDays(today, date) > 0) {
                    todo.list = TODOS_THIS_WEEK;
                }
                return todo;
            });
            todos.set(updatedTodos);
        })();
    })();
}

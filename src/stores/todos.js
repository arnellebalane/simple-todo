import { writable } from 'svelte/store';
import * as uuid from 'uuid';
import pick from '@lib/pick';
import { LOCALSTORAGE_KEY } from '@lib/constants';

function createStore() {
  const cachedTodos = localStorage.getItem(LOCALSTORAGE_KEY);

  const { subscribe, set, update: _update } = writable(cachedTodos ? JSON.parse(cachedTodos) : []);

  const update = (data) =>
    _update((todos) => {
      const editableFields = ['body', 'list', 'order', 'done'];
      return todos.map((todo) => (todo.id === data.id ? { ...todo, ...pick(data, editableFields) } : todo));
    });

  const save = (data) => {
    if (data.id) {
      _update((todos) => todos.map((todo) => (todo.id === data.id ? data : todo)));
    } else {
      _update((todos) => {
        const { body, list } = data;
        const order = Math.max(...todos.filter((todo) => todo.list === list).map((todo) => todo.order), 0) + 1;

        return [
          ...todos,
          {
            id: uuid.v4(),
            body,
            list,
            order,
            done: false,
            createdAt: Date.now(),
          },
        ];
      });
    }
  };

  const remove = (data) => _update((todos) => todos.filter((todo) => todo.id !== data.id));

  const removeDone = () => _update((todos) => todos.filter((todo) => !todo.done));

  return { subscribe, set, update, save, remove, removeDone };
}

export const todos = createStore();

todos.subscribe((value) => localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(value)));

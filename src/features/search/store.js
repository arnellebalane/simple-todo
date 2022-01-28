import { writable } from 'svelte/store';

function createStore() {
  const query = writable('');

  function filterTodos(todos) {
    const results = writable(todos);
    const matchesAny = (string, patterns) => patterns.some((pattern) => pattern.test(string));

    query.subscribe((query) => {
      const patterns = query
        .trim()
        .split(/\s+/g)
        .map((word) => new RegExp(word, 'gi'));

      const matches = query.trim().length === 0 ? todos : todos.filter((todo) => matchesAny(todo.body, patterns));
      results.set(matches);
    });
    return results;
  }

  return { query, filterTodos };
}

export const search = createStore();

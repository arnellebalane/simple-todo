import { writable } from 'svelte/store';

function createStore() {
  const query = writable('');
  const tag = writable(null);

  function filterTodos(todos) {
    const results = writable(todos);
    const matchesAny = (string, patterns) => patterns.some((pattern) => pattern.test(string));

    let queryValue = '';
    let tagValue = null;

    const filterResults = () => {
      const patterns = queryValue
        .trim()
        .split(/\s+/g)
        .map((word) => new RegExp(word, 'gi'));

      let filtered = todos;
      if (tagValue) {
        filtered = filtered.filter((todo) => todo.tags.includes(tagValue));
      }
      if (queryValue) {
        filtered = filtered.filter((todo) => matchesAny(todo.body, patterns));
      }
      results.set(filtered);
    };

    query.subscribe((query) => {
      queryValue = query;
      filterResults();
    });
    tag.subscribe((tag) => {
      tagValue = tag;
      filterResults();
    });

    return results;
  }

  return { query, tag, filterTodos };
}

export const search = createStore();

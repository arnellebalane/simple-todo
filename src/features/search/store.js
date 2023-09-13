import { writable } from 'svelte/store';

function escapePattern(pattern) {
    // https://stackoverflow.com/a/6969486/1343333
    return pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function matchesAny(string, patterns) {
    return patterns.some((pattern) => pattern.test(string));
}

function createStore() {
    const query = writable('');
    const tag = writable(null);

    function clear() {
        query.set('');
        tag.set(null);
    }

    function filterTodos(todos) {
        const results = writable(todos);
        let queryValue = '';
        let tagValue = null;

        const filterResults = () => {
            const patterns = queryValue
                .trim()
                .split(/\s+/g)
                .map((word) => new RegExp(escapePattern(word), 'gi'));

            let filtered = todos;
            if (tagValue) {
                filtered = filtered.filter((todo) => todo.tags?.includes(tagValue));
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

    return { query, tag, clear, filterTodos };
}

export const search = createStore();

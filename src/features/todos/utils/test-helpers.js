import { TODOS_TODAY } from '../constants';

export const generateTodo = (overrides = {}) => {
    return {
        id: '1',
        body: 'test todo',
        list: TODOS_TODAY,
        order: 1,
        done: false,
        tags: [],
        ...overrides,
    };
};

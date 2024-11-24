import { faker } from '@faker-js/faker';

import { TODOS_TODAY } from '@features/todos/constants';

export const generateTodo = (overrides = {}) => {
    return {
        id: faker.string.uuid(),
        body: faker.string.alpha(10),
        list: TODOS_TODAY,
        order: 1,
        done: false,
        tags: [],
        ...overrides,
    };
};

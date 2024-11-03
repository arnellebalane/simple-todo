import TodosSettings from './TodosSettings.svelte';

import { TODOS_DATE_ABSOLUTE } from '../constants';

export const id = 'TODOS';
export const label = 'Todos';
export const component = TodosSettings;

export const getDefaultSettings = () => ({
    todoDateDisplay: TODOS_DATE_ABSOLUTE,
    openOptionalFields: false,
    moveTodosAutomatically: false,
});

export const allowedFields = [
    'todoDateDisplay',
    'openOptionalFields',
    'moveTodosLastUpdated',
    'moveTodosAutomatically',
];

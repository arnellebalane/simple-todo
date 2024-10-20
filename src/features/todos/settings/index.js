import TodosSettings from './TodosSettings.svelte';

export const id = 'TODOS';
export const label = 'Todos';
export const component = TodosSettings;

export const getDefaultSettings = () => ({
    openOptionalFields: false,
});
export const allowedFields = ['openOptionalFields', 'todosListLastUpdated'];

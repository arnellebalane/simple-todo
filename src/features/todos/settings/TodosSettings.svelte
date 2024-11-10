<script>
import Selector from '@components/Selector.svelte';
import Switch from '@components/Switch.svelte';
import DateDisplayChoiceField from './DateDisplayChoiceField.svelte';

import { TODOS_DATE_ABSOLUTE, TODOS_DATE_RELATIVE } from '../constants';

import { getDefaultSettings } from '.';

let { data = getDefaultSettings(), onChange } = $props();

const dateFormatChoices = [
    { label: 'Absolute', subtext: 'Example: "Dec 21"', value: TODOS_DATE_ABSOLUTE },
    { label: 'Relative', subtext: 'Example: "In 5 days"', value: TODOS_DATE_RELATIVE },
];

const handleChange = (key) => {
    return (value) => onChange?.({ ...data, [key]: value });
};
</script>

<section>
    <div class="Field--inline">
        <label for="openOptionalFields">
            Open optional fields by default
            <small>They will still be opened by default on edit if the todo has optional fields set.</small>
        </label>
        <Switch
            name="openOptionalFields"
            checked={data.openOptionalFields}
            onChange={handleChange('openOptionalFields')}
            data-cy="open-optional-fields-toggle"
        />
    </div>

    <div class="Field--inline">
        <label for="moveTodosAutomatically">
            Move todos automatically
            <small>Todos will get moved automatically to the appropriate list based on their date</small>
        </label>
        <Switch
            name="moveTodosAutomatically"
            checked={data.moveTodosAutomatically}
            onChange={handleChange('moveTodosAutomatically')}
            data-cy="move-todos-automatically-toggle"
        />
    </div>

    <div>
        <label for="todoDateDisplay">Date display format</label>
        <Selector
            name="todoDateDisplay"
            value={data.todoDateDisplay}
            choices={dateFormatChoices}
            choiceComponent={DateDisplayChoiceField}
            onChange={handleChange('todoDateDisplay')}
            data-cy="todo-date-display-selector"
        />
    </div>
</section>

<style>
section {
    display: flex;
    flex-direction: column;
    gap: 3.6rem;
}

.Field--inline {
    display: flex;
    align-items: flex-start;
    gap: 8px;
}

label {
    display: block;
    margin-bottom: 8px;
    font-size: 1.7rem;
    font-weight: 600;
}

.Field--inline label {
    margin-right: auto;
    margin-bottom: 0;
}

.Field--inline label + :global(*) {
    flex-shrink: 0;
    margin-top: 1px;
}

small {
    display: block;
    font-size: 1.3rem;
    font-weight: 400;
    color: var(--dimmed-500);
}
</style>

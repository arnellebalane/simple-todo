<script>
import { onDestroy, onMount } from 'svelte';

import Button from '@components/Button.svelte';
import Selector from '@components/Selector.svelte';
import TodoFormOptionalFields from './TodoFormOptionalFields.svelte';

import { disableShortcut, enableShortcut } from '@features/shortcuts';
import { TODOS_EVENTUALLY, TODOS_THIS_WEEK, TODOS_TODAY } from '../constants';
import { escapeText, sanitizeText, unsanitizeText } from '../lib/sanitize';

let {
    data = $bindable({
        list: TODOS_EVENTUALLY,
    }),
    class: componentClass,
    onChange,
    onSubmit,
    onCancel,
} = $props();

if (data.body) {
    data.body = unsanitizeText(escapeText(data.body));
}

const listChoices = [
    { label: 'Today', value: TODOS_TODAY },
    { label: 'This week', value: TODOS_THIS_WEEK },
    { label: 'Eventually', value: TODOS_EVENTUALLY },
];

let errors = $state({});
const formValid = $derived(data.body && data.list);

const handlePaste = () => {
    // Svelte's tick() doesn't work here, so setTimeout() to the rescue!
    // We need this to make sure that the DOM has updated with new content before
    // we try to sanitize its content.
    setTimeout(() => {
        data.body = unsanitizeText(sanitizeText(escapeText(data.body)));
        onChange?.(data);
    }, 0);
};
const handleChange = (key) => (value) => handlePartialChange({ [key]: value });
const handlePartialChange = (partial) => onChange?.({ ...data, ...partial });

const submitForm = (event) => {
    event?.preventDefault();

    if (formValid) {
        data.body = sanitizeText(data.body);
        onSubmit?.(data);
    }
    if (!data.body) {
        errors.body = 'Todo body is required';
    }
};

onMount(() => enableShortcut('saveTodo', submitForm));
onDestroy(() => disableShortcut('saveTodo'));
</script>

<form class={componentClass} onsubmit={submitForm}>
    <div class="Field" class:invalid={errors.body}>
        <label for="body">What do you want to do?</label>
        {#if errors.body}<p class="Error">{errors.body}</p>{/if}
        <div contenteditable bind:innerHTML={data.body} onpaste={handlePaste} data-cy="todo-form-body"></div>
    </div>

    <div class="Field">
        <label for="list">When do you want to do this?</label>
        <Selector
            name="list"
            value={data.list}
            choices={listChoices}
            onChange={handleChange('list')}
            data-cy="todo-form-list"
        />
    </div>

    <TodoFormOptionalFields {data} onChange={handlePartialChange} />

    <div class="Actions">
        <Button primary disabled={!formValid} data-cy="todo-form-save-btn">Save Todo</Button>
        <Button type="button" text onClick={onCancel} data-cy="todo-form-cancel-btn">Cancel</Button>
    </div>
</form>

<style>
form {
    display: flex;
    flex-direction: column;
    gap: 3.6rem;
}

label {
    display: block;
    margin-bottom: 8px;
    font-size: 1.7rem;
    font-weight: 600;
}

.Field.invalid label {
    color: var(--danger);
}

div[contenteditable] {
    display: block;
    min-height: 7.2rem;
    padding: 0.8rem 1.2rem;
    border: 2px solid var(--dimmed-300);
    border-radius: 0.8rem;
    line-height: 2rem;
    resize: none;
}

.Field.invalid div[contenteditable] {
    border-color: var(--danger);
}

.Error {
    margin-bottom: 0.8rem;
    color: var(--danger);
}

.Actions {
    display: flex;
}
</style>

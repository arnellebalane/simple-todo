<script>
import orderBy from 'lodash/orderBy';
import { createEventDispatcher, onDestroy, onMount } from 'svelte';

import Button from '@components/Button.svelte';
import Input from '@components/Input.svelte';
import Selector from '@components/Selector.svelte';
import TagsInput from '@features/tags/components/TagsInput.svelte';

import { disableShortcut, enableShortcut } from '@features/shortcuts';
import { tags } from '@features/tags/store';
import { TODOS_EVENTUALLY, TODOS_THIS_WEEK, TODOS_TODAY } from '../constants';
import { sanitizeText, unsanitizeText } from '../lib/sanitize';

export let data = {
    list: TODOS_EVENTUALLY,
};

if (data.body) {
    data.body = unsanitizeText(data.body);
}

const listChoices = [
    { label: 'Today', value: TODOS_TODAY },
    { label: 'This week', value: TODOS_THIS_WEEK },
    { label: 'Eventually', value: TODOS_EVENTUALLY },
];
$: tagsChoices = orderBy($tags, (tag) => tag.label.toUpperCase());
$: formValid = data.body && data.list;
$: hasOptionalFields = data.date || data.tags?.length;
let errors = {};

const handlePaste = async () => {
    // Svelte's tick() doesn't work here, so setTimeout() to the rescue!
    // We need this to make sure that the DOM has updated with new content before
    // we try to sanitize its content.
    setTimeout(() => {
        data.body = unsanitizeText(sanitizeText(data.body));
    }, 0);
};

const dispatch = createEventDispatcher();
const submitForm = () => {
    if (formValid) {
        data.body = sanitizeText(data.body);
        dispatch('submit', data);
    }

    if (!data.body) {
        errors.body = 'Todo body is required';
    }
};
const cancelForm = () => dispatch('cancel');

onMount(() => enableShortcut('saveTodo', submitForm));
onDestroy(() => disableShortcut('saveTodo'));
</script>

<form class={$$props.class} on:submit|preventDefault={submitForm}>
    <div class="Field" class:invalid={errors.body}>
        <label for="body">What do you want to do?</label>
        {#if errors.body}<p class="Error">{errors.body}</p>{/if}
        <div contenteditable bind:innerHTML={data.body} on:paste={handlePaste} data-cy="todo-form-body" />
    </div>

    <div class="Field">
        <label for="list">When do you want to do this?</label>
        <Selector bind:value={data.list} choices={listChoices} name="list" data-cy="todo-form-list" />
    </div>

    <details class="OptionalFields" open={hasOptionalFields}>
        <summary class="OptionalFieldsSummary">
            <span>Optional fields</span>
        </summary>

        <div class="OptionalFieldsContent">
            <div class="Field">
                <label for="date">
                    Date
                    <span
                        data-tooltip="Todos will get moved automatically to the appropriate list as the date approaches"
                    >
                        Info
                    </span>
                </label>
                <Input bind:value={data.date} name="date" type="date" />
            </div>

            <div class="Field">
                <label for="tags">Tags <span>(press <kbd>Enter</kbd> to add)</span></label>
                <TagsInput bind:value={data.tags} choices={tagsChoices} name="tags" type="password" />
            </div>
        </div>
    </details>

    <div class="Actions">
        <Button primary disabled={!formValid} data-cy="todo-form-save-btn">Save Todo</Button>
        <Button type="button" text on:click={cancelForm} data-cy="todo-form-cancel-btn">Cancel</Button>
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

label span {
    margin-left: 0.4rem;
    font-size: 1.3rem;
    font-weight: 400;
    color: var(--dimmed-500);
}

label span[data-tooltip] {
    text-decoration: underline;
    text-decoration-style: dotted;
}

label kbd {
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 1.2rem;
    font-weight: 700;
    background-color: var(--dimmed-200);
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

.OptionalFields label {
    font-size: 1.5rem;
}

.OptionalFieldsSummary span {
    margin-left: 0.8rem;
    cursor: pointer;
}

.OptionalFieldsContent {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    padding-top: 0.8rem;
}

.Error {
    margin-bottom: 0.8rem;
    color: var(--danger);
}

.Actions {
    display: flex;
}
</style>

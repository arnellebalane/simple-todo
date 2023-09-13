<script>
import { createEventDispatcher } from 'svelte';
import { backgrounds } from '@features/backgrounds/store';

import Button from '@components/Button.svelte';

export let name;
export let disabled = false;

const form = `image-url-field-${name}`;
let value = '';
let error = '';
const clearError = () => (error = '');

const dispatch = createEventDispatcher();
const handleRequest = (source = null) => dispatch('request', source);

const handleSubmit = async () => {
    clearError();
    try {
        new URL(value);
    } catch {
        error = 'Please input a valid URL.';
        return;
    }

    const { source, request } = backgrounds.getBackgroundImage(value);
    handleRequest(source);
    try {
        dispatch('change', await request);
    } catch (err) {
        console.error(err);
        error = err.response.data.message || 'Something went wrong, please try again.';
    }
    handleRequest();
};
</script>

<form id={form} on:submit|preventDefault={handleSubmit}>
    <input
        type="text"
        placeholder="Example: https://unsplash.com/photos/ppEfmAINyns"
        bind:value
        class:error
        id={name}
        {name}
        {form}
        {disabled}
        on:input={clearError}
    />

    <Button class="Button" disabled={disabled || !value} {form}>Set image</Button>
</form>

{#if error}
    <p class="Error">{error}</p>
{/if}

<style>
form {
    display: flex;
    gap: 8px;
}

input {
    flex-grow: 1;
    display: block;
    padding: 8px 1.2rem;
    border: 2px solid var(--dimmed-300);
    border-radius: 8px;
    line-height: 2.4rem;
    background-color: transparent;
}

input.error {
    border-color: var(--danger);
}

input:disabled,
form :global(.Button:disabled) {
    opacity: 0.5;
    cursor: not-allowed;
}

.Error {
    margin-top: 8px;
    color: var(--danger);
}
</style>

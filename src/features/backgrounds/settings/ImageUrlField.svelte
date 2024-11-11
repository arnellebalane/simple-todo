<script>
import Button from '@components/Button.svelte';

import { backgrounds } from '@features/backgrounds/store';

let { name, disabled = false, onRequest, onChange } = $props();

const form = $derived(`image-url-field-${name}`);
let value = $state('');
let error = $state('');

const handleSubmit = async (event) => {
    event.preventDefault();

    error = '';
    try {
        new URL(value);
    } catch {
        error = 'Please input a valid URL.';
        return;
    }

    const { source, request } = backgrounds.getBackgroundImage(value);
    onRequest?.(source);
    try {
        onChange?.(await request);
    } catch (err) {
        console.error(err);
        error = err.response?.data?.message ?? 'Something went wrong, please try again.';
    }
    onRequest?.();
};
</script>

<form id={form} onsubmit={handleSubmit}>
    <input
        {name}
        {form}
        {disabled}
        id={name}
        type="text"
        placeholder="Example: https://unsplash.com/photos/ppEfmAINyns"
        bind:value
        class:error
        oninput={() => (error = '')}
        data-cy="image-url-field-input"
    />

    <Button class="Button" disabled={disabled || !value} {form} data-cy="image-url-field-button">Set image</Button>
</form>

{#if error}
    <p class="Error" data-cy="image-url-field-error">{error}</p>
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

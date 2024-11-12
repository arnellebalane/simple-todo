<script>
import Button from '@components/Button.svelte';

import axios from '@lib/axios';

let { name, error = '', class: componentClass, onError, onData } = $props();

const form = $derived(`quick-links-custom-url-field-${name}`);
let value = $state('');
let isLoading = $state(false);

const handleSubmit = async (event) => {
    event.preventDefault();

    onError?.('');
    try {
        new URL(value);
    } catch {
        onError?.('Please input a valid URL.');
        return;
    }

    isLoading = true;
    try {
        const params = { url: value };
        const response = await axios.get('/get-quick-link-details', { params });
        value = '';
        onData?.(response.data);
    } catch (err) {
        console.error(err);
        onError?.('Failed to fetch quick link data, please try again.');
    }
    isLoading = false;
};
</script>

<form class={componentClass} id={form} onsubmit={handleSubmit}>
    <input
        {form}
        {name}
        id={name}
        type="text"
        placeholder="Example: https://arnellebalane.com"
        bind:value
        class:error
        disabled={isLoading}
        oninput={() => onError('')}
        data-testid="custom-url-field-input"
    />
    <Button disabled={isLoading} {form} data-testid="custom-url-field-button">Add Link</Button>

    {#if error}
        <p class="Error" data-testid="custom-url-field-error">{error}</p>
    {/if}
</form>

<style>
form {
    display: flex;
    flex-wrap: wrap;
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

.Error {
    width: 100%;
    color: var(--danger);
}
</style>

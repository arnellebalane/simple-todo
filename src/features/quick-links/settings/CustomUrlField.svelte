<script>
import { createEventDispatcher } from 'svelte';

import Button from '@components/Button.svelte';

import axios from '@lib/axios';

export let name;
export let error = '';

const form = `quick-links-custom-url-field-${name}`;
let value = '';
let isLoading = false;

const dispatch = createEventDispatcher();

const handleSubmit = async () => {
    error = '';
    try {
        new URL(value);
    } catch {
        error = 'Please input a valid URL.';
        return;
    }

    isLoading = true;
    try {
        const params = { url: value };
        const response = await axios.get('/get-quick-link-details', { params });
        value = '';
        dispatch('data', response.data);
    } catch (err) {
        console.error(err);
        error = 'Failed to fetch quick link data, please try again.';
    }
    isLoading = false;
};

const handleInput = () => {
    error = '';
};
</script>

<form class={$$props.class} id={form} on:submit|preventDefault={handleSubmit}>
    <input
        type="text"
        placeholder="Example: https://arnellebalane.com"
        bind:value
        class:error
        id={name}
        disabled={isLoading}
        {name}
        {form}
        on:input={handleInput}
        data-cy="custom-url-field-input"
    />
    <Button class="Button" disabled={isLoading} {form} data-cy="custom-url-field-button">Add Link</Button>

    {#if error}
        <p class="Error" data-cy="custom-url-field-error">{error}</p>
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

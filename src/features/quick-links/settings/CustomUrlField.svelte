<script>
import { createEventDispatcher } from 'svelte';
import axios from '@lib/axios';

import Button from '@components/Button.svelte';

export let name;

const form = `quick-links-custom-url-field-${name}`;
let value = '';
let error = '';
let isLoading = false;

const dispatch = createEventDispatcher();

const handleSubmit = async () => {
  error = '';

  let url;
  try {
    url = new URL(value);
  } catch {
    error = 'Please input a valid URL';
    return;
  }

  isLoading = true;
  try {
    const params = { url: value };
    const response = await axios.get('/get-quick-link-details', { params });
    value = '';
    dispatch('data', response.data);
  } catch (error) {
    console.error(error);
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
  />
  <Button class="Button" disabled={isLoading} {form}>Add Link</Button>

  {#if error}
    <p class="Error">{error}</p>
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

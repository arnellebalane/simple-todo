<script>
import { createEventDispatcher } from 'svelte';
import Button from '@components/Button.svelte';

export let name;
export let value;
export let error;
export let disabled;

const form = `image-url-field-${name}`;

const dispatch = createEventDispatcher();
const handleChange = () => (error = null);
</script>

<form id={form} on:submit|preventDefault={() => dispatch('change', value)}>
  <input
    type="text"
    placeholder="Example: https://unsplash.com/photos/ppEfmAINyns"
    bind:value
    class:error
    id={name}
    {name}
    {form}
    {disabled}
    on:change={handleChange}
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

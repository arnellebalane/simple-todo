<script>
import { createEventDispatcher } from 'svelte';
import Button from '@components/Button.svelte';

export let value;
export let error;
export let disabled;

const name = `image-url-field-${$$props.name}`;

const dispatch = createEventDispatcher();
const handleChange = () => (error = null);
</script>

<form id={name} on:submit|preventDefault={() => dispatch('change')}>
  <input
    type="text"
    placeholder="Example: https://unsplash.com/photos/ppEfmAINyns"
    id={$$props.name}
    name={$$props.name}
    bind:value
    class:error
    form={name}
    {disabled}
    on:change={handleChange}
  />

  <Button class="Button" form={name} disabled={disabled || !value}>Set image</Button>
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

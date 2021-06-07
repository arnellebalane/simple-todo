<script>
import { createEventDispatcher } from 'svelte';
import Button from '@components/Button.svelte';

export let value;
export let disabled;

const name = `image-url-field-${$$props.name}`;

const dispatch = createEventDispatcher();
</script>

<form id={name} on:submit|preventDefault={() => dispatch('change')}>
  <input
    type="text"
    placeholder="Example: https://unsplash.com/photos/ppEfmAINyns"
    id={$$props.name}
    name={$$props.name}
    bind:value
    form={name}
    {disabled}
  />

  <Button class="Button" form={name} {disabled}>Set image</Button>
</form>

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

input:disabled,
form :global(.Button:disabled) {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

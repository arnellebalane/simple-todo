<script>
import { createEventDispatcher } from 'svelte';
import Button from '@components/Button.svelte';

export let name;
export let value;
export let error;

$: label = value ? value.name : 'Choose an image';
const form = `image-upload-field-${name}`;

const dispatch = createEventDispatcher();
const handleFileChange = (event) => {
  value = event.target.files[0];
};
</script>

<form id={form} on:submit|preventDefault={() => dispatch('change', value)}>
  <label>
    <span class:error>{label}</span>
    <input type="file" accept="image/*" id={name} bind:files={value} {name} {form} on:change={handleFileChange} />
  </label>

  <Button disabled={!value} {form}>Set image</Button>
</form>

{#if error}
  <p class="Error">{error}</p>
{/if}

<style>
form {
  display: flex;
  gap: 8px;
}

label {
  flex-grow: 1;
  display: flex;
  position: relative;
}

span {
  flex-grow: 1;
  display: block;
  width: 0;
  padding: 8px 1.2rem;
  border: 2px solid var(--dimmed-300);
  border-radius: 8px;

  line-height: 2.4rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: var(--dimmed-100);
  cursor: pointer;
}

span.error {
  border-color: var(--danger);
}

input {
  position: absolute;
  opacity: 0;
  transform: scale(0);
}

.Error {
  margin-top: 8px;
  color: var(--danger);
}
</style>

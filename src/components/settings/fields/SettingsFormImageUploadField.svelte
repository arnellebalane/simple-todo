<script>
import { createEventDispatcher } from 'svelte';
import Button from '@components/Button.svelte';

export let name;
export let value;
export let error;

$: label = value ? value.name : 'Choose a file';
const form = `image-upload-field-${name}`;

const dispatch = createEventDispatcher();
const handleFileChange = (event) => {
  value = event.target.files[0];
};
</script>

<form id={form} on:submit|preventDefault={() => dispatch('change', name)}>
  <label>
    <span>{label}</span>
    <input type="file" accept="image/*" id={name} bind:files={value} {name} {form} on:change={handleFileChange} />
  </label>

  <Button disabled={!value} {form}>Set image</Button>
</form>

<style>
form {
  display: flex;
  gap: 8px;
}

label {
  flex-grow: 1;
  position: relative;
  cursor: pointer;
}

span {
  display: block;
  padding: 8px 1.2rem;
  border: 2px solid var(--dimmed-300);
  border-radius: 8px;
  line-height: 2.4rem;
  background-color: var(--dimmed-100);
}

input {
  position: absolute;
  opacity: 0;
  transform: scale(0);
}
</style>

<script>
import Button from '@components/Button.svelte';

export let value = [];
export let choices;

let currentValue = '';
$: filteredChoices = choices.filter((choice) => !value.includes(choice));

const handleChange = () => {
  if (!value.includes(currentValue)) {
    value = [...value, currentValue];
  }
  currentValue = '';
};
const handleRemove = (tag) => {
  value = value.filter((value) => value !== tag);
};
</script>

<input
  type="text"
  list="tags-choices"
  bind:value={currentValue}
  on:change|stopPropagation|preventDefault={handleChange}
  name={$$props.name}
  id={$$props.name}
  form
/>

<div>
  {#each value as tag (tag)}
    <Button class="Button" type="button" small on:click={handleRemove(tag)}>{tag}</Button>
  {/each}
</div>

<datalist id="tags-choices">
  {#each filteredChoices as choice (choice)}
    <option value={choice} />
  {/each}
</datalist>

<style>
input {
  display: block;
  width: 100%;
  padding: 8px 1.2rem;
  border: 2px solid var(--dimmed-300);
  border-radius: 8px;
  line-height: 2.4rem;
  background-color: transparent;
}

div :global(Button) {
  margin-top: 4px;
  margin-right: 4px;
  text-align: left;
  word-break: break-word;
}
</style>

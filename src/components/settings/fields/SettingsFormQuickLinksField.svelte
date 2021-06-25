<script>
export let choices = [];
export let value = [];
$: selectedChoices = value.reduce((obj, choice) => ({ ...obj, [choice.url]: true }), {});
</script>

<div>
  {#each choices as link (link.url)}
    <label class:selected={link.url in selectedChoices}>
      <p>{link.name}</p>
      <input type="checkbox" bind:group={value} value={link} name="quicklinks" />
    </label>
  {/each}
</div>

<style>
div {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: 8rem;
  gap: 4px;
}

label {
  padding: 4px;
  border: 2px solid transparent;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
}

label:focus-within {
  border-style: dashed;
  border-color: var(--primary);
}

label.selected {
  border-style: solid;
  border-color: var(--primary);
}
</style>

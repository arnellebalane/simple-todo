<script>
export let choices;
export let value;
</script>

<div class={$$props.class}>
  {#each choices as choice}
    <label>
      <input type="radio" bind:group={value} value={choice.value} name={$$props.name} />
      <span>{choice.label}</span>
    </label>
  {/each}
</div>

<style>
div {
  display: flex;
  gap: 2px;
  padding: 2px;
  border-radius: 8px;
  background-color: var(--dimmed-300);
}

label {
  flex: 1 0 0;
  position: relative;
  cursor: pointer;
}

input {
  position: absolute;
  top: 0;
  left: 0;
  transform: scale(0);
  opacity: 0;
}

span {
  display: block;
  padding: 1.2rem 2.4rem;
  text-align: center;
  background-color: var(--light);
}

label:first-child span {
  border-radius: 8px 0 0 8px;
}

label:last-child span {
  border-radius: 0 8px 8px 0;
}

input:checked + span {
  background-color: var(--primary);
}
</style>

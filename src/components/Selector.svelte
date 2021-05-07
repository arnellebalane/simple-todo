<script>
import { createEventDispatcher } from 'svelte';

export let choices;
export let value;
export let choiceComponent = null;

const dispatch = createEventDispatcher();
const handleChange = (event) => dispatch('change', event.target.value);
</script>

<div class={$$props.class} class:background={!choiceComponent}>
  {#each choices as choice}
    <label>
      <input type="radio" bind:group={value} value={choice.value} name={$$props.name} on:change={handleChange} />

      {#if choiceComponent}
        <svelte:component this={choiceComponent} {choice} selected={choice.value === value} />
      {:else}
        <span class:selected={choice.value === value}>{choice.label}</span>
      {/if}
    </label>
  {/each}
</div>

<style>
div {
  display: flex;
  gap: 2px;
  border-radius: 8px;
}

div.background {
  padding: 2px;
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
  background-color: var(--main);
}

label:first-child span {
  border-radius: 8px 0 0 8px;
}

label:last-child span {
  border-radius: 0 8px 8px 0;
}

span.selected {
  background-color: var(--primary);
}
</style>

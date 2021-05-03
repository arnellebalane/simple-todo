<script>
import { createEventDispatcher } from 'svelte';

export let checked = false;

const dispatch = createEventDispatcher();

function handleChange(event) {
  dispatch('change', event.target.checked);
}
</script>

<label>
  <input type="checkbox" bind:checked on:change={handleChange} {...$$props} />
  <span>
    {#if checked}
      <svg viewBox="0 0 24 24">
        <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
      </svg>
    {/if}
  </span>
</label>

<style>
label {
  flex-shrink: 0;
  position: relative;
  display: block;
  width: 2rem;
  height: 2rem;
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 2px;
  border: 2px solid currentColor;
  border-radius: 50%;
  color: #e5e7eb;
}

label:focus-within span {
  background-color: #f9fafb;
}

input:checked + span {
  color: #34d399;
  background-color: #a7f3d0;
}

svg {
  display: block;
}

path {
  fill: currentColor;
  stroke: currentColor;
  stroke-width: 2;
}
</style>

<script>
import { createEventDispatcher } from 'svelte';
import Button from '@components/Button.svelte';

const dispatch = createEventDispatcher();

export let text;
</script>

<div class={$$props.class}>
  <p>{text}</p>
  <Button small on:click={() => dispatch('addtodo')}>Add Todo</Button>
</div>

<style>
div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50%;
}

p {
  padding: 1.2rem 2.4rem;
  color: #9ca3af;
}
</style>

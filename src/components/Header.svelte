<script>
import { createEventDispatcher } from 'svelte';
import Button from '@components/Button.svelte';

const dispatch = createEventDispatcher();

const hour = new Date().getHours();
const greeting = (() => {
  if (hour < 12) {
    return 'Good morning.';
  } else if (hour < 18) {
    return 'Good afternoon.';
  }
  return 'Good evening.';
})();
</script>

<header class={$$props.class}>
  <h1>{greeting}</h1>

  <Button primary on:click={() => dispatch('addtodo')}>Add Todo</Button>
  <Button text on:click={() => dispatch('removedone')}>Remove Done</Button>
</header>

<style>
header {
  display: flex;
  align-items: center;
}

h1 {
  margin-right: auto;
  font-size: 4.8rem;
  font-weight: 100;
}
</style>

<script>
import { createEventDispatcher } from 'svelte';
import format from 'date-fns/format';
import Button from '@components/Button.svelte';

const dispatch = createEventDispatcher();

const date = new Date();
const formattedDate = format(date, 'iiii, MMMM d');
</script>

<header class={$$props.class}>
  <h1>{formattedDate}</h1>

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

<script>
import { createEventDispatcher } from 'svelte';
import dayjs from 'dayjs';
import Button from '@components/Button.svelte';

const dispatch = createEventDispatcher();

const today = dayjs().format('dddd, MMMM D');
</script>

<header class={$$props.class}>
  <h1>{today}</h1>

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

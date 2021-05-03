<script>
import Button from '@components/Button.svelte';

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

  <Button class="Button" primary>Add Todo</Button>
  <Button class="Button" text>Remove Done</Button>
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

header :global(.Button) {
  margin-left: 1.2rem;
}
</style>

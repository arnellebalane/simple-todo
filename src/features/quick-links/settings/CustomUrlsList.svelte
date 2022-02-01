<script>
import { createEventDispatcher } from 'svelte';
import { confirmation } from '@app/stores/confirmation';

import Button from '@components/Button.svelte';

export let links = [];

$: linksReversed = links.slice().reverse();

const dispatch = createEventDispatcher();
const handleRemove = async (link) => {
  const confirmed = await confirmation.show({
    message: 'Are you sure you want to delete this custom quick link?',
  });
  if (confirmed) {
    dispatch('remove', link);
  }
};
</script>

<ul class={$$props.class}>
  {#each linksReversed as link (link.url)}
    <li>
      <img src={link.icon} alt={link.title} width="24" height="24" />
      <div>
        <p>{link.title}</p>
        <small>{link.url}</small>
      </div>
      <Button
        small
        icon
        iconLight="./dist/assets/icons/delete.svg"
        iconDark="./dist/assets/icons/delete.svg"
        class="RemoveButton"
        type="button"
        on:click={() => handleRemove(link)}
      >
        Remove
      </Button>
    </li>
  {/each}
</ul>

<style>
ul {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  padding: 0;
  list-style: none;
}

li {
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
}

img {
  display: flex;
  width: 2.4rem;
  height: 2.4rem;
}

div {
  flex-grow: 1;
}

p {
  line-height: 1;
  word-break: break-word;
}

small {
  display: block;
  margin-top: 0.5rem;

  line-height: 1.2;
  word-break: break-word;
  color: var(--dimmed-500);
}

li :global(.RemoveButton) {
  flex-shrink: 0;
  width: 2.4rem !important;
  height: 2.4rem !important;
  background-size: 1.8rem;
}
</style>

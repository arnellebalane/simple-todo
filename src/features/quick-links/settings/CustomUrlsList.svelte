<script>
import { createEventDispatcher } from 'svelte';
import { dndzone, TRIGGERS } from 'svelte-dnd-action';
import omit from 'lodash/omit';

import CustomUrlItem from './CustomUrlItem.svelte';

export let links = [];

$: sortableLinks = links
  .slice()
  .reverse()
  .map((link) => ({ ...link, id: link.url }));

const dispatch = createEventDispatcher();

const handleDragAndDrop = (event) => {
  sortableLinks = event.detail.items;
  if (event.detail.info.trigger === TRIGGERS.DROPPED_INTO_ZONE) {
    const links = sortableLinks
      .slice()
      .reverse()
      .map((link) => omit(link, ['id']));
    dispatch('change', links);
  }
};
</script>

<ol
  class="CustomUrls"
  use:dndzone={{ items: sortableLinks, type: 'CustomUrls', dropTargetStyle: {} }}
  on:consider={handleDragAndDrop}
  on:finalize={handleDragAndDrop}
>
  {#each sortableLinks as link (link.id)}
    <CustomUrlItem {link} on:remove={() => dispatch('remove', link)} />
  {/each}
</ol>

<style>
.CustomUrls {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  padding: 0;
  list-style: none;
}
</style>

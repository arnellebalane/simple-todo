<script>
import { createEventDispatcher } from 'svelte';
import { dndzone, TRIGGERS, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
import omit from 'lodash/omit';

import { confirmation } from '@app/stores/confirmation';
import Button from '@components/Button.svelte';

export let links = [];

$: sortableLinks = links
  .slice()
  .reverse()
  .map((link) => ({ ...link, id: link.url }));

const dispatch = createEventDispatcher();

const handleRemove = async (link) => {
  const confirmed = await confirmation.show({
    message: 'Are you sure you want to delete this custom quick link?',
  });
  if (confirmed) {
    dispatch('remove', link);
  }
};

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
    <li class="CustomUrl">
      <img class="CustomUrl_Icon" src={link.icon} alt={link.title} width="24" height="24" />
      <div class="CustomUrl_Details">
        <p class="CustomUrl_Title">{link.title}</p>
        <small class="CustomUrl_Link">{link.url}</small>
      </div>

      <div class="ActionButtons">
        <Button
          small
          icon
          iconLight="./dist/assets/icons/drag.svg"
          iconDark="./dist/assets/icons/drag.svg"
          class="ActionButton"
          type="button"
        >
          Drag
        </Button>
        <Button
          small
          icon
          iconLight="./dist/assets/icons/delete.svg"
          iconDark="./dist/assets/icons/delete.svg"
          class="ActionButton"
          type="button"
          on:click={() => handleRemove(link)}
        >
          Remove
        </Button>
      </div>

      {#if link[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
        <div class="CustomUrl_Shadow" />
      {/if}
    </li>
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

.CustomUrl {
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  position: relative;

  background-color: var(--main);
}

.CustomUrl_Icon {
  display: flex;
  width: 2.4rem;
  height: 2.4rem;
}

.CustomUrl_Details {
  flex-grow: 1;
}

.CustomUrl_Title {
  line-height: 1;
  word-break: break-word;
}

.CustomUrl_Link {
  display: block;
  margin-top: 0.5rem;

  line-height: 1.2;
  word-break: break-word;
  color: var(--dimmed-500);
}

.ActionButtons {
  flex-shrink: 0;
}

.ActionButtons :global(.ActionButton) {
  width: 2.4rem !important;
  height: 2.4rem !important;
  background-size: 1.8rem;
}

.CustomUrl_Shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px dashed var(--dimmed-300);
  border-radius: 8px;
  background-color: var(--dimmed-200);
  visibility: visible;
}
</style>

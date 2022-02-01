<script>
import { createEventDispatcher } from 'svelte';
import { SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';

import { confirmation } from '@app/stores/confirmation';
import Button from '@components/Button.svelte';

export let link;

const dispatch = createEventDispatcher();

const handleRemove = async () => {
  const confirmed = await confirmation.show({
    message: 'Are you sure you want to delete this custom quick link?',
  });
  if (confirmed) {
    dispatch('remove');
  }
};
</script>

<li class="CustomUrl">
  <img class="CustomUrl_Icon" src={link.icon} alt={link.title} width="24" height="24" />
  <div class="CustomUrl_Details">
    <p class="CustomUrl_Title">{link.title}</p>
    <small class="CustomUrl_Link">{link.url}</small>
  </div>

  <div class="CustomUrl_Actions">
    <Button
      small
      icon
      iconLight="./dist/assets/icons/drag.svg"
      iconDark="./dist/assets/icons/drag.svg"
      class="CustomUrl_Action CustomUrl_Action-drag"
      type="button"
      tabindex="-1"
    >
      Drag
    </Button>
    <Button
      small
      icon
      iconLight="./dist/assets/icons/delete.svg"
      iconDark="./dist/assets/icons/delete.svg"
      class="CustomUrl_Action"
      type="button"
      on:click={handleRemove}
    >
      Remove
    </Button>
  </div>

  {#if link[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
    <div class="CustomUrl_Shadow" />
  {/if}
</li>

<style>
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

.CustomUrl_Actions {
  flex-shrink: 0;
}

.CustomUrl_Actions :global(.CustomUrl_Action) {
  width: 2.4rem !important;
  height: 2.4rem !important;
  background-size: 1.8rem;
}

.CustomUrl_Actions :global(.CustomUrl_Action-drag) {
  pointer-events: none;
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

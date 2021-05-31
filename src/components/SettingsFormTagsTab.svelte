<script>
import orderBy from 'lodash/orderBy';
import Button from '@components/Button.svelte';
import { tags } from '@stores/tags';

export let data = {};

$: sortedTags = orderBy($tags, (tag) => tag.label.toUpperCase());

const removeTag = (tag) => {
  tags.updateTag(tag.label, { removed: true });
};
const restoreTag = (tag) => {
  tags.updateTag(tag.label, { removed: false });
};
</script>

<ol>
  {#each sortedTags as tag (tag.label)}
    <li class:removed={tag.removed}>
      <Button
        medium
        icon
        iconLight={tag.removed ? './dist/assets/icons/restore.svg' : './dist/assets/icons/delete.svg'}
        iconDark={tag.removed ? './dist/assets/icons/restore.svg' : './dist/assets/icons/delete.svg'}
        type="button"
        class="Button"
        on:click={() => (tag.removed ? restoreTag(tag) : removeTag(tag))}
      >
        {tag.removed ? 'Restore' : 'Remove'}
      </Button>
      <span>{tag.label}</span>
    </li>
  {/each}
</ol>

<style>
ol {
  padding: 0;
  padding-right: 3rem;
  margin-right: -3rem;
  list-style: none;
  max-height: 31.2rem;
  overflow-y: auto;
}

ol::-webkit-scrollbar {
  width: 8px;
}

ol::-webkit-scrollbar-thumb {
  border-radius: 1rem;
  background-color: var(--dimmed-300);
}

li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 4px 0;
  border-radius: 8px;
  line-height: 2rem;
}

li :global(.Button) {
  flex-shrink: 0;
  background-size: 2rem;
}

span {
  display: inline-block;
  padding: 8px 1.2rem;
  border-radius: 6px;
  background-color: var(--dimmed-200);
}

li.removed span {
  text-decoration: line-through;
  opacity: 0.5;
}
</style>

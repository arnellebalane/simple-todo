<script>
import orderBy from 'lodash/orderBy';
import Button from '@components/Button.svelte';
import { tags } from '@stores/tags';

$: sortedTags = orderBy($tags, (tag) => tag.label.toUpperCase());
</script>

<ol>
  {#each sortedTags as tag (tag.label)}
    <li>
      <Button
        medium
        icon
        iconLight="./dist/assets/icons/delete.svg"
        iconDark="./dist/assets/icons/delete.svg"
        type="button"
        class="RemoveButton"
      >
        Remove
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

span {
  display: inline-block;
  padding: 8px 1.2rem;
  border-radius: 6px;
  background-color: var(--dimmed-200);
}

li :global(.RemoveButton) {
  flex-shrink: 0;
  background-size: 2rem;
}
</style>

<script>
import isEmpty from 'lodash/isEmpty';
import orderBy from 'lodash/orderBy';

import Button from '@components/Button.svelte';

import { icons } from '@lib/icons';
import { tags } from '../store';

const hasTags = $derived(!isEmpty($tags));
const sortedTags = $derived(orderBy($tags, (tag) => tag.label.toUpperCase()));

const removeTag = (tag) => {
    tags.updateTag(tag.label, { removed: true });
};
const restoreTag = (tag) => {
    tags.updateTag(tag.label, { removed: false });
};
</script>

{#if hasTags}
    <ol data-testid="tags-settings">
        {#each sortedTags as tag (tag.label)}
            <li class:removed={tag.removed} data-testid="tag-item">
                <Button
                    medium
                    type="button"
                    class="Button"
                    iconLight={tag.removed ? icons.restore : icons.remove}
                    iconDark={tag.removed ? icons.restore : icons.remove}
                    onClick={() => (tag.removed ? restoreTag(tag) : removeTag(tag))}
                    data-testid="tag-action-btn"
                >
                    {tag.removed ? 'Restore' : 'Remove'}
                </Button>
                <span>{tag.label}</span>
            </li>
        {/each}
    </ol>
{:else}
    <p data-testid="tags-empty">No tags available. Tags added to todo items will appear in this tab.</p>
{/if}

<style>
ol {
    display: flex;
    flex-direction: column;
    gap: 8px;

    padding: 0;
    list-style: none;
}

li {
    display: flex;
    align-items: flex-start;
    gap: 8px;
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

p {
    color: var(--dimmed-500);
}
</style>

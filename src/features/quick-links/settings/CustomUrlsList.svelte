<script>
import omit from 'lodash/omit';
import { dndzone, TRIGGERS } from 'svelte-dnd-action';

import CustomUrlItem from './CustomUrlItem.svelte';

let { links = [], onChange, onRemove } = $props();

let sortableLinks = $state([]);
$effect(() => {
    sortableLinks = links
        .slice()
        .reverse()
        .map((link) => ({ ...link, id: link.url }));
});

const transformDraggedElement = (element) => {
    element.classList.add('CustomUrl-dragged');
};

const handleDragAndDrop = (event) => {
    sortableLinks = event.detail.items;
    if (event.detail.info.trigger === TRIGGERS.DROPPED_INTO_ZONE) {
        const links = sortableLinks
            .slice()
            .reverse()
            .map((link) => omit(link, ['id']));
        onChange?.(links);
    }
};
</script>

<ol
    class="CustomUrls"
    use:dndzone={{ items: sortableLinks, type: 'CustomUrls', dropTargetStyle: {}, transformDraggedElement }}
    onconsider={handleDragAndDrop}
    onfinalize={handleDragAndDrop}
    data-testid="custom-urls-list"
>
    {#each sortableLinks as link (link.id)}
        <CustomUrlItem {link} onRemove={() => onRemove?.(link)} />
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

:global(.CustomUrl-dragged) {
    padding: 8px !important;
    border-radius: 8px !important;
    height: auto !important;
    box-shadow:
        rgb(0 0 0 / 0%) 0px 0px 0px 0px,
        rgb(0 0 0 / 0%) 0px 0px 0px 0px,
        rgb(0 0 0 / 5%) 0px 4px 6px -1px,
        rgb(0 0 0 / 1%) 0px 2px 4px -1px;
}
</style>

<script>
import { onMount, onDestroy } from 'svelte';
import isEmpty from 'lodash/isEmpty';
import orderBy from 'lodash/orderBy';

import { enableShortcut, disableShortcut } from '@features/shortcuts';
import { settings } from '@features/settings/store';
import { tags } from '@features/tags/store';
import { search } from '../store';

import Button from '@components/Button.svelte';

const { query, tag } = search;

$: enableTextFilter = $settings.enableTextFilter;
$: enableTagsFilter = $settings.enableTagsFilter && !isEmpty($tags);
$: enableSearchForm = enableTextFilter || enableTagsFilter;

$: hasSearchFilters = Boolean($query) || Boolean($tag);
$: tagsChoices = orderBy($tags, (tag) => tag.label.toUpperCase());

const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
        search.clear();
    }
};

let searchForm;
const focusSearchForm = () => {
    if (searchForm) {
        searchForm.firstElementChild.focus();
    }
};

onMount(() => enableShortcut('focusSearch', () => focusSearchForm()));
onDestroy(() => disableShortcut('focusSearch'));
</script>

{#if enableSearchForm}
    <form class="SearchForm" bind:this={searchForm} on:submit|preventDefault on:keydown={handleKeyDown}>
        {#if enableTextFilter}
            <input class="SearchQuery" type="text" name="query" placeholder="Search todos" bind:value={$query} />
        {/if}

        {#if enableTagsFilter}
            <select class="SearchTags" name="tag" bind:value={$tag}>
                <option value={null}>All todos</option>
                {#each tagsChoices as tag}
                    <option value={tag.label}>{tag.label}</option>
                {/each}
            </select>
        {/if}

        <Button
            icon
            disabled={!hasSearchFilters}
            data-tooltip="Clear search filters"
            iconLight="./dist/assets/icons/close-light.svg"
            iconDark="./dist/assets/icons/close-dark.svg"
            type="button"
            class="SearchClear"
            on:click={search.clear}
        >
            Clear search
        </Button>
    </form>
{/if}

<style>
.SearchForm {
    display: flex;
    gap: 8px;
    padding: 8px;
    border-radius: 8px;
}

:global(body[data-background]) .SearchForm {
    background-color: var(--main-transparent);
}

.SearchQuery,
.SearchTags,
.SearchForm :global(button.icon.SearchClear) {
    background-color: var(--main);
}

.SearchQuery,
.SearchTags {
    display: block;
    padding: 8px 1.2rem;
    border: 2px solid var(--dimmed-300);
    border-radius: 8px;
    line-height: 2.4rem;
}

.SearchQuery {
    width: 24rem;
}

.SearchTags {
    max-width: 15rem;
}
</style>

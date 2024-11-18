<script>
import isEmpty from 'lodash/isEmpty';
import orderBy from 'lodash/orderBy';
import { onDestroy, onMount } from 'svelte';

import Button from '@components/Button.svelte';

import { settings } from '@features/settings/store';
import { disableShortcut, enableShortcut } from '@features/shortcuts';
import { tags } from '@features/tags/store';
import { icons } from '@lib/icons';
import { search } from '../store';

const { query, tag } = search;

const enableTextFilter = $derived($settings.enableTextFilter);
const enableTagsFilter = $derived($settings.enableTagsFilter && !isEmpty($tags));
const enableSearchForm = $derived(enableTextFilter || enableTagsFilter);

const hasSearchFilters = $derived(Boolean($query) || Boolean($tag));
const tagsChoices = $derived(orderBy($tags, (tag) => tag.label.toUpperCase()));

const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
        search.clear();
    }
};

let searchForm = $state();
const focusSearchForm = () => {
    if (searchForm) {
        searchForm.firstElementChild.focus();
    }
};

onMount(() => enableShortcut('focusSearch', () => focusSearchForm()));
onDestroy(() => disableShortcut('focusSearch'));
</script>

{#if enableSearchForm}
    <form
        class="SearchForm"
        bind:this={searchForm}
        onsubmit={(event) => event.preventDefault()}
        onkeydowncapture={handleKeyDown}
        data-testid="search-form"
    >
        {#if enableTextFilter}
            <input
                class="SearchQuery"
                type="text"
                name="query"
                placeholder="Search todos"
                bind:value={$query}
                data-testid="search-form-text-filter"
            />
        {/if}

        {#if enableTagsFilter}
            <select class="SearchTags" name="tag" bind:value={$tag} data-testid="search-form-tags-filter">
                <option value={null}>All todos</option>
                {#each tagsChoices as tag}
                    <option value={tag.label}>{tag.label}</option>
                {/each}
            </select>
        {/if}

        <Button
            type="button"
            class="SearchClear"
            disabled={!hasSearchFilters}
            data-tooltip="Clear search filters"
            data-testid="search-form-clear-btn"
            iconLight={icons.closeLight}
            iconDark={icons.closeDark}
            onClick={search.clear}
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

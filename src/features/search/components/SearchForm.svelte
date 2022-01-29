<script>
import orderBy from 'lodash/orderBy';

import { settings } from '@features/settings/store';
import { tags } from '@features/tags/store';
import { search } from '../store';

import Button from '@components/Button.svelte';

const { query, tag } = search;

$: enableSearchForm = $settings.enableTextFilter || $settings.enableTagsFilter;
$: hasSearchFilters = Boolean($query) || Boolean($tag);
$: tagsChoices = orderBy($tags, (tag) => tag.label.toUpperCase());
</script>

{#if enableSearchForm}
  <form class="SearchForm" on:submit|preventDefault>
    {#if $settings.enableTextFilter}
      <input class="SearchQuery" type="text" name="query" placeholder="Search todos" bind:value={$query} />
    {/if}

    {#if $settings.enableTagsFilter}
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
.SearchTags {
  display: block;
  padding: 8px 1.2rem;
  border: 2px solid var(--dimmed-300);
  border-radius: 8px;
  line-height: 2.4rem;
  background-color: transparent;
}

.SearchQuery {
  width: 24rem;
}

.SearchTags {
  max-width: 15rem;
}
</style>

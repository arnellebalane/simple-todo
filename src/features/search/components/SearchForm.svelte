<script>
import { tags } from '@features/tags/store';
import { search } from '../store';

const { query, tag } = search;
</script>

<form class="SearchForm" on:submit|preventDefault>
  <input class="SearchQuery" type="text" name="query" placeholder="Search todos" bind:value={$query} />

  <select class="SearchTags" name="tag" bind:value={$tag}>
    <option value={null}>All todos</option>
    {#each Object.values($tags) as tag}
      <option value={tag.label}>{tag.label}</option>
    {/each}
  </select>
</form>

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

<script>
import { search } from '../store';

const query = search.query;
</script>

<form class="SearchForm" on:submit|preventDefault>
  <input class="SearchQuery" type="text" placeholder="Search todos" bind:value={$query} />
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

.SearchQuery {
  display: block;
  width: 20rem;
  padding: 8px 1.2rem;
  border: 2px solid var(--dimmed-300);
  border-radius: 8px;
  line-height: 2.4rem;
  background-color: transparent;
}
</style>

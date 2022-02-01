<script>
import { getDefaultSettings } from '.';
import Switch from '@components/Switch.svelte';

export let data = getDefaultSettings();
</script>

<section>
  <div class="Field--inline">
    <label for="enableTextFilter">
      Enable text filter
      <small>Show todos that match the search query.</small>
    </label>
    <Switch name="enableTextFilter" bind:value={data.enableTextFilter} on:change />
  </div>

  <div class="Field--inline">
    <label for="enableTagsFilter">
      Enable tags filter
      <small>Show todos containing the selected tag. Remains hidden if there are no tags available.</small>
    </label>
    <Switch name="enableTagsFilter" bind:value={data.enableTagsFilter} on:change />
  </div>
</section>

<style>
section {
  display: flex;
  flex-direction: column;
  gap: 3.6rem;
}

.Field--inline {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-size: 1.7rem;
  font-weight: 600;
}

.Field--inline label {
  margin-right: auto;
  margin-bottom: 0;
}

.Field--inline label + :global(*) {
  flex-shrink: 0;
  margin-top: 1px;
}

small {
  display: block;
  font-size: 1.3rem;
  font-weight: 400;
  color: var(--dimmed-500);
}
</style>

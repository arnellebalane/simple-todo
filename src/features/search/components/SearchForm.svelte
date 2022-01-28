<script>
import { search } from '../store';

const query = search.query;
</script>

<form on:submit|preventDefault>
  <input type="text" bind:value={$query} />
</form>

<script>
import Badge from '@components/Badge.svelte';

export let tags = [];
</script>

{#each tags as tag (tag)}
    <Badge data-cy="todo-item-tag">{tag}</Badge>
{/each}

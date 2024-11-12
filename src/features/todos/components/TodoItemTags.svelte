<script>
import Badge from '@components/Badge.svelte';

let { tags = [] } = $props();
</script>

{#each tags as tag (tag)}
    <Badge data-testid="todo-item-tag">{tag}</Badge>
{/each}

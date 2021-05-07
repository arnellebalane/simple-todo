<script>
import { onDestroy } from 'svelte';
import { portal } from 'svelte-portal';
import Button from '@components/Button.svelte';
import { toast } from '@stores/toast';

$: show = Boolean($toast);

$: if ($toast) {
  const unsubscribe = $toast.timer.subscribe((finished) => {
    if (finished) {
      toast.clear();
    }
  });
  onDestroy(unsubscribe);
}

const handleAction = () => {
  $toast.onAction();
  toast.clear();
};
</script>

{#if show}
  <div use:portal={'body'}>
    <p>{$toast.text}</p>

    {#if $toast.onAction}
      <Button class="ActionButton" small on:click={handleAction}>{$toast.actionText || 'OK'}</Button>
    {/if}
  </div>
{/if}

<style>
div {
  position: fixed;
  left: 3.2rem;
  bottom: 3.2rem;

  display: flex;
  align-items: center;
  gap: 4.2rem;
  max-width: 50rem;
  padding: 1rem 2rem;
  border-radius: 8px;
  background-color: var(--inverted);
}

p {
  color: var(--text-inverted);
}

div :global(.ActionButton) {
  margin-right: -1rem;
}
</style>

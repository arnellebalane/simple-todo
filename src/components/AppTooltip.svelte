<script>
import { onMount, onDestroy } from 'svelte';
import { portal } from 'svelte-portal';

let styles = null;
let message = null;

const handleEnter = (event) => {
  const target = event.target?.closest?.('[data-tooltip]');
  if (!target) {
    return;
  }
  const rect = target.getBoundingClientRect();
  styles = `top: ${rect.bottom}px; left: ${rect.left + rect.width / 2}px`;
  message = target.dataset.tooltip;
};
const handleLeave = (event) => {
  const target = event.target.closest?.('[data-tooltip]');
  if (!target) {
    return;
  }
  styles = null;
  message = null;
  handleEnter({ target: document.activeElement });
};

onMount(() => {
  document.addEventListener('mouseenter', handleEnter, { capture: true });
  document.addEventListener('mouseleave', handleLeave, { capture: true });
  document.addEventListener('focus', handleEnter, { capture: true });
  document.addEventListener('blur', handleLeave, { capture: true });
});
onDestroy(() => {
  document.removeEventListener('mouseenter', handleEnter, { capture: true });
  document.removeEventListener('mouseleave', handleLeave, { capture: true });
  document.removeEventListener('focus', handleEnter, { capture: true });
  document.removeEventListener('blur', handleLeave, { capture: true });
});
</script>

{#if message}
  <p use:portal={'body'} style={styles}>
    {message}
  </p>
{/if}

<style>
p {
  position: fixed;
  border-radius: 6px;
  padding: 6px 1.2rem;
  font-size: 1.2rem;
  color: var(--main);
  background-color: var(--inverted);
  transform: translate(-50%, 4px);
}

p::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 8px;
  height: 8px;
  background-color: var(--inverted);
  transform: translate(-50%, -4px) rotate(45deg);
  transform-origin: center center;
}
</style>

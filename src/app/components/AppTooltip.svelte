<script>
import { onMount, onDestroy, afterUpdate } from 'svelte';
import { portal } from 'svelte-portal';
import { computePosition, offset, shift, arrow } from '@floating-ui/dom';

let target;
let tooltip;
let tooltipArrow;
let styles = '';
let message = '';

const handleEnter = async (event) => {
  if (!event.target.dataset?.tooltip) {
    return;
  }
  target = event.target;
  message = target.dataset.tooltip;
};

const handleLeave = (event) => {
  if (event.target !== target) {
    return;
  }
  target = null;
  message = '';
  styles = '';
};

// Using `afterUpdate` here instead of `tick` or `setTimeout` inside
// `handleEnter`, since both of them causes `computePosition` to get the wrong
// rect of the target element.
afterUpdate(async () => {
  if (target) {
    const { x, y, middlewareData } = await computePosition(target, tooltip, {
      middleware: [offset(5), shift({ padding: 5 }), arrow({ element: tooltipArrow })],
    });
    styles = `display: block; top: ${y}px; left: ${x}px; --arrow-x: ${middlewareData.arrow.x}px;`;
  }
});

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

<p class="AppTooltip" bind:this={tooltip} use:portal={'body'} style={styles}>
  <span class="AppTooltip_Arrow" bind:this={tooltipArrow} />
  {message}
</p>

<style>
.AppTooltip {
  position: fixed;
  z-index: 1;

  display: none;
  max-width: 24rem;
  padding: 6px 1.2rem;
  border-radius: 6px;

  font-size: 1.2rem;
  color: var(--main);
  background-color: var(--inverted);
}

.AppTooltip_Arrow {
  position: absolute;
  top: -4px;
  left: var(--arrow-x);
  width: 8px;
  height: 8px;

  background-color: var(--inverted);
  transform: rotate(45deg);
  transform-origin: center center;
}
</style>

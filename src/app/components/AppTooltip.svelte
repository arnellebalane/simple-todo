<script>
import { onDestroy, onMount, tick } from 'svelte';
import { portal } from 'svelte-portal';

import { arrow, computePosition, offset, shift } from '@floating-ui/dom';

let target;
let tooltip;
let tooltipArrow;
let message = $state('');
let styles = $state('');

const handleEnter = async (event) => {
    if (!event.target.dataset?.tooltip) {
        return;
    }
    target = event.target;
    message = event.target.dataset.tooltip;

    // For some reason this needs to be called twice in order for the tooltip to
    // be positioned properly. Only one call gives the wrong positions for the
    // tooltip and its arrow, probably because it's not able to use the DOM
    // element with its latest contents?
    await positionTooltip();
    await positionTooltip();
};

const handleLeave = async (event) => {
    // When the target of the tooltip is a button and the properties of that button
    // changes, it causes component to trigger an update, causing Svelte to throw
    // a `state_unsafe_mutation` runtime error. This ensures that all DOM updates
    // have been made before updating the local states.
    await tick();

    if (event.target !== target) {
        return;
    }
    message = '';
    styles = 'display: none;';
};

const positionTooltip = async () => {
    const { x, y, middlewareData } = await computePosition(target, tooltip, {
        middleware: [offset(5), shift({ padding: 5 }), arrow({ element: tooltipArrow })],
    });
    styles = `display: block; top: ${y}px; left: ${x}px; --arrow-x: ${middlewareData.arrow.x}px`;
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

<p class="AppTooltip" bind:this={tooltip} use:portal={'body'} style={styles} data-testid="app-tooltip">
    <span class="AppTooltip_Arrow" bind:this={tooltipArrow}></span>
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

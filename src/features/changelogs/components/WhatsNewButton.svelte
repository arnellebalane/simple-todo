<script>
import Button from '@components/Button.svelte';

import { icons } from '@lib/icons';

let { pulse = false, onClick } = $props();
</script>

<div>
    <Button
        medium
        class="WhatsNewButton {pulse ? 'pulse' : ''}"
        data-testid="whats-new-btn"
        iconLight={icons.launchLight}
        iconDark={icons.launchDark}
        {onClick}
    >
        What's New
    </Button>
</div>

<style>
div :global(.WhatsNewButton) {
    position: relative;
}

div :global(.WhatsNewButton.pulse::before) {
    content: '';
    position: absolute;
    top: -4px;
    right: -4px;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;

    background-color: var(--danger);
    box-shadow: 0 0 0 0 var(--danger);
    transform: scale(1);
    animation: pulse 1.5s infinite;
}

@keyframes pulse {
    0% {
        transform: scale(0.85);
        box-shadow: 0 0 0 0 var(--danger-transparent);
    }

    70% {
        transform: scale(1);
        box-shadow: 0 0 0 8px transparent;
    }

    100% {
        transform: scale(0.85);
        box-shadow: 0 0 0 0 transparent;
    }
}
</style>

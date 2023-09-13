<script>
import Button from '@components/Button.svelte';

export let pulse = false;
</script>

<div>
    <Button
        icon
        medium
        iconLight="/src/assets/icons/launch-light.svg"
        iconDark="/src/assets/icons/launch-dark.svg"
        class="WhatsNewButton {pulse ? 'pulse' : ''}"
        on:click
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

<script>
import { portal } from 'svelte-portal';

let {
    children,
    show = false,
    closeOnEscape = false,
    closeOnClickOutside = false,
    contentClass,
    onClose,
    ...restProps
} = $props();

const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
        if (document.activeElement === document.body) {
            if (closeOnEscape) {
                onClose?.();
            }
        } else {
            document.activeElement.blur();
        }
    }
};
const eventListenerMethod = $derived(show ? 'addEventListener' : 'removeEventListener');
$effect(() => document[eventListenerMethod]('keydown', handleKeyDown));

let modal = $state();
$effect(() => {
    if (modal) {
        const focusableElements = 'a, button, input, textarea, select, [contenteditable]';
        modal.querySelector(focusableElements)?.focus();
    }
});

const handleOutsideClick = (event) => {
    const isAttachedToDocument = event.target.parentNode;
    const isInsideModal = event.target.closest('.ModalContent');
    if (closeOnClickOutside && isAttachedToDocument && !isInsideModal) {
        onClose?.();
    }
};
</script>

{#if show}
    <div class="ModalBackground" use:portal={'body'} onclickcapture={handleOutsideClick} {...restProps}>
        <div class="ModalContent {contentClass}" bind:this={modal} data-testid="modal-content">
            {@render children?.()}
        </div>
    </div>
{/if}

<style>
.ModalBackground {
    display: flex;
    justify-content: center;
    align-items: flex-start;

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 4.8rem;
    padding-bottom: 25vh;
    background-color: var(--inverted-transparent);
    overflow: auto;
}

.ModalContent {
    width: 50rem;
    padding: 3.6rem;
    border-radius: 1.6rem;
    margin: auto;
    background-color: var(--main);
    box-shadow:
        rgba(0, 0, 0, 0) 0px 0px 0px 0px,
        rgba(0, 0, 0, 0) 0px 0px 0px 0px,
        rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
        rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
}
</style>

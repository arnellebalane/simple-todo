<script>
import Modal from '@components/Modal.svelte';
import WhatsNew from './WhatsNew.svelte';

let { show, onClose } = $props();
</script>

<Modal {show} {onClose} closeOnEscape closeOnClickOutside data-testid="whats-new-modal">
    <WhatsNew {onClose} />
</Modal>

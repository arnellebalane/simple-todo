<script>
import Modal from '@components/Modal.svelte';
import WhatsNew from './WhatsNew.svelte';

export let show;
</script>

<Modal {show} closeOnEscape closeOnClickOutside on:close data-cy="whats-new-modal">
    <WhatsNew on:close />
</Modal>

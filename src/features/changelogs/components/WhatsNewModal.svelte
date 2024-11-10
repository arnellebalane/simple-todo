<script>
import { createEventDispatcher } from 'svelte';

import Modal from '@components/Modal.svelte';
import WhatsNew from './WhatsNew.svelte';

export let show;

const dispatch = createEventDispatcher();
</script>

<Modal {show} closeOnEscape closeOnClickOutside onClose={() => dispatch('close')} data-cy="whats-new-modal">
    <WhatsNew on:close />
</Modal>

<script>
import { createEventDispatcher } from 'svelte';

import Modal from '@components/Modal.svelte';
import SettingsForm from './SettingsForm.svelte';

let { show, data } = $props();

const dispatch = createEventDispatcher();
</script>

<Modal
    {show}
    contentClass="SettingsFormModalContent"
    closeOnEscape
    closeOnClickOutside
    onClose={() => dispatch('close')}
    data-cy="settings-form-modal"
>
    <SettingsForm {data} on:change on:submit on:cancel={() => dispatch('close')} />
</Modal>

<style>
/* NOTE: I wish there was a way to scope this class without modifying the template,
   instead of just leaving it as a global variable. */
:global(.SettingsFormModalContent) {
    display: flex;
    width: 72rem !important;
    min-height: 55rem;
    padding: 0 !important;
}

:global(.SettingsFormModalContent > *) {
    width: 100%;
}
</style>

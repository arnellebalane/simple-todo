<script>
import Modal from '@components/Modal.svelte';
import SettingsForm from './SettingsForm.svelte';

let { show, data, onChange, onSubmit, onClose } = $props();
</script>

<Modal
    {show}
    contentClass="SettingsFormModalContent"
    data-cy="settings-form-modal"
    closeOnEscape
    closeOnClickOutside
    {onClose}
>
    <SettingsForm {data} {onChange} {onSubmit} onCancel={onClose} />
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

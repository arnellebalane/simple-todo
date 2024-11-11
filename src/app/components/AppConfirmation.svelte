<script>
import Button from '@components/Button.svelte';
import Modal from '@components/Modal.svelte';

let {
    show = false,
    message = 'Are you sure?',
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    onConfirm,
    onCancel,
} = $props();
</script>

<Modal
    {show}
    contentClass="AppConfirmationContent"
    closeOnEscape
    closeOnClickOutside
    onClose={onCancel}
    data-cy="app-confirmation"
>
    <p data-cy="confirm-message">{message}</p>

    <div>
        <Button primary medium onClick={onConfirm} data-cy="confirm-btn">{confirmLabel}</Button>
        <Button text medium onClick={onCancel} data-cy="cancel-btn">{cancelLabel}</Button>
    </div>
</Modal>

<style>
p {
    font-size: 1.7rem;
    font-weight: 600;
}

div {
    display: flex;
    margin-top: 3.6rem;
}

:global(.AppConfirmationContent) {
    width: 45rem !important;
}
</style>

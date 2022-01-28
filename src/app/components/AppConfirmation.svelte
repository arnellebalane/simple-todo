<script>
import { createEventDispatcher } from 'svelte';

import Button from '@components/Button.svelte';
import Modal from '@components/Modal.svelte';

export let show = false;
export let message = 'Are you sure?';
export let confirmLabel = 'Confirm';
export let cancelLabel = 'Cancel';

const dispatch = createEventDispatcher();
const confirm = () => dispatch('confirm');
const cancel = () => dispatch('cancel');
</script>

<Modal {show} contentClass="AppConfirmationContent" closeOnEscape closeOnClickOutside on:close={cancel}>
  <p>{message}</p>

  <div>
    <Button primary medium on:click={confirm}>{confirmLabel}</Button>
    <Button text medium on:click={cancel}>{cancelLabel}</Button>
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

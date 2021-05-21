<script>
import { createEventDispatcher } from 'svelte';
import Modal from '@components/Modal.svelte';
import SettingsForm from '@components/SettingsForm.svelte';

export let show;
export let data;

const dispatch = createEventDispatcher();
</script>

<Modal {show} contentClass="SettingsFormModalContent" closeOnEscape closeOnClickOutside on:close>
  <SettingsForm {data} on:change on:submit on:cancel={() => dispatch('close')} />
</Modal>

<style>
/* NOTE: I wish there was a way to scope this class without modifying the template,
   instead of just leaving it as a global variable. */
:global(.SettingsFormModalContent) {
  width: 72rem !important;
}
</style>

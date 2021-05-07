<script>
import { createEventDispatcher } from 'svelte';
import Modal from '@components/Modal.svelte';
import SettingsForm from '@components/SettingsForm.svelte';

export let show;
export let data;

const dispatch = createEventDispatcher();
</script>

<Modal {show} closeOnEscape closeOnClickOutside on:close={() => dispatch('cancel')}>
  <SettingsForm {data} on:change on:submit on:cancel />
</Modal>

<script>
import { createEventDispatcher } from 'svelte';
import Modal from '@components/Modal.svelte';
import SettingsForm from '@components/SettingsForm.svelte';

export let show;

const dispatch = createEventDispatcher();
</script>

<Modal {show} closeOnEscape closeOnClickOutside on:close={() => dispatch('cancel')}>
  <SettingsForm on:submit on:cancel />
</Modal>

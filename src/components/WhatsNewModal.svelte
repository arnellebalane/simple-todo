<script>
import Modal from '@components/Modal.svelte';
import WhatsNew from '@components/WhatsNew.svelte';

export let show;
</script>

<Modal {show} closeOnEscape closeOnClickOutside on:close>
  <WhatsNew on:close />
</Modal>

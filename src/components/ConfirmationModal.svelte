<script>
import { createEventDispatcher } from 'svelte';
import Modal from '@components/Modal.svelte';

export let show = false;
export let message = 'Are you sure?';

const dispatch = createEventDispatcher();
</script>

<Modal {show} closeOnEscape closeOnClickOutside on:close>
  <p>{message}</p>
</Modal>

<style>
p {
  font-size: 1.8rem;
  font-weight: 700;
}
</style>

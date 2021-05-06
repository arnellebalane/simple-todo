<script>
import Modal from '@components/Modal.svelte';
import TodoForm from '@components/TodoForm.svelte';

export let show;
export let data;
</script>

<Modal {show}>
  <TodoForm {data} on:submit on:cancel />
</Modal>

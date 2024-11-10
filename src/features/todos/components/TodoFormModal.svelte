<script>
import Modal from '@components/Modal.svelte';
import TodoForm from './TodoForm.svelte';

let { data = $bindable(), show, onChange, onSubmit, onCancel } = $props();
</script>

<Modal {show} closeOnEscape onClose={onCancel} data-cy="todo-form-modal">
    <TodoForm bind:data {onChange} {onSubmit} {onCancel} />
</Modal>

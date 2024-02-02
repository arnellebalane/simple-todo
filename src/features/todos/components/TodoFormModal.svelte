<script>
import { createEventDispatcher } from 'svelte';

import Modal from '@components/Modal.svelte';
import TodoForm from './TodoForm.svelte';

export let show;
export let data;

const dispatch = createEventDispatcher();
</script>

<Modal {show} closeOnEscape on:close={() => dispatch('cancel')} data-cy="todo-form-modal">
    <TodoForm {data} on:submit on:cancel />
</Modal>

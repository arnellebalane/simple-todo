<script>
import { createEventDispatcher } from 'svelte';
import Selector from '@components/Selector.svelte';
import Button from '@components/Button.svelte';
import { TODOS_TODAY, TODOS_THIS_WEEK, TODOS_EVENTUALLY } from '@lib/constants';

const dispatch = createEventDispatcher();

let body = '';
let list = TODOS_EVENTUALLY;
let listChoices = [
  { label: 'Today', value: TODOS_TODAY },
  { label: 'This week', value: TODOS_THIS_WEEK },
  { label: 'Eventually', value: TODOS_EVENTUALLY },
];

function submitForm() {
  dispatch('submit', { body, list });
}

function cancelForm() {
  dispatch('cancel');
}
</script>

<form on:submit|preventDefault={submitForm}>
  <div>
    <label for="body">What do you want to do?</label>
    <textarea name="body" id="body" bind:value={body} required />
  </div>

  <div>
    <label for="list">When do you want to do this?</label>
    <Selector bind:value={list} choices={listChoices} name="list" />
  </div>

  <div class="Actions">
    <Button primary>Add Todo</Button>
    <Button type="button" text on:click={cancelForm}>Cancel</Button>
  </div>
</form>

<style>
form {
  display: flex;
  flex-direction: column;
  gap: 3.6rem;
}

label {
  display: block;
  margin-bottom: 8px;
  font-size: 1.8rem;
  font-weight: 500;
}

textarea {
  display: block;
  width: 100%;
  padding: 8px 1.2rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  line-height: 2.4rem;
  resize: none;
}

.Actions {
  display: flex;
}
</style>

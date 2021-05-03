<script>
import { createEventDispatcher } from 'svelte';
import Button from '@components/Button.svelte';

const dispatch = createEventDispatcher();

let body = '';

function submitForm() {
  dispatch('submit', { body });
}

function cancelForm() {
  dispatch('cancel');
}
</script>

<form on:submit|preventDefault={submitForm}>
  <div>
    <label for="body">Enter todo text</label>
    <textarea name="body" id="body" bind:value={body} />
  </div>

  <div>
    <label for="list">Where do you want to add this?</label>
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

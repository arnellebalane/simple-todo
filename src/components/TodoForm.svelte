<script>
import { createEventDispatcher } from 'svelte';
import Selector from '@components/Selector.svelte';
import Button from '@components/Button.svelte';
import { TODOS_TODAY, TODOS_THIS_WEEK, TODOS_EVENTUALLY } from '@lib/constants';

const dispatch = createEventDispatcher();

export let data = {
  list: TODOS_EVENTUALLY,
};

let listChoices = [
  { label: 'Today', value: TODOS_TODAY },
  { label: 'This week', value: TODOS_THIS_WEEK },
  { label: 'Eventually', value: TODOS_EVENTUALLY },
];
$: formValid = data.body && data.list;
let errors = {};

function submitForm() {
  if (formValid) {
    return dispatch('submit', data);
  }

  if (!data.body) {
    errors.body = 'Todo body is required';
  }
  if (!data.list) {
    errors.list = 'Todo schedule is required';
  }
}

function cancelForm() {
  dispatch('cancel');
}
</script>

<form class={$$props.class} on:submit|preventDefault={submitForm}>
  <div class="Field" class:invalid={errors.body}>
    <label for="body">What do you want to do?</label>
    {#if errors.body}<p class="Error">{errors.body}</p>{/if}
    <div contenteditable bind:textContent={data.body} />
  </div>

  <div class="Field" class:invalid={errors.list}>
    <label for="list">When do you want to do this?</label>
    {#if errors.list}<p class="Error">{errors.list}</p>{/if}
    <Selector bind:value={data.list} choices={listChoices} name="list" />
  </div>

  <div class="Actions">
    <Button primary disabled={!formValid}>Save Todo</Button>
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

.Field.invalid label {
  color: #ef4444;
}

div[contenteditable] {
  display: block;
  min-height: 7.2rem;
  padding: 8px 1.2rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  line-height: 2.4rem;
  resize: none;
}

.Field.invalid div[contenteditable] {
  border-color: #ef4444;
}

.Error {
  border-radius: 8px;
  margin-bottom: 8px;
  color: #ef4444;
}

.Actions {
  display: flex;
}
</style>

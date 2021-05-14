<script>
import { createEventDispatcher } from 'svelte';
import Selector from '@components/Selector.svelte';
import Button from '@components/Button.svelte';
import { sanitizeText, unsanitizeText } from '@lib/sanitize';
import { TODOS_TODAY, TODOS_THIS_WEEK, TODOS_EVENTUALLY } from '@lib/constants';

export let data = {
  list: TODOS_EVENTUALLY,
};

if (data.body) {
  data.body = unsanitizeText(data.body);
}

let listChoices = [
  { label: 'Today', value: TODOS_TODAY },
  { label: 'This week', value: TODOS_THIS_WEEK },
  { label: 'Eventually', value: TODOS_EVENTUALLY },
];
$: formValid = data.body && data.list;
let errors = {};

const handlePaste = async () => {
  // Svelte's tick() doesn't work here, so setTimeout() to the rescue!
  // We need this to make sure that the DOM has updated with new content before
  // we try to sanitize its content.
  setTimeout(() => {
    data.body = unsanitizeText(sanitizeText(data.body));
  }, 0);
};

const dispatch = createEventDispatcher();
const submitForm = () => {
  if (formValid) {
    data.body = sanitizeText(data.body);
    dispatch('submit', data);
  }

  if (!data.body) {
    errors.body = 'Todo body is required';
  }
};
const cancelForm = () => dispatch('cancel');
</script>

<form class={$$props.class} on:submit|preventDefault={submitForm}>
  <div class="Field" class:invalid={errors.body}>
    <label for="body">What do you want to do?</label>
    {#if errors.body}<p class="Error">{errors.body}</p>{/if}
    <div contenteditable bind:innerHTML={data.body} on:paste={handlePaste} />
  </div>

  <div class="Field">
    <label for="list">When do you want to do this?</label>
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
  font-weight: 700;
}

.Field.invalid label {
  color: var(--danger);
}

div[contenteditable] {
  display: block;
  min-height: 7.2rem;
  padding: 8px 1.2rem;
  border: 2px solid var(--dimmed-300);
  border-radius: 8px;
  line-height: 2.4rem;
  resize: none;
}

.Field.invalid div[contenteditable] {
  border-color: var(--danger);
}

.Error {
  border-radius: 8px;
  margin-bottom: 8px;
  color: var(--danger);
}

.Actions {
  display: flex;
}
</style>

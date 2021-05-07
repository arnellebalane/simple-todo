<script>
import { createEventDispatcher } from 'svelte';
import Button from '@components/Button.svelte';
import Selector from '@components/Selector.svelte';
import SettingsFormThemeChoice from '@components/SettingsFormThemeChoice.svelte';
import { THEME_SYSTEM, THEME_LIGHT, THEME_DARK } from '@lib/constants';

export let data = {
  theme: THEME_SYSTEM,
};

const themeChoices = [
  { label: 'System', value: THEME_SYSTEM },
  { label: 'Light', value: THEME_LIGHT },
  { label: 'Dark', value: THEME_DARK },
];

const dispatch = createEventDispatcher();
const handleSubmit = () => dispatch('submit', data);
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div class="Field">
    <label for="theme">Choose your theme</label>
    <Selector choices={themeChoices} bind:value={data.theme} choiceComponent={SettingsFormThemeChoice} />
  </div>

  <div class="Actions">
    <Button primary>Save Settings</Button>
    <Button type="button" text on:click={() => dispatch('cancel')}>Cancel</Button>
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
</style>

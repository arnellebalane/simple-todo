<script>
import { createEventDispatcher } from 'svelte';
import Button from '@components/Button.svelte';
import Selector from '@components/Selector.svelte';
import Switch from '@components/Switch.svelte';
import SettingsFormThemeChoice from '@components/SettingsFormThemeChoice.svelte';
import SettingsFormColorChoice from '@components/SettingsFormColorChoice.svelte';
import {
  THEME_SYSTEM,
  THEME_LIGHT,
  THEME_DARK,
  COLOR_GREEN,
  COLOR_YELLOW,
  COLOR_BLUE,
  COLOR_PURPLE,
  COLOR_PINK,
} from '@lib/constants';

export let data = {
  theme: THEME_SYSTEM,
  color: COLOR_GREEN,
  background: false,
};

const themeChoices = [
  { label: 'System', value: THEME_SYSTEM },
  { label: 'Light', value: THEME_LIGHT },
  { label: 'Dark', value: THEME_DARK },
];
const colorChoices = [
  { label: 'Green', value: COLOR_GREEN },
  { label: 'Yellow', value: COLOR_YELLOW },
  { label: 'Blue', value: COLOR_BLUE },
  { label: 'Purple', value: COLOR_PURPLE },
  { label: 'Pink', value: COLOR_PINK },
];

const dispatch = createEventDispatcher();
const handleSubmit = () => dispatch('submit', data);
const handleChange = () => dispatch('change', data);
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div class="Field">
    <label for="theme">Choose your theme</label>
    <Selector
      name="theme"
      bind:value={data.theme}
      choices={themeChoices}
      choiceComponent={SettingsFormThemeChoice}
      on:change={handleChange}
    />
  </div>

  <div class="Field">
    <label for="color">Choose your color</label>
    <Selector
      name="color"
      bind:value={data.color}
      choices={colorChoices}
      choiceComponent={SettingsFormColorChoice}
      on:change={handleChange}
    />
  </div>

  <div class="Field Field--inline">
    <label for="background">Show background image</label>
    <Switch name="background" bind:value={data.background} on:change={handleChange} />
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

.Field--inline {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.Field--inline label {
  margin-bottom: 0;
}
</style>

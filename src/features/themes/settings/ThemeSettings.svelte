<script>
import { getDefaultSettings } from '.';
import {
  THEME_SYSTEM,
  THEME_LIGHT,
  THEME_DARK,
  COLOR_GREEN,
  COLOR_YELLOW,
  COLOR_BLUE,
  COLOR_PURPLE,
  COLOR_PINK,
} from '../constants';

import Selector from '@components/Selector.svelte';
import ThemeChoiceField from './ThemeChoiceField.svelte';
import ColorChoiceField from './ColorChoiceField.svelte';

export let data = getDefaultSettings();

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
</script>

<section>
  <div>
    <label for="theme">Choose your theme</label>
    <Selector
      name="theme"
      bind:value={data.theme}
      choices={themeChoices}
      choiceComponent={ThemeChoiceField}
      on:change
    />
  </div>

  <div>
    <label for="color">Choose your color</label>
    <Selector
      name="color"
      bind:value={data.color}
      choices={colorChoices}
      choiceComponent={ColorChoiceField}
      on:change
    />
  </div>
</section>

<style>
section {
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

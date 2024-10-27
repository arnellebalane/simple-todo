<script>
import Selector from '@components/Selector.svelte';
import ColorChoiceField from './ColorChoiceField.svelte';
import ThemeChoiceField from './ThemeChoiceField.svelte';

import {
    COLOR_BLUE,
    COLOR_GREEN,
    COLOR_PINK,
    COLOR_PURPLE,
    COLOR_YELLOW,
    THEME_DARK,
    THEME_LIGHT,
    THEME_SYSTEM,
} from '../constants';

import { getDefaultSettings } from '.';

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
            data-cy="theme-settings-selector"
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
            data-cy="color-settings-selector"
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
    font-size: 1.7rem;
    font-weight: 600;
}
</style>

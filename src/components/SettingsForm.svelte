<script>
import { createEventDispatcher } from 'svelte';
import isEmpty from 'lodash/isEmpty';
import Button from '@components/Button.svelte';
import SettingsFormSidebar from '@components/SettingsFormSidebar.svelte';
import SettingsFormThemeTab from '@components/SettingsFormThemeTab.svelte';
import SettingsFormBackgroundTab from '@components/SettingsFormBackgroundTab.svelte';
import SettingsFormTagsTab from '@components/SettingsFormTagsTab.svelte';
import SettingsFormShortcutsTab from '@components/SettingsFormShortcutsTab.svelte';
import SettingsFormMiscellaneousTab from '@components/SettingsFormMiscellaneousTab.svelte';
import {
  SETTINGS_THEME,
  SETTINGS_BACKGROUND,
  SETTINGS_TAGS,
  SETTINGS_SHORTCUTS,
  SETTINGS_MISCELLANEOUS,
} from '@lib/constants';
import { tags } from '@stores/tags';

export let data;

const tabsMapping = {
  [SETTINGS_THEME]: SettingsFormThemeTab,
  [SETTINGS_BACKGROUND]: SettingsFormBackgroundTab,
  [SETTINGS_SHORTCUTS]: SettingsFormShortcutsTab,
  [SETTINGS_MISCELLANEOUS]: SettingsFormMiscellaneousTab,
};
if (!isEmpty($tags)) {
  tabsMapping[SETTINGS_TAGS] = SettingsFormTagsTab;
}
let currentTabKey = SETTINGS_THEME;
$: currentTab = tabsMapping[currentTabKey];

const dispatch = createEventDispatcher();
const handleSubmit = () => dispatch('submit', data);
const handleChange = () => dispatch('change', data);
</script>

<form on:submit|preventDefault={handleSubmit}>
  <SettingsFormSidebar class="SettingsFormSidebar" bind:value={currentTabKey} />

  <div class="TabContent">
    <svelte:component this={currentTab} bind:data on:change={handleChange} />
  </div>

  <div class="Actions">
    <Button primary>Save Settings</Button>
    <Button type="button" text on:click={() => dispatch('cancel')}>Cancel</Button>
  </div>
</form>

<style>
form {
  display: grid;
  grid-template-columns: 22rem 1fr;
  grid-template-rows: 1fr max-content;
  grid-template-areas: 'sidebar .' 'sidebar .';
}

form :global(.SettingsFormSidebar) {
  grid-area: sidebar;
}

.TabContent {
  padding: 3.6rem;
}

.Actions {
  display: flex;
  padding: 3.6rem;
}
</style>

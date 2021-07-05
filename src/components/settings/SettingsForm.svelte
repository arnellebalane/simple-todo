<script>
import { createEventDispatcher } from 'svelte';
import isEmpty from 'lodash/isEmpty';
import Button from '@components/Button.svelte';
import SettingsFormSidebar from '@components/settings/SettingsFormSidebar.svelte';
import SettingsFormThemeTab from '@components/settings/tabs/SettingsFormThemeTab.svelte';
import SettingsFormBackgroundTab from '@components/settings/tabs/SettingsFormBackgroundTab.svelte';
import SettingsFormQuickLinksTab from '@components/settings/tabs/SettingsFormQuickLinksTab.svelte';
import SettingsFormTagsTab from '@components/settings/tabs/SettingsFormTagsTab.svelte';
import SettingsFormShortcutsTab from '@components/settings/tabs/SettingsFormShortcutsTab.svelte';
import SettingsFormMiscellaneousTab from '@components/settings/tabs/SettingsFormMiscellaneousTab.svelte';
import {
  SETTINGS_THEME,
  SETTINGS_BACKGROUND,
  SETTINGS_QUICK_LINKS,
  SETTINGS_TAGS,
  SETTINGS_SHORTCUTS,
  SETTINGS_MISCELLANEOUS,
} from '@lib/constants';
import { tags } from '@stores/tags';

export let data;

const tabsMapping = {
  [SETTINGS_THEME]: SettingsFormThemeTab,
  [SETTINGS_BACKGROUND]: SettingsFormBackgroundTab,
  [SETTINGS_QUICK_LINKS]: SettingsFormQuickLinksTab,
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
    <div class="TabContentScroll">
      <svelte:component this={currentTab} bind:data on:change={handleChange} />
    </div>
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
  height: 42rem;
  padding: 3.6rem;
  padding-bottom: 0;
}

.TabContentScroll {
  height: 100%;
  padding-right: 3rem;
  margin-right: -3rem;
  overflow-y: auto;
}

.TabContentScroll::-webkit-scrollbar {
  width: 8px;
}

.TabContentScroll::-webkit-scrollbar-thumb {
  border-radius: 1rem;
  background-color: var(--dimmed-300);
}

.Actions {
  display: flex;
  padding: 3.6rem;
}
</style>

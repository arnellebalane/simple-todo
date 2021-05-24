<script>
import { createEventDispatcher } from 'svelte';
import Button from '@components/Button.svelte';
import SettingsFormSidebar from '@components/SettingsFormSidebar.svelte';
import SettingsFormThemeTab from '@components/SettingsFormThemeTab.svelte';
import SettingsFormBackgroundTab from '@components/SettingsFormBackgroundTab.svelte';
import { SETTINGS_THEME, SETTINGS_BACKGROUND } from '@lib/constants';

export let data;

const tabsMapping = {
  [SETTINGS_THEME]: SettingsFormThemeTab,
  [SETTINGS_BACKGROUND]: SettingsFormBackgroundTab,
};
let currentTabKey = SETTINGS_THEME;
$: currentTab = tabsMapping[currentTabKey];

const dispatch = createEventDispatcher();
const handleSubmit = () => dispatch('submit', data);
const handleChange = () => dispatch('change', data);
</script>

<form on:submit|preventDefault={handleSubmit}>
  <SettingsFormSidebar bind:value={currentTabKey} />

  <div>
    <svelte:component this={currentTab} bind:data on:change={handleChange} />
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

.Actions {
  display: flex;
}
</style>

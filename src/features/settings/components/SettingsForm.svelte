<script>
import Button from '@components/Button.svelte';
import SettingsFormSidebar from './SettingsFormSidebar.svelte';

import { settingsTabs } from '../config';

let { data, onChange, onSubmit, onCancel } = $props();

let currentTabIndex = $state(0);
const SettingsTabContent = $derived(settingsTabs[currentTabIndex].component);

const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.(data);
};
</script>

<form onsubmit={handleSubmit}>
    <SettingsFormSidebar class="SettingsFormSidebar" bind:value={currentTabIndex} />

    <div class="TabContent">
        <div class="TabContentScroll">
            <SettingsTabContent {data} {onChange} />
        </div>
    </div>

    <div class="Actions">
        <Button primary data-testid="settings-form-submit-btn">Save Settings</Button>
        <Button type="button" text onClick={onCancel} data-testid="settings-form-cancel-btn">Cancel</Button>
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

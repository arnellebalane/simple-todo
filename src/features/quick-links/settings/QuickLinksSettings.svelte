<script>
import { createEventDispatcher } from 'svelte';

import { getDefaultSettings } from '.';
import { BUILTIN_QUICK_LINKS } from '../constants';
import { frequentLinksSupported } from '../store';

import Switch from '@components/Switch.svelte';
import QuickLinksField from './QuickLinksField.svelte';

export let data = getDefaultSettings();

const dispatch = createEventDispatcher();
const handleChange = () => dispatch('change', data);

const handleQuickLinksChange = (event) => {
    data.quickLinks = event.detail;
    handleChange();
};
</script>

<section>
    <div class="Field">
        <label for="quicklinks">Select the apps to add a quick link</label>
        <QuickLinksField
            choices={BUILTIN_QUICK_LINKS}
            bind:value={data.quickLinks}
            on:change={handleQuickLinksChange}
        />
    </div>

    {#if frequentLinksSupported}
        <div class="Field--inline">
            <label for="frequentLinks">Show frequently visited links</label>
            <Switch name="frequentLinks" bind:value={data.showFrequentLinks} on:change={handleChange} />
        </div>
    {/if}
</section>

<style>
section {
    display: flex;
    flex-direction: column;
    gap: 3.6rem;
}

.Field--inline {
    display: flex;
    align-items: center;
    gap: 8px;
}

label {
    display: block;
    margin-bottom: 8px;
    font-size: 1.7rem;
    font-weight: 600;
}

.Field--inline label {
    margin-right: auto;
    margin-bottom: 0;
}
</style>

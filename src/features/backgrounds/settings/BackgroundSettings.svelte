<script>
import omit from 'lodash/omit';

import Selector from '@components/Selector.svelte';
import Switch from '@components/Switch.svelte';
import AutomaticSourceFieldSet from './AutomaticSourceFieldSet.svelte';
import CustomSourceFieldSet from './CustomSourceFieldSet.svelte';
import SourceChoiceField from './SourceChoiceField.svelte';

import { BACKGROUND_SOURCE_AUTOMATIC, BACKGROUND_SOURCE_CUSTOM } from '../constants';

import { allowedFields, getDefaultSettings } from '.';

let { data = getDefaultSettings(), onChange } = $props();

let backgroundSource = $state(data.backgroundSource);
const backgroundSourceChoices = [
    { label: 'Automatic', subtext: 'Random from Unsplash', value: BACKGROUND_SOURCE_AUTOMATIC },
    { label: 'Custom', subtext: 'Specify your own image', value: BACKGROUND_SOURCE_CUSTOM },
];

let currentRequest = $state();
const hasCurrentRequest = $derived(Boolean(currentRequest));

const handleRequest = (request) => {
    if (request) {
        currentRequest?.cancel();
    }
    currentRequest = request;
};

const handleBackgroundChange = async (value) => {
    let settings = { ...data, background: value };
    if (!value) {
        settings = omit(settings, allowedFields);
        settings = Object.assign(settings, getDefaultSettings());
        backgroundSource = settings.backgroundSource;
    }
    onChange?.(settings);
};
</script>

<section>
    <div class="Field--inline">
        <label for="background">Show background image</label>
        <Switch
            name="background"
            checked={data.background}
            onChange={handleBackgroundChange}
            data-cy="toggle-background"
        />
    </div>

    {#if data.background}
        <Selector
            name="backgroundSource"
            bind:value={backgroundSource}
            disabled={hasCurrentRequest}
            choices={backgroundSourceChoices}
            choiceComponent={SourceChoiceField}
            data-cy="background-source-selector"
        />

        {#if backgroundSource === BACKGROUND_SOURCE_AUTOMATIC}
            <AutomaticSourceFieldSet {data} disabled={hasCurrentRequest} onRequest={handleRequest} {onChange} />
        {:else}
            <CustomSourceFieldSet {data} disabled={hasCurrentRequest} onRequest={handleRequest} {onChange} />
        {/if}
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

<script>
import { createEventDispatcher, onMount } from 'svelte';

import Button from '@components/Button.svelte';
import Selector from '@components/Selector.svelte';

import { backgrounds } from '@features/backgrounds/store';
import {
    BACKGROUND_REFRESH_DAILY,
    BACKGROUND_REFRESH_MANUALLY,
    BACKGROUND_REFRESH_WEEKLY,
    BACKGROUND_SOURCE_AUTOMATIC,
} from '../constants';

export let data = {
    backgroundRefreshFrequency: BACKGROUND_REFRESH_DAILY,
};
export let disabled = false;

onMount(() => {
    if (!data.backgroundImage) {
        refreshBackgroundImage();
    }
});

const backgroundRefreshFrequencyChoices = [
    { label: 'Daily', value: BACKGROUND_REFRESH_DAILY },
    { label: 'Weekly', value: BACKGROUND_REFRESH_WEEKLY },
    { label: 'Manually', value: BACKGROUND_REFRESH_MANUALLY },
];

const dispatch = createEventDispatcher();
const handleChange = () => dispatch('change', data);
const handleRequest = (source = null) => dispatch('request', source);

const handleRefreshFrequencyChange = (value) => {
    data.backgroundRefreshFrequency = value;
    data.backgroundSource = BACKGROUND_SOURCE_AUTOMATIC;
    handleChange();
};

const refreshBackgroundImage = async () => {
    const { source, request } = backgrounds.getBackgroundImage();
    handleRequest(source);
    try {
        data.backgroundImage = await request;
        data.backgroundImageLastUpdate = Date.now();
        data.backgroundSource = BACKGROUND_SOURCE_AUTOMATIC;
        delete data.backgroundPreloaded;
        handleChange();
    } catch (error) {
        console.error(error);
    }
    handleRequest();
};
</script>

<div class="Field" data-cy="automatic-source-fieldset">
    <label for="backgroundRefreshFrequency">Refresh background image</label>
    <div class="RefreshBackground">
        <Selector
            class="RefreshBackgroundFrequency"
            name="backgroundRefreshFrequency"
            value={data.backgroundRefreshFrequency}
            choices={backgroundRefreshFrequencyChoices}
            onChange={handleRefreshFrequencyChange}
            data-cy="refresh-frequency-selector"
        />
        <Button type="button" {disabled} onClick={refreshBackgroundImage} data-cy="refresh-background-btn">
            Refresh
        </Button>
    </div>
</div>

<style>
label {
    display: block;
    margin-bottom: 8px;
    font-size: 1.7rem;
    font-weight: 600;
}

.RefreshBackground {
    display: flex;
    gap: 8px;
}

.RefreshBackground :global(.RefreshBackgroundFrequency) {
    flex-grow: 1;
}

.RefreshBackground :global(.RefreshBackgroundFrequency span) {
    padding-left: 1.8rem;
    padding-right: 1.8rem;
}
</style>

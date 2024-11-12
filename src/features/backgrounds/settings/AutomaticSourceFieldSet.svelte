<script>
import { onMount } from 'svelte';

import Button from '@components/Button.svelte';
import Selector from '@components/Selector.svelte';

import { backgrounds } from '@features/backgrounds/store';
import {
    BACKGROUND_REFRESH_DAILY,
    BACKGROUND_REFRESH_MANUALLY,
    BACKGROUND_REFRESH_WEEKLY,
    BACKGROUND_SOURCE_AUTOMATIC,
} from '../constants';

let {
    data = {
        backgroundRefreshFrequency: BACKGROUND_REFRESH_DAILY,
    },
    disabled = false,
    onChange,
    onRequest,
} = $props();

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

const handleRefreshFrequencyChange = (value) => {
    onChange?.({
        ...data,
        backgroundRefreshFrequency: value,
        backgroundSource: BACKGROUND_SOURCE_AUTOMATIC,
    });
};

const refreshBackgroundImage = async () => {
    const { source, request } = backgrounds.getBackgroundImage();
    onRequest?.(source);
    try {
        const updated = {
            ...data,
            backgroundImage: await request,
            backgroundImageLastUpdate: Date.now(),
            backgroundSource: BACKGROUND_SOURCE_AUTOMATIC,
        };
        delete updated.backgroundPreloaded;
        onChange?.(updated);
    } catch (error) {
        console.error(error);
    }
    onRequest?.();
};
</script>

<div class="Field" data-testid="automatic-source-fieldset">
    <label for="backgroundRefreshFrequency">Refresh background image</label>
    <div class="RefreshBackground">
        <Selector
            class="RefreshBackgroundFrequency"
            name="backgroundRefreshFrequency"
            value={data.backgroundRefreshFrequency}
            choices={backgroundRefreshFrequencyChoices}
            onChange={handleRefreshFrequencyChange}
            data-testid="refresh-frequency-selector"
        />
        <Button type="button" {disabled} onClick={refreshBackgroundImage} data-testid="refresh-background-btn">
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

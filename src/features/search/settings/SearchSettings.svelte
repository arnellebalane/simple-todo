<script>
import { createEventDispatcher } from 'svelte';

import Switch from '@components/Switch.svelte';

import { getDefaultSettings } from '.';

export let data = getDefaultSettings();

const dispatch = createEventDispatcher();
const handleChange = (key) => {
    return (value) => {
        data = { ...data, [key]: value };
        dispatch('change', data);
    };
};
</script>

<section>
    <div class="Field--inline">
        <label for="enableTextFilter">
            Enable text filter
            <small>Show todos that match the search query.</small>
        </label>
        <Switch
            name="enableTextFilter"
            checked={data.enableTextFilter}
            onChange={handleChange('enableTextFilter')}
            data-cy="enable-text-filter"
        />
    </div>

    <div class="Field--inline">
        <label for="enableTagsFilter">
            Enable tags filter
            <small>Show todos containing the selected tag. Remains hidden if there are no tags available.</small>
        </label>
        <Switch
            name="enableTagsFilter"
            checked={data.enableTagsFilter}
            onChange={handleChange('enableTagsFilter')}
            data-cy="enable-tags-filter"
        />
    </div>
</section>

<style>
section {
    display: flex;
    flex-direction: column;
    gap: 3.6rem;
}

.Field--inline {
    display: flex;
    align-items: flex-start;
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

.Field--inline label + :global(*) {
    flex-shrink: 0;
    margin-top: 1px;
}

small {
    display: block;
    font-size: 1.3rem;
    font-weight: 400;
    color: var(--dimmed-500);
}
</style>

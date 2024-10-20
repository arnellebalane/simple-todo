<script>
import Switch from '@components/Switch.svelte';

import { getDefaultSettings } from '.';

export let data = getDefaultSettings();
</script>

<section>
    <div class="Field--inline">
        <label for="openOptionalFields">
            Open optional fields by default
            <small>They will still be opened by default on edit if the todo has optional fields set.</small>
        </label>
        <Switch
            name="openOptionalFields"
            bind:value={data.openOptionalFields}
            on:change
            data-cy="open-optional-fields-toggle"
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

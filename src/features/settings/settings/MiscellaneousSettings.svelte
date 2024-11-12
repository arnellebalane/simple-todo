<script>
import Switch from '@components/Switch.svelte';

import { getDefaultSettings } from '.';

let { data = getDefaultSettings(), onChange } = $props();

const handleChange = (key) => {
    return (value) => onChange?.({ ...data, [key]: value });
};
</script>

<section>
    <div class="Field--inline">
        <label for="enablePrivacyMode">
            Enable privacy mode
            <small>Blur out todo contents. Toggle by pressing <kbd>Alt+P</kbd>.</small>
        </label>
        <Switch
            name="enablePrivacyMode"
            checked={data.enablePrivacyMode}
            onChange={handleChange('enablePrivacyMode')}
            data-testid="enable-privacy-mode-toggle"
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

kbd {
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 1.2rem;
    font-weight: 700;
    background-color: var(--dimmed-200);
}
</style>

<script>
import orderBy from 'lodash/orderBy';

import TagsInput from '@features/tags/components/TagsInput.svelte';

import { settings } from '@features/settings/store';
import { tags } from '@features/tags/store';

import TodoFormDateField from './TodoFormDateField.svelte';

export let data = {};

$: tagsChoices = orderBy($tags, (tag) => tag.label.toUpperCase());
$: hasOptionalFields = data.date || data.tags?.length;
$: shouldOpenOptionalFields = hasOptionalFields || $settings.openOptionalFields || isOptionalFieldsToggled;

let isOptionalFieldsToggled = false;

const handleToggle = () => (isOptionalFieldsToggled = true);
</script>

<details open={shouldOpenOptionalFields} on:toggle={handleToggle}>
    <summary>
        <span>Optional fields</span>
    </summary>

    <div class="OptionalFieldsContent">
        <div class="Field">
            <label for="date">Date</label>
            <TodoFormDateField bind:value={data.date} />
        </div>

        <div class="Field">
            <label for="tags">Tags <span>(press <kbd>Enter</kbd> to add)</span></label>
            <TagsInput bind:value={data.tags} choices={tagsChoices} name="tags" type="password" />
        </div>
    </div>
</details>

<style>
label {
    display: block;
    margin-bottom: 8px;
    font-size: 1.5rem;
    font-weight: 600;
}

label span {
    margin-left: 0.4rem;
    font-size: 1.3rem;
    font-weight: 400;
    color: var(--dimmed-500);
}

label kbd {
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 1.2rem;
    font-weight: 700;
    background-color: var(--dimmed-200);
}

summary span {
    margin-left: 0.8rem;
    cursor: pointer;
}

.OptionalFieldsContent {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    padding-top: 0.8rem;
}
</style>

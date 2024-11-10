<script>
import orderBy from 'lodash/orderBy';

import TagsInput from '@features/tags/components/TagsInput.svelte';
import TodoFormDateField from './TodoFormDateField.svelte';

import { settings } from '@features/settings/store';
import { tags } from '@features/tags/store';

let { data, onChange } = $props();

let isOptionalFieldsToggled = $state(false);
const handleToggle = () => (isOptionalFieldsToggled = true);

const tagsChoices = $derived(orderBy($tags, (tag) => tag.label.toUpperCase()));
const hasOptionalFields = $derived(data.date || data.tags?.length);
const shouldOpenOptionalFields = $derived(hasOptionalFields || $settings.openOptionalFields || isOptionalFieldsToggled);

const handleChange = (key) => {
    return (value) => onChange?.({ ...data, [key]: value });
};
</script>

<details open={shouldOpenOptionalFields} ontoggle={handleToggle} data-cy="todo-form-optional-fields">
    <summary>
        <span>Optional fields</span>
    </summary>

    <div class="OptionalFieldsContent">
        <div class="Field">
            <label for="date">Date</label>
            <TodoFormDateField value={data.date} onChange={handleChange('date')} />
        </div>

        <div class="Field">
            <label for="tags">Tags <span>(press <kbd>Enter</kbd> to add)</span></label>
            <TagsInput name="tags" value={data.tags} choices={tagsChoices} onChange={handleChange('tags')} />
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

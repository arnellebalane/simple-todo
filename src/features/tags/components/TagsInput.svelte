<script>
import Button from '@components/Button.svelte';

export let value = [];
export let choices;

let currentValue = '';
$: filteredChoices = choices.filter((choice) => !value.includes(choice.label));

const handleChange = (event) => {
    // Only accept changes triggered by pressing `Enter` on the input. Other
    // reasons (pressing Escape/Tab, clicking outisde) are ignored.
    if (event.target === document.activeElement) {
        if (!value.includes(currentValue)) {
            value = [...value, currentValue];
        }
        currentValue = '';
    }
};
const handleRemove = (tag) => {
    value = value.filter((t) => t !== tag);
};
</script>

<input
    type="text"
    list="tags-choices"
    bind:value={currentValue}
    on:change|stopPropagation|preventDefault={handleChange}
    name={$$props.name}
    id={$$props.name}
    form
    data-cy="tags-input"
/>

<div>
    {#each value as tag (tag)}
        <Button
            small
            class="Button"
            type="button"
            data-tooltip="Click to remove"
            onClick={handleRemove(tag)}
            data-cy="tags-value"
        >
            {tag}
        </Button>
    {/each}
</div>

<datalist id="tags-choices" data-cy="tags-input-datalist">
    {#each filteredChoices as choice (choice.label)}
        <option value={choice.label} />
    {/each}
</datalist>

<style>
input {
    display: block;
    width: 100%;
    padding: 8px 1.2rem;
    border: 2px solid var(--dimmed-300);
    border-radius: 8px;
    line-height: 2.4rem;
    background-color: transparent;
}

div :global(Button) {
    margin-top: 4px;
    margin-right: 4px;
    text-align: left;
    word-break: break-word;
}
</style>

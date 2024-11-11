<script>
import pick from 'lodash/pick';

import CustomUrlField from './CustomUrlField.svelte';
import CustomUrlsList from './CustomUrlsList.svelte';

let { value = [], choices = [], onChange } = $props();

let selectedUrls = $state(value.filter((link) => !link.custom).map((link) => link.url));
const choicesWithSelection = $derived(
    choices.map((link) => ({
        ...link,
        selected: selectedUrls.includes(link.url),
    })),
);

const customQuickLinks = $derived(value.filter((link) => link.custom));
const hasCustomQuickLinks = $derived(customQuickLinks.length > 0);

let customQuickLinkError = $state('');

const handleDefaultLinksChange = () => {
    const selectedLinks = choices.filter((link) => selectedUrls.includes(link.url));
    const updated = [...selectedLinks, ...customQuickLinks].map((link) =>
        pick(link, ['title', 'url', 'icon', 'custom']),
    );
    onChange?.(updated);
};

const handleCustomQuickLinksChange = (data) => {
    const selectedLinks = choices.filter((link) => selectedUrls.includes(link.url));
    const updated = [...selectedLinks, ...data].map((link) => pick(link, ['title', 'url', 'icon', 'custom']));
    onChange?.(updated);
};

const addCustomQuickLink = (data) => {
    const duplicateLink = value.find((link) => link.url === data.url);
    if (duplicateLink) {
        customQuickLinkError = 'Custom link is a duplicate of an existing link.';
    } else {
        onChange?.([...value, { ...data, custom: true }]);
    }
};

const removeCustomQuickLink = (data) => {
    const index = value.findIndex((link) => link.url === data.url);
    if (index >= 0) {
        onChange?.([...value.slice(0, index), ...value.slice(index + 1)]);
    }
};
</script>

<div class="DefaultLinks" data-cy="default-links">
    {#each choicesWithSelection as link (link.url)}
        <label class:selected={link.selected} data-cy="default-link">
            <img src={link.icon} alt={link.title} />
            <p>{link.title}</p>
            <input
                type="checkbox"
                name="quicklinks"
                bind:group={selectedUrls}
                value={link.url}
                onchange={handleDefaultLinksChange}
            />
        </label>
    {/each}
</div>

<div class="CustomLinks" data-cy="custom-links">
    <CustomUrlField
        name="customUrl"
        error={customQuickLinkError}
        onData={addCustomQuickLink}
        onError={(error) => (customQuickLinkError = error)}
    />
    {#if hasCustomQuickLinks}
        <CustomUrlsList
            links={customQuickLinks}
            onChange={handleCustomQuickLinksChange}
            onRemove={removeCustomQuickLink}
        />
    {/if}
</div>

<style>
.DefaultLinks {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: 8rem;
    gap: 4px;
}

label {
    padding: 4px;
    border: 2px solid transparent;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
}

label:focus-within {
    border-style: dashed;
    border-color: var(--primary);
}

label.selected {
    border-style: solid;
    border-color: var(--primary);
}

img {
    display: block;
    width: 4.2rem;
    margin: auto;
}

input {
    position: absolute;
    top: 0;
    left: 0;
    transform: scale(0);
    opacity: 0;
}

.CustomLinks {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;

    margin-top: 2.4rem;
}
</style>

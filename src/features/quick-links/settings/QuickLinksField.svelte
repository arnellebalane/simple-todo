<script>
import { createEventDispatcher } from 'svelte';
import pick from 'lodash/pick';

import CustomUrlField from './CustomUrlField.svelte';
import CustomUrlsList from './CustomUrlsList.svelte';

export let choices = [];
export let value = [];

let selectedUrls = value.filter((link) => !link.custom).map((link) => link.url);
$: choices = choices.map((link) => {
    if (selectedUrls.includes(link.url)) {
        link.selected = true;
    } else {
        delete link.selected;
    }
    return link;
});

$: customQuickLinks = value.filter((link) => link.custom);
$: hasCustomQuickLinks = customQuickLinks.length > 0;

let customQuickLinkError = '';

const dispatch = createEventDispatcher();
const handleChange = () => dispatch('change', value);

const handleDefaultLinksChange = () => {
    const selectedLinks = choices.filter((link) => selectedUrls.includes(link.url));
    value = [...selectedLinks, ...customQuickLinks];
    value = value.map((link) => pick(link, ['title', 'url', 'icon', 'custom']));
    handleChange();
};

const handleCustomQuickLinksChange = (event) => {
    const selectedLinks = choices.filter((link) => selectedUrls.includes(link.url));
    value = [...selectedLinks, ...event.detail];
    value = value.map((link) => pick(link, ['title', 'url', 'icon', 'custom']));
    handleChange();
};

const addCustomQuickLink = (event) => {
    const customLink = event.detail;
    const duplicateLink = value.find((link) => link.url === customLink.url);
    if (duplicateLink) {
        customQuickLinkError = 'Custom link is a duplicate of an existing link.';
    } else {
        value = [...value, { ...customLink, custom: true }];
        handleChange();
    }
};

const removeCustomQuickLink = (event) => {
    const customLink = event.detail;
    const index = value.findIndex((link) => link.url === customLink.url);
    if (index >= 0) {
        value = [...value.slice(0, index), ...value.slice(index + 1)];
        handleChange();
    }
};
</script>

<div class="DefaultLinks" data-cy="default-links">
    {#each choices as link (link.url)}
        <label class:selected={link.selected} data-cy="default-link">
            <img src={link.icon} alt={link.title} />
            <p>{link.title}</p>
            <input
                type="checkbox"
                name="quicklinks"
                bind:group={selectedUrls}
                value={link.url}
                on:change={handleDefaultLinksChange}
            />
        </label>
    {/each}
</div>

<div class="CustomLinks" data-cy="custom-links">
    <CustomUrlField name="customUrl" error={customQuickLinkError} on:data={addCustomQuickLink} />
    {#if hasCustomQuickLinks}
        <CustomUrlsList
            links={customQuickLinks}
            on:remove={removeCustomQuickLink}
            on:change={handleCustomQuickLinksChange}
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

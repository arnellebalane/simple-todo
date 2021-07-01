<script>
import { createEventDispatcher } from 'svelte';
import pick from 'lodash/pick';
import SettingsFormQuickLinksCustomUrlField from '@components/settings/fields/SettingsFormQuickLinksCustomUrlField.svelte';
import SettingsFormQuickLinksCustomUrlsList from '@components/settings/fields/SettingsFormQuickLinksCustomUrlsList.svelte';

export let choices = [];
export let value = [];

let selectedUrls = value.map((link) => link.url);
$: choices = choices.map((link) => {
  if (selectedUrls.includes(link.url)) {
    link.selected = true;
  } else {
    delete link.selected;
  }
  return link;
});

$: customQuickLinks = value.filter((link) => link.custom);

const dispatch = createEventDispatcher();

const handleChange = () => {
  const selectedUrlsSet = new Set(selectedUrls);
  const selectedLinks = choices
    .filter((link) => selectedUrlsSet.has(link.url))
    .map((link) => pick(link, ['title', 'url', 'icon', 'custom']));
  value.splice(0, value.length, ...selectedLinks);
  dispatch('change', value);
};

const addCustomQuickLink = (event) => {
  const customLink = event.detail;
  value.push({ ...customLink, custom: true });
  dispatch('change', value);
};

const removeCustomQuickLink = (event) => {
  const customLink = event.detail;
  const index = value.indexOf(customLink);
  if (index >= 0) {
    value.splice(index, 1);
    dispatch('change', value);
  }
};
</script>

<div class="DefaultLinks">
  {#each choices as link (link.url)}
    <label class:selected={link.selected}>
      <img src={link.icon} alt={link.title} />
      <p>{link.title}</p>
      <input type="checkbox" name="quicklinks" bind:group={selectedUrls} value={link.url} on:change={handleChange} />
    </label>
  {/each}
</div>

<div class="CustomLinks">
  <SettingsFormQuickLinksCustomUrlsList links={customQuickLinks} on:remove={removeCustomQuickLink} />
  <SettingsFormQuickLinksCustomUrlField name="customUrl" on:data={addCustomQuickLink} />
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

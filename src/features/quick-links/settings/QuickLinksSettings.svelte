<script>
import { createEventDispatcher } from 'svelte';
import { frequentLinksSupported } from '@features/quick-links/store';

import Switch from '@components/Switch.svelte';
import SettingsFormQuickLinksField from './QuickLinksField.svelte';

export let data = {
  quickLinks: [],
  showFrequentLinks: false,
};

const builtInQuickLinks = [
  { title: 'Gmail', url: 'https://mail.google.com/', icon: './dist/assets/images/gmail.png' },
  { title: 'Meet', url: 'https://meet.google.com/', icon: './dist/assets/images/meet.png' },
  { title: 'Drive', url: 'https://drive.google.com/', icon: './dist/assets/images/drive.png' },
  { title: 'Calendar', url: 'https://calendar.google.com/', icon: './dist/assets/images/calendar.png' },
  { title: 'Photos', url: 'https://photos.google.com/', icon: './dist/assets/images/photos.png' },
];

const dispatch = createEventDispatcher();
const handleChange = () => dispatch('change', data);
const handleQuickLinksChange = (event) => {
  data.quickLinks = event.detail;
  handleChange();
};
</script>

<section>
  <div class="Field">
    <label for="quicklinks">Select the apps to add a quick link</label>
    <SettingsFormQuickLinksField
      choices={builtInQuickLinks}
      bind:value={data.quickLinks}
      on:change={handleQuickLinksChange}
    />
  </div>

  {#if frequentLinksSupported}
    <div class="Field--inline">
      <label for="frequentLinks">Show frequently visited links</label>
      <Switch name="frequentLinks" bind:value={data.showFrequentLinks} on:change={handleChange} />
    </div>
  {/if}
</section>

<style>
section {
  display: flex;
  flex-direction: column;
  gap: 3.6rem;
}

.Field--inline {
  display: flex;
  align-items: center;
  gap: 8px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-size: 1.8rem;
  font-weight: 700;
}

.Field--inline label {
  margin-right: auto;
  margin-bottom: 0;
}
</style>

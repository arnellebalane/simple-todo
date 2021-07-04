<script>
import { createEventDispatcher } from 'svelte';
import SettingsFormQuickLinksField from '@components/settings/fields/SettingsFormQuickLinksField.svelte';

export let data = {
  quickLinks: [],
};

const builtInQuickLinks = [
  { title: 'Gmail', url: 'https://mail.google.com/', icon: './dist/assets/images/gmail.png' },
  { title: 'Meet', url: 'https://meet.google.com/', icon: './dist/assets/images/meet.png' },
  { title: 'Drive', url: 'https://drive.google.com/', icon: './dist/assets/images/drive.png' },
  { title: 'Calendar', url: 'https://calendar.google.com/', icon: './dist/assets/images/calendar.png' },
  { title: 'Photos', url: 'https://photos.google.com/', icon: './dist/assets/images/photos.png' },
];

const dispatch = createEventDispatcher();
const handleChange = (event) => {
  data.quickLinks = event.detail;
  dispatch('change', data);
};
</script>

<section>
  <div class="Field">
    <label for="quicklinks">Select the apps to add a quick link</label>
    <SettingsFormQuickLinksField choices={builtInQuickLinks} bind:value={data.quickLinks} on:change={handleChange} />
  </div>
</section>

<style>
section {
  display: flex;
  flex-direction: column;
  gap: 3.6rem;
}

label {
  display: block;
  margin-bottom: 8px;
  font-size: 1.8rem;
  font-weight: 700;
}
</style>

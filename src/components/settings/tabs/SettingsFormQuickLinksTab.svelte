<script>
import SettingsFormQuickLinksField from '@components/settings/fields/SettingsFormQuickLinksField.svelte';

export let data = {
  quickLinks: [],
};

const builtInQuickLinks = [
  { name: 'Gmail', url: 'https://mail.google.com/', image: './dist/assets/images/gmail.png' },
  { name: 'Meet', url: 'https://meet.google.com/', image: './dist/assets/images/meet.png' },
  { name: 'Drive', url: 'https://drive.google.com/', image: './dist/assets/images/drive.png' },
  { name: 'Calendar', url: 'https://calendar.google.com/', image: './dist/assets/images/calendar.png' },
  { name: 'Photos', url: 'https://photos.google.com/', image: './dist/assets/images/photos.png' },
];
</script>

<section>
  <div class="Field">
    <label for="quicklinks">
      Select the apps to add a quick link
      <small>You can select upto five quick links</small>
    </label>
    <SettingsFormQuickLinksField choices={builtInQuickLinks} bind:value={data.quickLinks} />
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

small {
  display: block;
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--dimmed-500);
}
</style>

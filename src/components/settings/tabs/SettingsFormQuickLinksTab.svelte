<script>
import SettingsFormQuickLinksField from '@components/settings/fields/SettingsFormQuickLinksField.svelte';

export let data = {
  quickLinks: [],
};

const builtInQuickLinks = [
  { name: 'Gmail', url: 'https://mail.google.com/' },
  { name: 'Meet', url: 'https://meet.google.com/' },
  { name: 'Drive', url: 'https://drive.google.com/' },
  { name: 'Calendar', url: 'https://calendar.google.com/' },
  { name: 'Photos', url: 'https://photos.google.com/' },
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

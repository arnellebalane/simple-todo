<script>
import Button from '@components/Button.svelte';
import SettingsFormModal from '@components/SettingsFormModal.svelte';
import { settings } from '@stores/settings';

let settingsFormData = {};
let showSettingsForm = false;
const toggleSettingsForm = (show) => {
  settingsFormData = show ? { ...$settings } : {};
  showSettingsForm = show;
};

const showChromeWebstoreButton = import.meta.env.SNOWPACK_PUBLIC_IS_WEB_BUILD === 'true';

const handleChange = (event) => settings.preview(event.detail);
const handleSubmit = (event) => {
  settings.save(event.detail);
  toggleSettingsForm(false);
};
const handleCancel = () => {
  settings.restore();
  toggleSettingsForm(false);
};
</script>

<div>
  <Button
    icon
    medium
    iconLight="./dist/assets/icons/settings-light.svg"
    iconDark="./dist/assets/icons/settings-dark.svg"
    on:click={() => toggleSettingsForm(true)}
  >
    Settings
  </Button>

  {#if showChromeWebstoreButton}
    <a
      href="https://chrome.google.com/webstore/detail/simple-todo/kobeijgkgkcgknodjkganceliljepmjf/"
      rel="noopener noreferrer"
      class="umami--click--chrome-webstore-link"
    >
      <img src="./dist/assets/images/chrome-webstore.png" alt="Available in the Chrome Webstore" />
    </a>
  {/if}
</div>

<SettingsFormModal
  show={showSettingsForm}
  data={settingsFormData}
  on:change={handleChange}
  on:submit={handleSubmit}
  on:cancel={handleCancel}
/>

<style>
div {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2rem;
  width: 100%;
  height: 6.4rem;
  padding: 1.4rem 3.6rem;
}

img {
  display: block;
  max-height: 4.2rem;
}
</style>

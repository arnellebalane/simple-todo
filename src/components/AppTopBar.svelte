<script>
import Button from '@components/Button.svelte';
import SettingsFormModal from '@components/SettingsFormModal.svelte';
import WhatsNewModal from '@components/WhatsNewModal.svelte';
import { settings } from '@stores/settings';
import { changelogs } from '@stores/changelogs';

let settingsFormData = {};
let showSettingsForm = false;
const toggleSettingsForm = (show) => {
  settingsFormData = show ? { ...$settings } : {};
  showSettingsForm = show;
};

let showWhatsNewModal = false;
const toggleWhatsNewModal = (show) => (showWhatsNewModal = show);
$: hasChangeLogs = $changelogs.length > 0;

const showChromeWebstoreButton = import.meta.env.SNOWPACK_PUBLIC_IS_WEB_BUILD === 'true';

const handleSettingsChange = (event) => settings.preview(event.detail);
const handleSettingsSubmit = (event) => {
  settings.save(event.detail);
  toggleSettingsForm(false);
};
const handleSettingsClose = () => {
  settings.restore();
  toggleSettingsForm(false);
};
</script>

<div>
  {#if hasChangeLogs}
    <Button
      icon
      medium
      iconLight="./dist/assets/icons/launch-light.svg"
      iconDark="./dist/assets/icons/launch-dark.svg"
      on:click={() => toggleWhatsNewModal(true)}
    >
      What's New
    </Button>
  {/if}
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
  on:change={handleSettingsChange}
  on:submit={handleSettingsSubmit}
  on:close={handleSettingsClose}
/>

<WhatsNewModal show={showWhatsNewModal} on:close={() => toggleWhatsNewModal(false)} />

<style>
div {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 6.4rem;
  padding: 1.4rem 3.6rem;
}

img {
  display: block;
  max-height: 4.2rem;
  margin-left: 1.2rem;
}
</style>

<script>
import { onMount, onDestroy } from 'svelte';
import cloneDeep from 'lodash/cloneDeep';
import Button from '@components/Button.svelte';
import SettingsFormModal from '@components/SettingsFormModal.svelte';
import WhatsNewModal from '@components/WhatsNewModal.svelte';
import WhatsNewButton from '@components/WhatsNewButton.svelte';
import { enableShortcut, disableShortcut } from '@lib/shortcuts';
import { settings } from '@stores/settings';
import { changelogs, version } from '@stores/changelogs';

let settingsUnsubscribe = null;
let settingsFormData = {};
let showSettingsForm = false;
const toggleSettingsForm = (show) => {
  showSettingsForm = show;
  if (show) {
    settingsUnsubscribe = settings.subscribe((value) => {
      settingsFormData = cloneDeep(value);
    });
    settings.preview(cloneDeep($settings));
  } else {
    settingsUnsubscribe();
    settingsFormData = {};
  }
};

let showWhatsNewModal = false;
const toggleWhatsNewModal = (show) => (showWhatsNewModal = show);
$: hasChangeLogs = $changelogs.length > 0;
$: hasSeenChangeLogs = $version === import.meta.env.APP_VERSION;

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

onMount(() => enableShortcut('togglePrivacyMode', settings.togglePrivacyMode));
onDestroy(() => disableShortcut('togglePrivacyMode'));
</script>

<div>
  {#if hasChangeLogs}
    <WhatsNewButton pulse={!hasSeenChangeLogs} on:click={() => toggleWhatsNewModal(true)} />
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

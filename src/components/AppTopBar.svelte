<script>
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
  <button class="SettingsButton" on:click={() => toggleSettingsForm(true)}>Settings</button>

  {#if showChromeWebstoreButton}
    <a
      href="https://chrome.google.com/webstore/detail/simple-todo/kobeijgkgkcgknodjkganceliljepmjf/"
      rel="noopener noreferrer"
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
  position: absolute;
  top: 0;
  left: 0;

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

.SettingsButton {
  width: 3.6rem;
  height: 3.6rem;
  border: none;
  font-size: 0;
  background: transparent center center no-repeat;
  background-image: url('./dist/assets/icons/settings-dark.svg');
  background-size: 2.4rem;
  cursor: pointer;
}

:global(body[data-background]) .SettingsButton {
  border-radius: 8px;
  background-color: var(--main-transparent);
}

:global(body[data-theme='DARK']) .SettingsButton {
  background-image: url('./dist/assets/icons/settings-light.svg');
}

@media (prefers-color-scheme: dark) {
  .SettingsButton {
    background-image: url('./dist/assets/icons/settings-light.svg');
  }

  :global(body[data-theme='LIGHT']) .SettingsButton {
    background-image: url('./dist/assets/icons/settings-dark.svg');
  }
}
</style>

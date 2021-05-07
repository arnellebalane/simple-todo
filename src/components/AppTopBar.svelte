<script>
import SettingsFormModal from '@components/SettingsFormModal.svelte';
import { settings } from '@stores/settings';

let showSettingsForm = false;
const toggleSettingsForm = (show) => (showSettingsForm = show);

const handleSubmit = (event) => {
  settings.set(event.detail);
  toggleSettingsForm(false);
};
</script>

<div>
  <button class="SettingsButton" on:click={() => toggleSettingsForm(true)}>Settings</button>
</div>

<SettingsFormModal
  show={showSettingsForm}
  data={$settings}
  on:submit={handleSubmit}
  on:cancel={() => toggleSettingsForm(false)}
/>

<style>
div {
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 6.4rem;
  padding: 1.4rem 3.6rem;
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

:global([data-theme='DARK']) .SettingsButton {
  background-image: url('./dist/assets/icons/settings-light.svg');
}

@media (prefers-color-scheme: dark) {
  .SettingsButton {
    background-image: url('./dist/assets/icons/settings-light.svg');
  }

  :global([data-theme='LIGHT']) .SettingsButton {
    background-image: url('./dist/assets/icons/settings-dark.svg');
  }
}
</style>

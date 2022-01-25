<script>
import { createEventDispatcher } from 'svelte';
import Button from '@components/Button.svelte';
import Selector from '@components/Selector.svelte';
import Switch from '@components/Switch.svelte';
import SettingsFormBackgroundSourceChoice from '@components/settings/fields/SettingsFormBackgroundSourceChoice.svelte';
import SettingsFormImageUrlField from '@components/settings/fields/SettingsFormImageUrlField.svelte';
import SettingsFormImageUploadField from '@components/settings/fields/SettingsFormImageUploadField.svelte';
import { settings } from '@features/settings/store';
import {
  BACKGROUND_AUTOMATIC,
  BACKGROUND_CUSTOM,
  BACKGROUND_REFRESH_DAILY,
  BACKGROUND_REFRESH_WEEKLY,
  BACKGROUND_REFRESH_MANUALLY,
} from '@lib/constants';

export let data = {
  background: false,
  backgroundSource: BACKGROUND_AUTOMATIC,
  backgroundRefreshFrequency: BACKGROUND_REFRESH_DAILY,
};

let backgroundSource = data.backgroundSource;
const backgroundSourceChoices = [
  { label: 'Automatic', subtext: 'Random from Unsplash', value: BACKGROUND_AUTOMATIC },
  { label: 'Custom', subtext: 'Specify your own image', value: BACKGROUND_CUSTOM },
];
const backgroundRefreshFrequencyChoices = [
  { label: 'Daily', value: BACKGROUND_REFRESH_DAILY },
  { label: 'Weekly', value: BACKGROUND_REFRESH_WEEKLY },
  { label: 'Manually', value: BACKGROUND_REFRESH_MANUALLY },
];
const BACKGROUND_CUSTOM_UNSPLASH_NAME = 'backgroundCustomUnsplash';
let backgroundCustomUnsplash = '';
let backgroundCustomUnsplashError = null;
const BACKGROUND_CUSTOM_FILE_NAME = 'backgroundCustomFile';
let backgroundCustomFile = null;
let backgroundCustomFileError = null;

const dispatch = createEventDispatcher();

let currentRequest;
$: hasCurrentRequest = Boolean(currentRequest);

const handleChange = () => dispatch('change', data);

const handleRefresh = async () => {
  const { source, request } = settings.getBackgroundImage();
  currentRequest = source;
  try {
    data.backgroundImage = await request;
    data.backgroundImageLastUpdate = Date.now();
    data.backgroundSource = BACKGROUND_AUTOMATIC;
    delete data.backgroundPreloaded;
    handleChange();
  } catch (error) {
    console.error(error);
  }
  currentRequest = null;
};

const handleBackgroundChange = async (event) => {
  currentRequest?.cancel();
  if (data.background) {
    if (backgroundSource === BACKGROUND_AUTOMATIC) {
      await handleBackgroundChangeAutomatic();
    } else if (event.detail === BACKGROUND_CUSTOM_UNSPLASH_NAME) {
      await handleBackgroundChangeCustomUrl();
    } else if (event.detail === BACKGROUND_CUSTOM_FILE_NAME) {
      await handleBackgroundChangeCustomFile();
    }
  } else {
    handleBackgroundUnset();
  }
  currentRequest = null;
  handleChange();
};

const handleBackgroundChangeAutomatic = async () => {
  const { source, request } = settings.getBackgroundImage();
  currentRequest = source;
  try {
    data.backgroundImage = await request;
    data.backgroundImageLastUpdate = Date.now();
    data.backgroundSource = BACKGROUND_AUTOMATIC;
    delete data.backgroundPreloaded;
  } catch (error) {
    console.error(error);
    data.background = false;
  }
};

const handleBackgroundChangeCustomUrl = async () => {
  backgroundCustomUnsplashError = null;
  let url;
  try {
    url = new URL(backgroundCustomUnsplash);
  } catch {
    backgroundCustomUnsplashError = 'Please input a valid URL';
    return;
  }

  const { source, request } = settings.getBackgroundImage(backgroundCustomUnsplash);
  currentRequest = source;

  try {
    data.backgroundImage = await request;
    data.backgroundImageLastUpdate = Date.now();
    data.backgroundSource = BACKGROUND_CUSTOM;
    data.backgroundRefreshFrequency = BACKGROUND_REFRESH_MANUALLY;
    delete data.backgroundPreloaded;
  } catch (error) {
    console.error(error);
    backgroundCustomUnsplashError = error.response.data.message || 'Something went wrong, please try again.';
  }
};

const handleBackgroundChangeCustomFile = async () => {
  if (!backgroundCustomFile.type.startsWith('image/')) {
    backgroundCustomFileError = 'Selected file is not an image.';
    return;
  }
  data.backgroundImage = {
    photo_url: await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.readAsDataURL(backgroundCustomFile);
    }),
  };
  data.backgroundImageLastUpdate = Date.now();
  data.backgroundSource = BACKGROUND_CUSTOM;
  data.backgroundRefreshFrequency = BACKGROUND_REFRESH_MANUALLY;
  delete data.backgroundPreloaded;
};

const handleBackgroundUnset = () => {
  delete data.backgroundImage;
  delete data.backgroundImageLastUpdate;
  delete data.backgroundPreloaded;
  data.backgroundSource = BACKGROUND_AUTOMATIC;
  data.backgroundRefreshFrequency = BACKGROUND_REFRESH_DAILY;
};

const handleRefreshFrequencyChange = () => {
  data.backgroundSource = BACKGROUND_AUTOMATIC;
  handleChange();
};
</script>

<section>
  <div class="Field--inline">
    <label for="background">Show background image</label>
    <Switch name="background" bind:value={data.background} on:change={handleBackgroundChange} />
  </div>

  {#if data.background}
    <Selector
      name="backgroundSource"
      bind:value={backgroundSource}
      disabled={hasCurrentRequest}
      choices={backgroundSourceChoices}
      choiceComponent={SettingsFormBackgroundSourceChoice}
    />

    {#if backgroundSource === BACKGROUND_AUTOMATIC}
      <div class="Field">
        <label for="backgroundRefreshFrequency">Refresh background image</label>
        <div class="RefreshBackground">
          <Selector
            class="RefreshBackgroundFrequency"
            name="backgroundRefreshFrequency"
            bind:value={data.backgroundRefreshFrequency}
            choices={backgroundRefreshFrequencyChoices}
            on:change={handleRefreshFrequencyChange}
          />
          <Button type="button" disabled={hasCurrentRequest} on:click={handleRefresh}>Refresh</Button>
        </div>
      </div>
    {:else}
      <div class="Field">
        <label for={BACKGROUND_CUSTOM_UNSPLASH_NAME}>Unsplash image URL</label>
        <SettingsFormImageUrlField
          name={BACKGROUND_CUSTOM_UNSPLASH_NAME}
          bind:value={backgroundCustomUnsplash}
          error={backgroundCustomUnsplashError}
          disabled={hasCurrentRequest}
          on:change={handleBackgroundChange}
        />
      </div>

      <div class="Field">
        <label for={BACKGROUND_CUSTOM_FILE_NAME}>Upload an image</label>
        <SettingsFormImageUploadField
          name={BACKGROUND_CUSTOM_FILE_NAME}
          bind:value={backgroundCustomFile}
          error={backgroundCustomFileError}
          on:change={handleBackgroundChange}
        />
      </div>
    {/if}
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

.RefreshBackground {
  display: flex;
  gap: 8px;
}

.RefreshBackground :global(.RefreshBackgroundFrequency) {
  flex-grow: 1;
}

.RefreshBackground :global(.RefreshBackgroundFrequency span) {
  padding-left: 1.8rem;
  padding-right: 1.8rem;
}
</style>

<script>
import { createEventDispatcher } from 'svelte';

import { backgrounds } from '@features/backgrounds/store';
import {
  BACKGROUND_AUTOMATIC,
  BACKGROUND_CUSTOM,
  BACKGROUND_REFRESH_DAILY,
  BACKGROUND_REFRESH_MANUALLY,
} from '../constants';

import Selector from '@components/Selector.svelte';
import Switch from '@components/Switch.svelte';
import SourceChoiceField from './SourceChoiceField.svelte';
import AutomaticSourceFieldSet from './AutomaticSourceFieldSet.svelte';
import ImageUrlField from './ImageUrlField.svelte';
import ImageUploadField from './ImageUploadField.svelte';

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
const handleRequest = (event) => {
  if (event.detail) {
    currentRequest?.cancel();
  }
  currentRequest = event.detail;
};

const handleBackgroundChange = async (event) => {
  if (data.background) {
    // if (event.detail === BACKGROUND_CUSTOM_UNSPLASH_NAME) {
    //   await handleBackgroundChangeCustomUrl();
    // } else if (event.detail === BACKGROUND_CUSTOM_FILE_NAME) {
    //   await handleBackgroundChangeCustomFile();
    // }
  } else {
    delete data.backgroundImage;
    delete data.backgroundImageLastUpdate;
    delete data.backgroundPreloaded;
    data.backgroundSource = BACKGROUND_AUTOMATIC;
    data.backgroundRefreshFrequency = BACKGROUND_REFRESH_DAILY;
  }
  handleChange();
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

  const { source, request } = backgrounds.getBackgroundImage(backgroundCustomUnsplash);
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
      choiceComponent={SourceChoiceField}
    />

    {#if backgroundSource === BACKGROUND_AUTOMATIC}
      <AutomaticSourceFieldSet
        {data}
        disabled={hasCurrentRequest}
        on:request={handleRequest}
        on:change={handleChange}
      />
    {:else}
      <div class="Field">
        <label for={BACKGROUND_CUSTOM_UNSPLASH_NAME}>Unsplash image URL</label>
        <ImageUrlField
          name={BACKGROUND_CUSTOM_UNSPLASH_NAME}
          bind:value={backgroundCustomUnsplash}
          error={backgroundCustomUnsplashError}
          disabled={hasCurrentRequest}
          on:change={handleBackgroundChange}
        />
      </div>

      <div class="Field">
        <label for={BACKGROUND_CUSTOM_FILE_NAME}>Upload an image</label>
        <ImageUploadField
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
</style>

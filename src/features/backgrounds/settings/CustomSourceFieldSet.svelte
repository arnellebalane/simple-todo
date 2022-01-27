<script>
import { createEventDispatcher } from 'svelte';

import { backgrounds } from '@features/backgrounds/store';
import { BACKGROUND_CUSTOM, BACKGROUND_REFRESH_MANUALLY } from '../constants';

import ImageUrlField from './ImageUrlField.svelte';
import ImageUploadField from './ImageUploadField.svelte';

export let data = {};
export let disabled = {};

let backgroundCustomUnsplash = '';
let backgroundCustomUnsplashError = null;
let backgroundCustomFile = null;
let backgroundCustomFileError = null;

const dispatch = createEventDispatcher();
const handleChange = () => dispatch('change', data);
const handleRequest = (source = null) => dispatch('request', source);

const handleCustomUnsplash = async () => {
  backgroundCustomUnsplashError = null;
  try {
    new URL(backgroundCustomUnsplash);
  } catch {
    backgroundCustomUnsplashError = 'Please input a valid URL.';
    return;
  }

  const { source, request } = backgrounds.getBackgroundImage(backgroundCustomUnsplash);
  handleRequest(source);
  try {
    data.backgroundImage = await request;
    data.backgroundImageLastUpdate = Date.now();
    data.backgroundSource = BACKGROUND_CUSTOM;
    data.backgroundRefreshFrequency = BACKGROUND_REFRESH_MANUALLY;
    delete data.backgroundPreloaded;
    handleChange();
  } catch (error) {
    console.error(error);
    backgroundCustomUnsplashError = error.response.data.message || 'Something went wrong, please try again.';
  }
  handleRequest();
};

const handleCustomFile = async () => {
  console.log(backgroundCustomFile);
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
  handleChange();
};
</script>

<div class="Field">
  <label for="backgroundCustomUnsplash">Unsplash image URL</label>
  <ImageUrlField
    name="backgroundCustomUnsplash"
    bind:value={backgroundCustomUnsplash}
    error={backgroundCustomUnsplashError}
    on:change={handleCustomUnsplash}
    {disabled}
  />
</div>

<div class="Field">
  <label for="backgroundCustomFile">Upload an image</label>
  <ImageUploadField
    name="backgroundCustomFile"
    bind:value={backgroundCustomFile}
    error={backgroundCustomFileError}
    on:change={handleCustomFile}
  />
</div>

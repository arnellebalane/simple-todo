<script>
import { createEventDispatcher } from 'svelte';

import ImageUploadField from './ImageUploadField.svelte';
import ImageUrlField from './ImageUrlField.svelte';

import { BACKGROUND_REFRESH_MANUALLY, BACKGROUND_SOURCE_CUSTOM } from '../constants';

export let data = {};
export let disabled = false;

const dispatch = createEventDispatcher();

const handleCustomBackgroundImage = (event) => {
    data.backgroundImage = event.detail;
    data.backgroundImageLastUpdate = Date.now();
    data.backgroundSource = BACKGROUND_SOURCE_CUSTOM;
    data.backgroundRefreshFrequency = BACKGROUND_REFRESH_MANUALLY;
    delete data.backgroundPreloaded;
    dispatch('change', data);
};
</script>

<div class="Field" data-cy="custom-source-image-url-field">
    <label for="backgroundCustomUnsplash">Unsplash image URL</label>
    <ImageUrlField name="backgroundCustomUnsplash" on:change={handleCustomBackgroundImage} on:request {disabled} />
</div>

<div class="Field" data-cy="custom-source-image-upload-field">
    <label for="backgroundCustomFile">Upload an image</label>
    <ImageUploadField name="backgroundCustomFile" on:change={handleCustomBackgroundImage} on:request {disabled} />
</div>

<style>
label {
    display: block;
    margin-bottom: 8px;
    font-size: 1.7rem;
    font-weight: 600;
}
</style>

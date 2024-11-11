<script>
import ImageUploadField from './ImageUploadField.svelte';
import ImageUrlField from './ImageUrlField.svelte';

import { BACKGROUND_REFRESH_MANUALLY, BACKGROUND_SOURCE_CUSTOM } from '../constants';

let { data = {}, disabled = false, onChange, onRequest } = $props();

const handleCustomBackgroundImage = (background) => {
    const updated = {
        ...data,
        backgroundImage: background,
        backgroundImageLastUpdate: Date.now(),
        backgroundSource: BACKGROUND_SOURCE_CUSTOM,
        backgroundRefreshFrequency: BACKGROUND_REFRESH_MANUALLY,
    };
    delete updated.backgroundPreloaded;
    onChange?.(updated);
};
</script>

<div class="Field" data-cy="custom-source-image-url-field">
    <label for="backgroundCustomUnsplash">Unsplash image URL</label>
    <ImageUrlField name="backgroundCustomUnsplash" onChange={handleCustomBackgroundImage} {onRequest} {disabled} />
</div>

<div class="Field" data-cy="custom-source-image-upload-field">
    <label for="backgroundCustomFile">Upload an image</label>
    <ImageUploadField name="backgroundCustomFile" onChange={handleCustomBackgroundImage} {onRequest} {disabled} />
</div>

<style>
label {
    display: block;
    margin-bottom: 8px;
    font-size: 1.7rem;
    font-weight: 600;
}
</style>

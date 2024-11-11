<script>
import Button from '@components/Button.svelte';

let { name, disabled = false, onRequest, onChange } = $props();

const label = $derived(value ? value.name : 'Choose an image');
const form = $derived(`image-upload-field-${name}`);
let value = $state(null);
let error = $state('');

const handleSubmit = async (event) => {
    event.preventDefault();

    error = '';
    if (!value.type.startsWith('image/')) {
        error = 'Selected file is not an image.';
        return;
    }

    onRequest?.({ cancel: () => {} });
    onChange?.({
        photo_url: await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve(event.target.result);
            reader.readAsDataURL(value);
        }),
    });
    onRequest?.();
};

const selectImageFile = (event) => {
    error = '';
    value = event.target.files[0];
};
</script>

<form id={form} onsubmit={handleSubmit}>
    <label>
        <span class:error>{label}</span>
        <input
            type="file"
            accept="image/*"
            id={name}
            {name}
            {form}
            {disabled}
            onchange={selectImageFile}
            data-cy="image-upload-field-input"
        />
    </label>

    <Button disabled={disabled || !value} {form} data-cy="image-upload-field-button">Set image</Button>
</form>

{#if error}
    <p class="Error" data-cy="image-upload-field-error">{error}</p>
{/if}

<style>
form {
    display: flex;
    gap: 8px;
}

label {
    flex-grow: 1;
    display: flex;
    position: relative;
}

span {
    flex-grow: 1;
    display: block;
    width: 0;
    padding: 8px 1.2rem;
    border: 2px solid var(--dimmed-300);
    border-radius: 8px;

    line-height: 2.4rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: var(--dimmed-100);
    cursor: pointer;
}

span.error {
    border-color: var(--danger);
}

input {
    position: absolute;
    opacity: 0;
    transform: scale(0);
}

.Error {
    margin-top: 8px;
    color: var(--danger);
}
</style>

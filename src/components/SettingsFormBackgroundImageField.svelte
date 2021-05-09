<script>
import { createEventDispatcher } from 'svelte';
import Switch from '@components/Switch.svelte';
import { settings } from '@stores/settings';

export let data = {
  background: false,
};

const dispatch = createEventDispatcher();

let currentRequest;
$: hasCurrentRequest = Boolean(currentRequest);

const handleRefresh = async () => {
  const { source, request } = settings.getBackgroundImage();
  currentRequest = source;

  try {
    data.backgroundImage = await request;
    currentRequest = null;
    dispatch('change', data);
  } catch (error) {
    console.error(error);
  }
};

const handleBackgroundChange = async () => {
  currentRequest?.cancel();
  if (data.background) {
    const { source, request } = settings.getBackgroundImage();
    currentRequest = source;

    try {
      data.backgroundImage = await request;
    } catch (error) {
      console.error(error);
      data.background = false;
    }
  } else {
    delete data.backgroundImage;
  }
  currentRequest = null;
  dispatch('change', data);
};
</script>

<div>
  <label for="background">Show background image</label>
  {#if data.background}
    <button type="button" disabled={hasCurrentRequest} on:click={handleRefresh}>Refresh</button>
  {/if}
  <Switch name="background" bind:value={data.background} on:change={handleBackgroundChange} />
</div>

<style>
div {
  display: flex;
  align-items: center;
  gap: 8px;
}

label {
  margin-right: auto;
  font-size: 1.8rem;
  font-weight: 700;
}

button {
  width: 2.4rem;
  height: 2.4rem;
  border: none;
  font-size: 0;
  background: transparent url('./dist/assets/icons/refresh-dark.svg') center center no-repeat;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

:global(body[data-theme='DARK']) button {
  background-image: url('./dist/assets/icons/refresh-light.svg');
}

@media (prefers-color-scheme: dark) {
  button {
    background-image: url('./dist/assets/icons/refresh-light.svg');
  }

  :global(body[data-theme='LIGHT']) button {
    background-image: url('./dist/assets/icons/refresh-dark.svg');
  }
}
</style>

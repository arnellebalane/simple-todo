<script>
import { createEventDispatcher } from 'svelte';
import Selector from '@components/Selector.svelte';
import Switch from '@components/Switch.svelte';
import { settings } from '@stores/settings';
import { BACKGROUND_REFRESH_DAILY, BACKGROUND_REFRESH_WEEKLY, BACKGROUND_REFRESH_MANUALLY } from '@lib/constants';

export let data = {
  background: false,
  backgroundRefreshFrequency: BACKGROUND_REFRESH_DAILY,
};

const backgroundRefreshFrequencyChoices = [
  { label: 'Daily', value: BACKGROUND_REFRESH_DAILY },
  { label: 'Weekly', value: BACKGROUND_REFRESH_WEEKLY },
  { label: 'Manually', value: BACKGROUND_REFRESH_MANUALLY },
];

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
    delete data.backgroundPreloaded;
    handleChange();
  } catch (error) {
    console.error(error);
  }
  currentRequest = null;
};

const handleBackgroundChange = async () => {
  currentRequest?.cancel();
  if (data.background) {
    const { source, request } = settings.getBackgroundImage();
    currentRequest = source;

    try {
      data.backgroundImage = await request;
      data.backgroundImageLastUpdate = Date.now();
    } catch (error) {
      console.error(error);
      data.background = false;
    }
  } else {
    delete data.backgroundImage;
    delete data.backgroundImageLastUpdate;
    delete data.backgroundPreloaded;
    data.backgroundRefreshFrequency = BACKGROUND_REFRESH_DAILY;
  }
  currentRequest = null;
  handleChange();
};
</script>

<div class="Field--inline">
  <label for="background">Show background image</label>
  {#if data.background}
    <button type="button" disabled={hasCurrentRequest} on:click={handleRefresh}>Refresh</button>
  {/if}
  <Switch name="background" bind:value={data.background} on:change={handleBackgroundChange} />
</div>

{#if data.background}
  <div>
    <label for="backgroundRefreshFrequency">Refresh background image</label>
    <Selector
      name="backgroundRefreshFrequency"
      bind:value={data.backgroundRefreshFrequency}
      choices={backgroundRefreshFrequencyChoices}
      on:change={handleChange}
    />
  </div>
{/if}

<style>
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

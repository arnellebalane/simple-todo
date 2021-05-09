<script>
import { createEventDispatcher } from 'svelte';
import Switch from '@components/Switch.svelte';
import { settings } from '@stores/settings';

export let data = {
  background: false,
};

const dispatch = createEventDispatcher();

let sourceCache;
const handleBackgroundChange = async () => {
  if (data.background) {
    const { source, request } = settings.getBackgroundImage();
    sourceCache = source;

    try {
      data.backgroundImage = await request;
    } catch (error) {
      console.error(error);
      data.background = false;
    }
  } else {
    sourceCache?.cancel();
    delete data.backgroundImage;
  }
  sourceCache = null;
  dispatch('change', data);
};
</script>

<div>
  <label for="background">Show background image</label>
  <Switch name="background" bind:value={data.background} on:change={handleBackgroundChange} />
</div>

<style>
div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

label {
  font-size: 1.8rem;
  font-weight: 700;
}
</style>

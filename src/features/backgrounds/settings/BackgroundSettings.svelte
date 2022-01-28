<script>
import { createEventDispatcher } from 'svelte';
import omit from 'lodash/omit';

import { getDefaultSettings, allowedFields } from '.';
import { BACKGROUND_SOURCE_AUTOMATIC, BACKGROUND_SOURCE_CUSTOM } from '../constants';

import Selector from '@components/Selector.svelte';
import Switch from '@components/Switch.svelte';
import SourceChoiceField from './SourceChoiceField.svelte';
import AutomaticSourceFieldSet from './AutomaticSourceFieldSet.svelte';
import CustomSourceFieldSet from './CustomSourceFieldSet.svelte';

export let data = getDefaultSettings();

let backgroundSource = data.backgroundSource;
const backgroundSourceChoices = [
  { label: 'Automatic', subtext: 'Random from Unsplash', value: BACKGROUND_SOURCE_AUTOMATIC },
  { label: 'Custom', subtext: 'Specify your own image', value: BACKGROUND_SOURCE_CUSTOM },
];

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

const handleBackgroundChange = async () => {
  if (!data.background) {
    data = omit(data, allowedFields);
    data = Object.assign(data, getDefaultSettings());
    backgroundSource = data.backgroundSource;
    handleChange();
  }
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

    {#if backgroundSource === BACKGROUND_SOURCE_AUTOMATIC}
      <AutomaticSourceFieldSet
        {data}
        disabled={hasCurrentRequest}
        on:request={handleRequest}
        on:change={handleChange}
      />
    {:else}
      <CustomSourceFieldSet {data} disabled={hasCurrentRequest} on:request={handleRequest} on:change={handleChange} />
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
  font-size: 1.7rem;
  font-weight: 600;
}

.Field--inline label {
  margin-right: auto;
  margin-bottom: 0;
}
</style>

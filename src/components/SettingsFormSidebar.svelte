<script>
import { SETTINGS_THEME, SETTINGS_BACKGROUND } from '@lib/constants';

export let value;

const tabs = [
  { label: 'Theme', value: SETTINGS_THEME },
  { label: 'Background', value: SETTINGS_BACKGROUND },
];
</script>

<aside>
  {#each tabs as tab (tab.value)}
    <label>
      <input type="radio" name="sidebar" bind:group={value} value={tab.value} />
      <span>{tab.label}</span>
    </label>
  {/each}
</aside>

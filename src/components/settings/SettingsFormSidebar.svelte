<script>
import isEmpty from 'lodash/isEmpty';
import {
  SETTINGS_THEME,
  SETTINGS_BACKGROUND,
  SETTINGS_TAGS,
  SETTINGS_SHORTCUTS,
  SETTINGS_MISCELLANEOUS,
} from '@lib/constants';
import { tags } from '@stores/tags';

export let value;

const tabs = [
  { label: 'Theme', value: SETTINGS_THEME },
  { label: 'Background', value: SETTINGS_BACKGROUND },
  { label: 'Tags', value: SETTINGS_TAGS, hidden: isEmpty($tags) },
  { label: 'Shortcuts', value: SETTINGS_SHORTCUTS },
  { label: 'Miscellaneous', value: SETTINGS_MISCELLANEOUS },
].filter((tab) => !tab.hidden);
</script>

<aside class={$$props.class}>
  <h1>Settings</h1>

  {#each tabs as tab (tab.value)}
    <label>
      <input type="radio" name="sidebar" bind:group={value} value={tab.value} />
      <span>{tab.label}</span>
    </label>
  {/each}
</aside>

<style>
aside {
  display: flex;
  flex-direction: column;

  padding: 3.6rem 1.8rem;
  border-radius: 1.6rem 0 0 1.6rem;
  background-color: var(--dimmed-100);
}

h1 {
  padding: 0 1.8rem;
  margin-bottom: 8px;
  font-size: 1.8rem;
  font-weight: 700;
}

label {
  display: block;
  position: relative;
  cursor: pointer;
}

input {
  position: absolute;
  opacity: 0;
  transform: scale(0);
}

span {
  display: block;
  padding: 8px 1.8rem;
  border-radius: 8px;
  line-height: 2rem;
}

label:hover span,
input:focus + span {
  background-color: var(--dimmed-200);
}

input:checked + span {
  background-color: var(--primary);
}
</style>

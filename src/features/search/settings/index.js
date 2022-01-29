import SearchSettings from './SearchSettings.svelte';

export const id = 'SEARCH';
export const label = 'Search';
export const component = SearchSettings;

export const getDefaultSettings = () => ({
  enableTextFilter: true,
  enableTagsFilter: false,
});
export const allowedFields = ['enableTextFilter', 'enableTagsFilter'];

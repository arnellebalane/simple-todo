import { search } from '../store';
import SearchSettings from './SearchSettings.svelte';

export const id = 'SEARCH';
export const label = 'Search';
export const component = SearchSettings;

export const getDefaultSettings = () => ({
  enableTextFilter: true,
  enableTagsFilter: true,
});
export const allowedFields = ['enableTextFilter', 'enableTagsFilter'];

export const onSave = (settings, updated) => {
  const textFilterChanged = settings.enableTextFilter !== updated.enableTextFilter;
  const tagsFilterChanged = settings.enableTagsFilter !== updated.enableTagsFilter;
  if (textFilterChanged || tagsFilterChanged) {
    search.clear();
  }
};

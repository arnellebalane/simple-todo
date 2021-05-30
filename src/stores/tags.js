import { writable } from 'svelte/store';
import { STORAGE_KEY_TAGS } from '@lib/constants';

function createStore() {
  const cachedTags = localStorage.getItem(STORAGE_KEY_TAGS);

  const { subscribe, set, update } = writable(cachedTags ? JSON.parse(cachedTags) : {});

  function add(newTags) {
    update((tags) => {
      for (const tag of newTags) {
        if (!tags.hasOwnProperty(tag)) {
          tags[tag] = { label: tag };
        }
      }
      return tags;
    });
  }

  return { subscribe, set, update, add };
}

export const tags = createStore();

tags.subscribe((value) => localStorage.setItem(STORAGE_KEY_TAGS, JSON.stringify(value)));

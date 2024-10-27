import cloneDeep from 'lodash/cloneDeep';
import mapValues from 'lodash/mapValues';
import pick from 'lodash/pick';
import pickBy from 'lodash/pickBy';
import { writable } from 'svelte/store';

import { todos } from '@features/todos/store';
import { STORAGE_KEY_TAGS } from '@lib/constants';

function createStore() {
    const cachedTags = localStorage.getItem(STORAGE_KEY_TAGS);
    const allowedFields = ['label'];

    const { subscribe, set, update } = writable(cachedTags ? JSON.parse(cachedTags) : {});

    let tagsCache = null;

    function add(newTags) {
        update((tags) => {
            for (const tag of newTags) {
                if (!tags.hasOwnProperty(tag)) {
                    tags[tag] = { label: tag };
                }
            }
            saveInStorage(tags);
            return tags;
        });
    }

    function updateTag(tag, changes) {
        update((tags) => {
            tagsCache = tagsCache || cloneDeep(tags);
            tags[tag] = Object.assign({}, tags[tag], changes);
            return tags;
        });
    }

    function restore() {
        if (tagsCache) {
            set(tagsCache);
            tagsCache = null;
        }
    }

    function save() {
        update((tags) => {
            tags = pickBy(tags, (tag) => !tag.removed);
            tags = mapValues(tags, (tag) => pick(tag, allowedFields));
            todos.updateTags(tags);
            saveInStorage(tags);
            return tags;
        });
    }

    function saveInStorage(data) {
        localStorage.setItem(STORAGE_KEY_TAGS, JSON.stringify(data));
    }

    return { subscribe, set, update, add, updateTag, restore, save, saveInStorage };
}

export const tags = createStore();

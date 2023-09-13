import { writable } from 'svelte/store';
import semverGt from 'semver/functions/gt';
import semverGte from 'semver/functions/gte';

import axios from '@lib/axios';
import { APP_VERSION, STORAGE_KEY_VERSION } from '@lib/constants';

const defaultVersion = '1.7.2'; // The version before when this feature is added
const initialVersion = localStorage.getItem(STORAGE_KEY_VERSION) || defaultVersion;

export const changelogs = writable([]);
export const version = writable(initialVersion);

version.subscribe((value) => localStorage.setItem(STORAGE_KEY_VERSION, value));

const nextVersion = APP_VERSION;
if (initialVersion !== nextVersion) {
    const params = {
        version: initialVersion,
        next_version: nextVersion,
    };
    axios
        .get('/get-version-changelog', { params })
        .then((response) => {
            changelogs.set(response.data);
            if (response.data.length === 0) {
                version.set(nextVersion);
            }
        })
        .catch((error) => console.error(error));
}

export function setVersionIfHigher(value) {
    version.update((version) => (semverGt(value, version) && semverGte(APP_VERSION, value) ? value : version));
}

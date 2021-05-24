import { writable } from 'svelte/store';
import semverGt from 'semver/functions/gt';
import axios from '@lib/axios';
import { STORAGE_KEY_VERSION } from '@lib/constants';

const defaultVersion = '1.7.2'; // The version before when this feature is added
const initialVersion = localStorage.getItem(STORAGE_KEY_VERSION) || defaultVersion;

export const changelogs = writable([]);
export const version = writable(initialVersion);

version.subscribe((value) => localStorage.setItem(STORAGE_KEY_VERSION, value));

if (initialVersion !== import.meta.env.APP_VERSION) {
  const params = {
    version: initialVersion,
    next_version: import.meta.env.APP_VERSION,
  };
  axios.get('/get-version-changelog', { params }).then((response) => {
    changelogs.set(response.data);
  });
}

export function setVersionIfHigher(value) {
  version.update((version) => (semverGt(value, version) ? value : version));
}

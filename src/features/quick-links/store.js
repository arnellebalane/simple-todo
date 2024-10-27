import pick from 'lodash/pick';
import { writable } from 'svelte/store';

function createStore() {
    const { subscribe, set, update } = writable([]);

    if (frequentLinksSupported) {
        window.chrome?.topSites.get((sites) => {
            set(
                sites.map((site) => ({
                    ...pick(site, ['title', 'url']),
                    icon: `https://s2.googleusercontent.com/s2/favicons?domain_url=${site.url}`,
                })),
            );
        });
    }

    return { subscribe, set, update };
}

export const frequentLinksSupported = typeof window.chrome?.topSites?.get === 'function';
export const frequentLinks = createStore();

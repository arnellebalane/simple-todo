import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import FrequentLinks from './FrequentLinks.svelte';

import quickLinks from '@cypress/fixtures/quicklinks.json';

describe('FrequentLinks', () => {
    it('displays the links provided in the links prop', () => {
        render(FrequentLinks, {
            props: {
                links: quickLinks,
            },
        });

        const links = screen.getAllByRole('link');
        expect(links).toHaveLength(quickLinks.length);

        quickLinks.forEach((quickLink, i) => {
            const link = links[i];
            expect(link).toHaveAttribute('href', quickLink.url);
            expect(link).toHaveAttribute('data-tooltip', quickLink.title);
        });
    });
});

import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import QuickLinks from './QuickLinks.svelte';

import quickLinks from '@cypress/fixtures/quicklinks.json';

describe('QuickLinks', () => {
    it('displays the links provided in the links prop', () => {
        render(QuickLinks, {
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

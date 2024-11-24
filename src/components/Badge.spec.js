import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import Badge from './Badge.svelte';

describe('Badge', () => {
    it('renders as li when variant=li', () => {
        const { container } = render(Badge, {
            props: {
                variant: 'li',
                'data-testid': 'badge',
            },
        });

        expect(container.querySelector('li[data-testid="badge"]')).toBeTruthy();
        expect(container.querySelector('li[data-testid="badge"] span')).toBeFalsy();
    });

    it('renders as span when variant=span', () => {
        const { container } = render(Badge, {
            props: {
                variant: 'span',
                'data-testid': 'badge',
            },
        });

        expect(container.querySelector('span[data-testid="badge"]')).toBeTruthy();
        expect(container.querySelector('span[data-testid="badge"] span')).toBeFalsy();
    });

    it('renders icon slot when icon=true', () => {
        const { container } = render(Badge, {
            props: {
                variant: 'span',
                icon: () => {
                    /* placeholder icon render function*/
                },
                'data-testid': 'badge',
            },
        });

        expect(container.querySelector('span[data-testid="badge"] span')).toBeTruthy();
    });
});

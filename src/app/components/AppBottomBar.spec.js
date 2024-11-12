import { render, screen } from '@testing-library/svelte';
import { beforeEach, describe, expect, it } from 'vitest';

import AppBottomBar from './AppBottomBar.svelte';

import backgroundImage from '@cypress/fixtures/unsplash-image.json';
import { settings } from '@features/settings/store';

describe('AppBottomBar', () => {
    beforeEach(() => {
        settings.set({});
    });

    it('hides unsplash attribution if not using an unsplash background image', () => {
        settings.set({ backgroundImage: null });

        render(AppBottomBar);

        expect(screen.queryByTestId('unsplash-attribution')).not.toBeInTheDocument();
    });

    it('displays unsplash attribution if using an unsplash background image', () => {
        const attribution = `Photo by ${backgroundImage.user_name} on Unsplash`;
        settings.set({ backgroundImage });

        render(AppBottomBar);

        expect(screen.queryByTestId('unsplash-attribution')).toBeInTheDocument();
        expect(screen.queryByTestId('unsplash-attribution')).toHaveTextContent(attribution);
    });
});

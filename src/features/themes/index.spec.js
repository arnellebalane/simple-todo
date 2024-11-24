import { describe, expect, it } from 'vitest';

import { settings } from '@features/settings/store';
import { COLOR_PURPLE, THEME_DARK } from '@features/themes/constants';

import { initializeThemes } from '.';

describe('initializeThemes', () => {
    it('sets theme and color settings as data-attributes on the body element', () => {
        initializeThemes();

        settings.set({
            theme: THEME_DARK,
            color: COLOR_PURPLE,
        });

        expect(document.body).toHaveAttribute('data-theme', THEME_DARK);
        expect(document.body).toHaveAttribute('data-color', COLOR_PURPLE);
    });
});

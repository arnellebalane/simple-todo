import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import ColorChoiceField from './ColorChoiceField.svelte';

import { COLOR_GREEN } from '../constants';

const choice = {
    value: COLOR_GREEN,
};

describe('ColorChoiceField', () => {
    it('does not add the selected class when selected prop is false', () => {
        render(ColorChoiceField, {
            props: { choice },
        });

        expect(document.querySelector('p')).not.toHaveClass('selected');
    });

    it('adds the selected class when selected prop is true', () => {
        render(ColorChoiceField, {
            props: {
                choice,
                selected: true,
            },
        });

        expect(document.querySelector('p')).toHaveClass('selected');
    });
});

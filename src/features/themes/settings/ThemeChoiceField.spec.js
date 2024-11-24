import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import ThemeChoiceField from './ThemeChoiceField.svelte';

import { THEME_SYSTEM } from '../constants';

const choice = {
    label: 'System',
    value: THEME_SYSTEM,
};

describe('ThemeChoiceField', () => {
    it('displays the choice label', () => {
        render(ThemeChoiceField, {
            props: { choice },
        });

        expect(screen.getByText(choice.label)).toBeInTheDocument();
    });

    it('does not add the selected class when selected prop is false', () => {
        render(ThemeChoiceField, {
            props: { choice },
        });

        expect(screen.getByText(choice.label)).not.toHaveClass('selected');
    });

    it('adds the selected class when selected prop is true', () => {
        render(ThemeChoiceField, {
            props: {
                choice,
                selected: true,
            },
        });

        expect(screen.getByText(choice.label)).toHaveClass('selected');
    });
});

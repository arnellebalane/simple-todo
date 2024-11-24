import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import DateDisplayChoiceField from './DateDisplayChoiceField.svelte';

const choice = {
    label: 'Label text',
    subtext: 'This is the subtext',
};

describe('DateDisplayChoiceField', () => {
    it('displays the choice label and subtext', () => {
        render(DateDisplayChoiceField, {
            props: { choice },
        });

        expect(screen.getByText(choice.label));
        expect(screen.getByText(choice.subtext));
    });

    it('does not add the selected class when selected prop is false', () => {
        render(DateDisplayChoiceField, {
            props: { choice },
        });

        expect(screen.getByText(choice.label)).not.toHaveClass('selected');
    });

    it('adds the selected class when selected prop is true', () => {
        render(DateDisplayChoiceField, {
            props: {
                choice,
                selected: true,
            },
        });

        expect(screen.getByText(choice.label)).toHaveClass('selected');
    });
});

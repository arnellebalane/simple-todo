import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import SourceChoiceField from './SourceChoiceField.svelte';

const choice = {
    label: 'Label text',
    subtext: 'This is the subtext',
};

describe('SourceChoiceField', () => {
    it('displays the choice label and subtext', () => {
        render(SourceChoiceField, {
            props: { choice },
        });

        expect(screen.getByText(choice.label)).toBeInTheDocument();
        expect(screen.getByText(choice.subtext)).toBeInTheDocument();
    });

    it('does not add the selected class when selected prop is false', () => {
        render(SourceChoiceField, {
            props: { choice },
        });

        expect(screen.getByText(choice.label)).not.toHaveClass('selected');
    });

    it('adds the selected class when selected prop is true', () => {
        render(SourceChoiceField, {
            props: {
                choice,
                selected: true,
            },
        });

        expect(screen.getByText(choice.label)).toHaveClass('selected');
    });
});

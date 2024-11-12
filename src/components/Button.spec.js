import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Button from './Button.svelte';

describe('Button', () => {
    const supportedClasses = ['primary', 'text', 'medium', 'small'];

    for (const supportedClass of supportedClasses) {
        it(`omits ${supportedClass} class when ${supportedClass} prop is false`, () => {
            render(Button, {
                props: {
                    [supportedClass]: false,
                },
            });

            expect(screen.getByRole('button')).not.toHaveClass(supportedClass);
        });

        it(`includes ${supportedClass} class when ${supportedClass} prop is true`, () => {
            render(Button, {
                props: {
                    [supportedClass]: true,
                },
            });

            expect(screen.getByRole('button')).toHaveClass(supportedClass);
        });
    }

    it('calls "onClick" when clicked', async () => {
        const onClick = vi.fn();

        render(Button, {
            props: { onClick },
        });
        await userEvent.click(screen.getByRole('button'));

        expect(onClick).toHaveBeenCalled();
    });
});

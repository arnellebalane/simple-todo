import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import omit from 'lodash/omit';
import { describe, expect, it, vi } from 'vitest';

import QuickLinksField from './QuickLinksField.svelte';

import { confirmation } from '@app/stores/confirmation';
import quickLinks from '@cypress/fixtures/quicklinks.json';
import { BUILTIN_QUICK_LINKS } from '../constants';

describe('QuickLinksField', () => {
    it('displays choices prop items in default links section', () => {
        render(QuickLinksField, {
            props: {
                choices: BUILTIN_QUICK_LINKS,
            },
        });

        const links = screen.getAllByTestId('default-link');
        expect(links).toHaveLength(BUILTIN_QUICK_LINKS.length);

        BUILTIN_QUICK_LINKS.forEach((link, i) => {
            expect(links[i]).toHaveTextContent(link.title);
        });
    });

    it('selects choices prop items that are also present in value prop', () => {
        render(QuickLinksField, {
            props: {
                choices: BUILTIN_QUICK_LINKS,
                value: [BUILTIN_QUICK_LINKS[0]],
            },
        });

        const links = screen.getAllByTestId('default-link');
        expect(links[0]).toHaveClass('selected');

        BUILTIN_QUICK_LINKS.slice(1).forEach((link, i) => {
            expect(links[i + 1]).not.toHaveClass('selected');
        });
    });

    it('displays custom links list when there are custom links in the value prop', () => {
        render(QuickLinksField, {
            props: {
                choices: BUILTIN_QUICK_LINKS,
                value: quickLinks,
            },
        });

        expect(screen.getByTestId('custom-urls-list')).toBeInTheDocument();
    });

    it('calls "onChange" when a default link is selected', async () => {
        const onChange = vi.fn();

        render(QuickLinksField, {
            props: {
                choices: BUILTIN_QUICK_LINKS,
                onChange,
            },
        });
        await userEvent.click(screen.getAllByTestId('default-link')[0]);

        expect(onChange).toHaveBeenCalledWith([omit(BUILTIN_QUICK_LINKS[0], ['selected'])]);
    });

    it('calls "onChange" when a default link is unselected', async () => {
        const onChange = vi.fn();

        render(QuickLinksField, {
            props: {
                choices: BUILTIN_QUICK_LINKS,
                value: [BUILTIN_QUICK_LINKS[0]],
                onChange,
            },
        });
        await userEvent.click(screen.getAllByTestId('default-link')[0]);

        expect(onChange).toHaveBeenCalledWith([]);
    });

    it('calls "onChange" when a custom link is added', async () => {
        const onChange = vi.fn();

        render(QuickLinksField, {
            props: {
                choices: BUILTIN_QUICK_LINKS,
                onChange,
            },
        });
        await userEvent.type(screen.getByTestId('custom-url-field-input'), quickLinks[0].url);
        await userEvent.click(screen.getByTestId('custom-url-field-button'));

        expect(onChange).toHaveBeenCalledWith([{ ...quickLinks[0], custom: true }]);
    });

    it('calls "onChange" when a custom link is removed', async () => {
        const onChange = vi.fn();

        render(QuickLinksField, {
            props: {
                choices: BUILTIN_QUICK_LINKS,
                value: quickLinks,
                onChange,
            },
        });
        await userEvent.click(screen.getByTestId('custom-url-item-remove-button'));
        confirmation.confirm();

        await vi.waitFor(() => expect(onChange).toHaveBeenCalledWith(quickLinks.filter((link) => !link.custom)));
    });

    it('displays error when the custom link being added already exists in the value prop', async () => {
        render(QuickLinksField, {
            props: {
                choices: BUILTIN_QUICK_LINKS,
                value: quickLinks,
            },
        });
        await userEvent.type(screen.getByTestId('custom-url-field-input'), quickLinks[0].url);
        await userEvent.click(screen.getByTestId('custom-url-field-button'));

        expect(screen.getByTestId('custom-url-field-error')).toHaveTextContent(
            'Custom link is a duplicate of an existing link.',
        );
    });
});

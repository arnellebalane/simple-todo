import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { component as SearchSettings } from '.';

describe('SearchSettings', () => {
    it('selects text filter switch when data.enableTextFilter is true', () => {
        render(SearchSettings, {
            props: {
                data: {
                    enableTextFilter: true,
                },
            },
        });

        expect(screen.getByTestId('enable-text-filter')).toBeChecked();
    });

    it('deselects text filter switch when data.enableTextFilter is false', () => {
        render(SearchSettings, {
            props: {
                data: {
                    enableTextFilter: false,
                },
            },
        });

        expect(screen.getByTestId('enable-text-filter')).not.toBeChecked();
    });

    it('selects tags filter switch when data.enableTagsFilter is true', () => {
        render(SearchSettings, {
            props: {
                data: {
                    enableTagsFilter: true,
                },
            },
        });

        expect(screen.getByTestId('enable-tags-filter')).toBeChecked();
    });

    it('deselects tags filter switch when data.enableTagsFilter is false', () => {
        render(SearchSettings, {
            props: {
                data: {
                    enableTagsFilter: false,
                },
            },
        });

        expect(screen.getByTestId('enable-tags-filter')).not.toBeChecked();
    });

    it('calls "onChange" when text filter switch is toggled', async () => {
        const onChange = vi.fn();
        const data = {
            enableTextFilter: false,
            enableTagsFilter: false,
        };

        render(SearchSettings, {
            props: {
                data,
                onChange,
            },
        });
        await userEvent.click(screen.getByTestId('enable-text-filter'));

        expect(onChange).toHaveBeenCalledWith({
            enableTextFilter: true,
            enableTagsFilter: false,
        });
    });

    it('calls "onChange" when tags filter switch is toggled', async () => {
        const onChange = vi.fn();
        const data = {
            enableTextFilter: false,
            enableTagsFilter: false,
        };

        render(SearchSettings, {
            props: {
                data,
                onChange,
            },
        });
        await userEvent.click(screen.getByTestId('enable-tags-filter'));

        expect(onChange).toHaveBeenCalledWith({
            enableTextFilter: false,
            enableTagsFilter: true,
        });
    });
});

import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import CustomUrlField from './CustomUrlField.svelte';

import quickLinks from '@cypress/fixtures/quicklinks.json';
import axios from '@lib/axios';

const error = 'This is the error message';
const validQuickLink = 'https://arnellebalane.com';
const invalidQuickLink = 'this-is-not-a-url';

describe('CustomUrlField', () => {
    it('hides error when error prop is empty', () => {
        render(CustomUrlField);

        expect(screen.queryByTestId('custom-url-field-error')).not.toBeInTheDocument();
    });

    it('displays error when error prop is present', () => {
        render(CustomUrlField, {
            props: {
                error,
            },
        });

        expect(screen.getByTestId('custom-url-field-error')).toHaveTextContent(error);
    });

    it('calls "onError" if quick link url is empty when add link button is clicked', async () => {
        const onError = vi.fn();

        render(CustomUrlField, {
            props: { onError },
        });
        await userEvent.click(screen.getByTestId('custom-url-field-button'));

        expect(onError).toHaveBeenCalledWith('Please input a valid URL.');
    });

    it('calls "onError" if given quick link url is invalid when add link button is clicked', async () => {
        const onError = vi.fn();

        render(CustomUrlField, {
            props: { onError },
        });
        await userEvent.type(screen.getByTestId('custom-url-field-input'), invalidQuickLink);
        await userEvent.click(screen.getByTestId('custom-url-field-button'));

        expect(onError).toHaveBeenCalledWith('Please input a valid URL.');
    });

    it.skip('displays error if request to get quick link details fails', async () => {
        vi.mocked(axios.get).mockRejectedValue(new Error('Simulated network error'));
        const onError = vi.fn();

        render(CustomUrlField, {
            props: { onError },
        });
        await userEvent.type(screen.getByTestId('custom-url-field-input'), validQuickLink);
        await userEvent.click(screen.getByTestId('custom-url-field-button'));

        expect(onError).toHaveBeenCalledWith('Failed to fetch quick link data, please try again.');
    });

    it('clears error when typing a value in the url input field', async () => {
        const onError = vi.fn();

        render(CustomUrlField, {
            props: {
                error,
                onError,
            },
        });
        await userEvent.type(screen.getByTestId('custom-url-field-input'), validQuickLink);

        expect(onError).toHaveBeenCalledWith('');
    });

    it('clears input field when request to get quick link details succeeds', async () => {
        render(CustomUrlField);
        await userEvent.type(screen.getByTestId('custom-url-field-input'), validQuickLink);
        await userEvent.click(screen.getByTestId('custom-url-field-button'));

        expect(screen.getByTestId('custom-url-field-input')).toHaveValue('');
    });

    it('calls "onData" with quick link details', async () => {
        const onData = vi.fn();

        render(CustomUrlField, {
            props: { onData },
        });
        await userEvent.type(screen.getByTestId('custom-url-field-input'), validQuickLink);
        await userEvent.click(screen.getByTestId('custom-url-field-button'));

        expect(onData).toHaveBeenCalledWith(quickLinks[0]);
    });
});

import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { TODOS_DATE_ABSOLUTE, TODOS_DATE_RELATIVE } from '../constants';

import { component as TodosSettings } from '.';

describe('TodosSettings', () => {
    it('selects toggles based on data prop', () => {
        const data = {
            openOptionalFields: true,
            moveTodosAutomatically: true,
        };

        render(TodosSettings, {
            props: { data },
        });

        expect(screen.getByTestId('open-optional-fields-toggle')).toBeChecked();
        expect(screen.getByTestId('move-todos-automatically-toggle')).toBeChecked();
    });

    it('deselects toggles based on data prop', () => {
        const data = {
            openOptionalFields: false,
            moveTodosAutomatically: false,
        };

        render(TodosSettings, {
            props: { data },
        });

        expect(screen.queryByTestId('open-optional-fields-toggle')).not.toBeChecked();
        expect(screen.queryByTestId('move-todos-automatically-toggle')).not.toBeChecked();
    });

    it('selects date display format based on data.todoDateDisplay', () => {
        const data = {
            todoDateDisplay: TODOS_DATE_RELATIVE,
        };

        render(TodosSettings, {
            props: { data },
        });

        expect(screen.getByLabelText('Relative')).toBeChecked();
    });

    it('calls "onChange" when openOptionalFields toggle changes', async () => {
        const data = {
            openOptionalFields: true,
        };
        const onChange = vi.fn();

        render(TodosSettings, {
            props: {
                data,
                onChange,
            },
        });
        await userEvent.click(screen.getByTestId('open-optional-fields-toggle'));

        expect(onChange).toHaveBeenCalledWith({
            openOptionalFields: false,
        });
    });

    it('calls "onChange" when moveTodosAutomatically toggle changes', async () => {
        const data = {
            moveTodosAutomatically: true,
        };
        const onChange = vi.fn();

        render(TodosSettings, {
            props: {
                data,
                onChange,
            },
        });
        await userEvent.click(screen.getByTestId('move-todos-automatically-toggle'));

        expect(onChange).toHaveBeenCalledWith({
            moveTodosAutomatically: false,
        });
    });

    it('calls "onChange" when date display format changes', async () => {
        const data = {
            todoDateDisplay: TODOS_DATE_ABSOLUTE,
        };
        const onChange = vi.fn();

        render(TodosSettings, {
            props: {
                data,
                onChange,
            },
        });
        await userEvent.click(screen.getByLabelText('Relative'));

        expect(onChange).toHaveBeenCalledWith({
            todoDateDisplay: TODOS_DATE_RELATIVE,
        });
    });
});

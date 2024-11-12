import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import AppTooltip from './AppTooltip.svelte';

const tooltipMessage = 'This is the tooltip message';

describe('AppTooltip', () => {
    it('displays tooltip when mouse enters an element with data-toooltip', async () => {
        // Add extra element with a `data-tooltip` that will get automatically
        // trigger showing the tooltip when hovered
        const button = document.createElement('button');
        button.dataset.tooltip = tooltipMessage;
        button.dataset.testid = 'tooltip-target';
        document.body.append(button);

        render(AppTooltip);

        await userEvent.hover(screen.getByTestId('tooltip-target'));

        expect(screen.getByTestId('app-tooltip')).toBeInTheDocument();
        expect(screen.getByTestId('app-tooltip')).toBeVisible();
        expect(screen.getByTestId('app-tooltip')).toHaveTextContent(tooltipMessage);

        await userEvent.unhover(screen.getByTestId('tooltip-target'));

        expect(screen.getByTestId('app-tooltip')).not.toBeVisible();
    });
});

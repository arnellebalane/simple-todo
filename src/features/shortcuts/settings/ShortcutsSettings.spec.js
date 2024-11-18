import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import shortcuts from '../shortcuts.json';

import { component as ShortcutsSettings } from '.';

describe('ShortcutsSettings', () => {
    it('renders all supported shortcuts', () => {
        render(ShortcutsSettings);

        for (const { label } of Object.values(shortcuts)) {
            expect(screen.getByText(label)).toBeInTheDocument();
        }
    });
});

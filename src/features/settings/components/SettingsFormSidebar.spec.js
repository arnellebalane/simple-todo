import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import SettingsFormSidebar from './SettingsFormSidebar.svelte';

import { settingsTabs } from '../config';

describe('SettingsFormSidebar', () => {
    it('renders all supported settings tabs', () => {
        render(SettingsFormSidebar);

        for (const { label } of settingsTabs) {
            expect(screen.getByText(label)).toBeInTheDocument();
        }
    });
});

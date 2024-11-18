import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import SettingsFormModal from './SettingsFormModal.svelte';

describe('SettingsFormModal', () => {
    it('hides the modal when show prop is false', () => {
        render(SettingsFormModal);

        expect(screen.queryByTestId('settings-form-modal')).not.toBeInTheDocument();
    });

    it('displays the modal when show prop is true', () => {
        render(SettingsFormModal, {
            props: {
                show: true,
            },
        });

        expect(screen.getByTestId('settings-form-modal')).toBeInTheDocument();
    });
});

import SettingsFormModal from './SettingsFormModal.svelte';

describe('SettingsFormModal', () => {
    it('hides the modal when show prop is false', () => {
        cy.mount(SettingsFormModal);

        cy.get('[data-cy="settings-form-modal"]').should('not.exist');
    });

    it('displays the modal when show prop is true', () => {
        cy.mount(SettingsFormModal, {
            props: {
                show: true,
            },
        });

        cy.get('[data-cy="settings-form-modal"]').should('be.visible');
    });
});

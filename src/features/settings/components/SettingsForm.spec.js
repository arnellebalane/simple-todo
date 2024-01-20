import { COLOR_GREEN, COLOR_YELLOW, THEME_LIGHT, THEME_SYSTEM } from '@features/themes/constants';
import SettingsForm from './SettingsForm.svelte';

describe('SettingsForm', () => {
    beforeEach(() => {
        cy.viewport(800, 800);
    });

    it('dispatches "submit" event when save changes button is clicked', () => {
        const submitSpy = cy.spy();
        const data = {
            theme: THEME_SYSTEM,
            color: COLOR_GREEN,
        };

        cy.mount(SettingsForm, {
            props: {
                data,
            },
        }).then(({ component }) => {
            component.$on('submit', submitSpy);
        });

        cy.get('[data-cy="settings-form-submit"]').click();
        cy.wrap(submitSpy).should('have.been.calledWith', Cypress.sinon.match({ detail: data }));
    });

    it('dispatches "cancel" event when cancel button is clicked', () => {
        const cancelSpy = cy.spy();

        cy.mount(SettingsForm).then(({ component }) => {
            component.$on('cancel', cancelSpy);
        });

        cy.get('[data-cy="settings-form-cancel"]').click();
        cy.wrap(cancelSpy).should('have.been.called');
    });

    it('dispatches "change" event when setings tab content fields has changes', () => {
        const changeSpy = cy.spy();
        const data = {
            theme: THEME_SYSTEM,
            color: COLOR_GREEN,
        };

        cy.mount(SettingsForm, {
            props: {
                data,
            },
        }).then(({ component }) => {
            component.$on('change', changeSpy);
        });

        cy.get(`[data-cy="theme-settings-selector"] input[value="${THEME_LIGHT}"]`).click({ force: true });
        cy.get(`[data-cy="color-settings-selector"] input[value="${COLOR_YELLOW}"]`).click({ force: true });

        cy.wrap(changeSpy).should(
            'have.been.calledWith',
            Cypress.sinon.match({
                detail: {
                    theme: THEME_LIGHT,
                    color: COLOR_YELLOW,
                },
            }),
        );
    });

    it('displays settings form content corresponding to selected settings tab', () => {
        cy.mount(SettingsForm);

        cy.contains('Theme').click();
        cy.get('[data-cy="theme-settings-selector"]').should('exist');

        cy.contains('Background').click();
        cy.get('[data-cy="toggle-background"]').should('exist');
    });
});

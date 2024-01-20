import { component as MiscellaneousSettings } from '.';

describe('MiscellaneousSettings', () => {
    beforeEach(() => {
        cy.viewport(500, 500);
    });

    it('toggles privacy mode switch based on enablePrivacyMode prop value', () => {
        cy.mount(MiscellaneousSettings, {
            props: {
                data: {
                    enablePrivacyMode: true,
                },
            },
        });

        cy.get('[data-cy="enable-privacy-mode-toggle"]').should('be.checked');
    });

    it('dispatches "change" event when privacy mode switch is toggled', () => {
        const changeSpy = cy.spy();
        const data = {
            enablePrivacyMode: false,
        };

        cy.mount(MiscellaneousSettings, {
            props: { data },
        }).then(({ component }) => {
            component.$on('change', changeSpy);
        });

        cy.get('[data-cy="enable-privacy-mode-toggle"]').click({ force: true });
        cy.wrap(changeSpy).should('have.been.called');
    });
});

import { component as QuickLinksSettings, getDefaultSettings } from '.';

describe('QuickLinksSettings', () => {
    beforeEach(() => {
        cy.viewport(500, 500);
    });

    it('dispatches "change" event and updates data when there are changes to the quick links settings', () => {
        const onChange = cy.spy();
        const data = getDefaultSettings();

        cy.mount(QuickLinksSettings, {
            props: { data },
        }).then(({ component }) => {
            component.$on('change', onChange);
        });

        cy.fixture('quicklinks.json').then((quickLinks) => {
            cy.intercept('GET', '**/.netlify/functions/get-quick-link-details**', quickLinks[0]);

            cy.get('[data-cy="custom-url-field-input"]').type(quickLinks[0].url);
            cy.get('[data-cy="custom-url-field-button"]').click();

            cy.wrap(onChange).should('have.been.called');
            cy.wrap(data).should('deep.equal', {
                quickLinks: [{ ...quickLinks[0], custom: true }],
                showFrequentLinks: false,
            });
        });
    });
});

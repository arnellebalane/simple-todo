import { component as SearchSettings } from '.';

describe('SearchSettings', () => {
    beforeEach(() => {
        cy.viewport(500, 500);
    });

    it('selects text filter switch when data.enableTextFilter is true', () => {
        cy.mount(SearchSettings, {
            props: {
                data: {
                    enableTextFilter: true,
                },
            },
        });

        cy.get('[data-testid="enable-text-filter"]').should('be.checked');
    });

    it('deselects text filter switch when data.enableTextFilter is false', () => {
        cy.mount(SearchSettings, {
            props: {
                data: {
                    enableTextFilter: false,
                },
            },
        });

        cy.get('[data-testid="enable-text-filter"]').should('not.be.checked');
    });

    it('selects tags filter switch when data.enableTagsFilter is true', () => {
        cy.mount(SearchSettings, {
            props: {
                data: {
                    enableTagsFilter: true,
                },
            },
        });

        cy.get('[data-testid="enable-tags-filter"]').should('be.checked');
    });

    it('deselects tags filter switch when data.enableTagsFilter is false', () => {
        cy.mount(SearchSettings, {
            props: {
                data: {
                    enableTagsFilter: false,
                },
            },
        });

        cy.get('[data-testid="enable-tags-filter"]').should('not.be.checked');
    });

    it('dispatches "change" event when text filter switch is toggled', () => {
        const onChange = cy.spy();
        const data = {
            enableTextFilter: false,
            enableTagsFilter: false,
        };

        cy.mount(SearchSettings, {
            props: { data },
        }).then(({ component }) => {
            component.$on('change', onChange);
        });

        cy.get('[data-testid="enable-text-filter"]').click({ force: true });

        cy.wrap(onChange).should('have.been.called');
        cy.wrap(data).should('deep.equal', {
            enableTextFilter: true,
            enableTagsFilter: false,
        });
    });

    it('dispatches "change" event when tags filter switch is toggled', () => {
        const onChange = cy.spy();
        const data = {
            enableTextFilter: false,
            enableTagsFilter: false,
        };

        cy.mount(SearchSettings, {
            props: { data },
        }).then(({ component }) => {
            component.$on('change', onChange);
        });

        cy.get('[data-testid="enable-tags-filter"]').click({ force: true });

        cy.wrap(onChange).should('have.been.called');
        cy.wrap(data).should('deep.equal', {
            enableTextFilter: false,
            enableTagsFilter: true,
        });
    });
});

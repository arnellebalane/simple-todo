import AutomaticSourceFieldSet from './AutomaticSourceFieldSet.svelte';
import { BACKGROUND_REFRESH_DAILY, BACKGROUND_REFRESH_WEEKLY, BACKGROUND_SOURCE_AUTOMATIC } from '../constants';

describe('AutomaticSourceFieldSet', () => {
    beforeEach(() => {
        cy.viewport(500, 500);
        cy.intercept('**/.netlify/functions/get-background-image**', {
            fixture: 'unsplash-image.json',
        }).as('getBackgroundImage');
    });

    it('disables refresh button when disabled prop is true', () => {
        cy.mount(AutomaticSourceFieldSet, {
            props: {
                disabled: true,
            },
        });

        cy.get('[data-cy="refresh-background-btn"]').should('be.disabled');
    });

    it('enables refresh button when disabled prop is false', () => {
        cy.mount(AutomaticSourceFieldSet, {
            props: {
                disabled: false,
            },
        });

        cy.get('[data-cy="refresh-background-btn"]').should('be.enabled');
    });

    it('selects refresh frequency selector value based on data prop', () => {
        cy.mount(AutomaticSourceFieldSet, {
            props: {
                data: {
                    backgroundRefreshFrequency: BACKGROUND_REFRESH_WEEKLY,
                },
            },
        });

        const refreshWeekly = `[data-cy="refresh-frequency-selector"] input[value="${BACKGROUND_REFRESH_WEEKLY}"]`;
        cy.get(refreshWeekly).should('be.checked');
    });

    it('loads new background image when data has no backgroundImage', () => {
        cy.mount(AutomaticSourceFieldSet, {
            props: {
                data: {
                    backgroundRefreshFrequency: BACKGROUND_REFRESH_WEEKLY,
                },
            },
        });

        cy.wait('@getBackgroundImage');
    });

    it('dispatches "change" event when refresh frequency value changes', () => {
        cy.fixture('unsplash-image.json').then((backgroundImage) => {
            const onChange = cy.spy();
            const data = {
                backgroundImage,
                backgroundRefreshFrequency: BACKGROUND_REFRESH_WEEKLY,
            };

            cy.mount(AutomaticSourceFieldSet, {
                props: { data },
            }).then(({ component }) => {
                component.$on('change', onChange);
            });

            const refreshDaily = `[data-cy="refresh-frequency-selector"] input[value="${BACKGROUND_REFRESH_DAILY}"]`;
            cy.get(refreshDaily).parent().click();

            cy.wrap(onChange).should('have.been.called');
            cy.wrap(data).should('deep.equal', {
                backgroundImage,
                backgroundRefreshFrequency: BACKGROUND_REFRESH_DAILY,
                backgroundSource: BACKGROUND_SOURCE_AUTOMATIC,
            });
        });
    });

    it('dispatches "change" event when refresh button is clicked after background image is loaded', () => {
        const now = new Date(2023, 0, 1);
        cy.clock(now);

        cy.fixture('unsplash-image.json').then((backgroundImage) => {
            const onChange = cy.spy();
            const data = {
                backgroundRefreshFrequency: BACKGROUND_REFRESH_WEEKLY,
            };

            cy.mount(AutomaticSourceFieldSet, {
                props: { data },
            }).then(({ component }) => {
                component.$on('change', onChange);
            });

            cy.get('[data-cy="refresh-background-btn"]').click();

            cy.wrap(onChange).should('have.been.called');
            cy.wrap(data).should('deep.equal', {
                backgroundImage,
                backgroundImageLastUpdate: now.valueOf(),
                backgroundRefreshFrequency: BACKGROUND_REFRESH_WEEKLY,
                backgroundSource: BACKGROUND_SOURCE_AUTOMATIC,
            });
        });
    });

    it('dispatches "request" event when refresh button is clicked', () => {
        cy.fixture('unsplash-image.json').then((backgroundImage) => {
            const onRequest = cy.spy();

            cy.mount(AutomaticSourceFieldSet, {
                props: {
                    data: {
                        backgroundImage,
                        backgroundRefreshFrequency: BACKGROUND_REFRESH_WEEKLY,
                    },
                },
            }).then(({ component }) => {
                component.$on('request', onRequest);
            });

            cy.get('[data-cy="refresh-background-btn"]').click();
            cy.wrap(onRequest).should('have.been.called');
        });
    });
});

import { changelogs, version } from '@features/changelogs/store';
import WhatsNew from './WhatsNew.svelte';

describe('WhatsNew', () => {
    beforeEach(() => {
        cy.viewport(500, 500);
        cy.fixture('changelogs.json').then((changeLogs) => {
            cy.intercept('GET', '**/.netlify/functions/get-version-changelog**', changeLogs);
            changelogs.set(changeLogs);
            version.set('1.0.0');
        });
    });

    it('displays screens from the changelogs data', () => {
        cy.fixture('changelogs.json').then((changeLogs) => {
            changelogs.set(changeLogs);

            cy.mount(WhatsNew);

            cy.get('[data-cy="changelog-screen"]').should('have.length', changeLogs.length + 1);
        });
    });

    it('hides the previous button when in the first screen', () => {
        cy.mount(WhatsNew);

        cy.get('[data-cy="changelogs-previous-btn"]').should('not.exist');
    });

    it('displays the previous button when not in the first screen', () => {
        cy.mount(WhatsNew);

        cy.get('[data-cy="changelogs-next-btn"]').click();
        cy.get('[data-cy="changelogs-previous-btn"]').should('be.visible');
    });

    it('hides the next button and displays the close button when in the last screen', () => {
        cy.mount(WhatsNew);

        cy.get('[data-cy="changelogs-next-btn"]').click();
        cy.get('[data-cy="changelogs-next-btn"]').click();
        cy.get('[data-cy="changelogs-next-btn"]').click();
        cy.get('[data-cy="changelogs-next-btn"]').should('not.exist');
        cy.get('[data-cy="changelogs-close-btn"]').should('be.visible');
    });

    it('displays the next button and hides the close button when not in the last screen', () => {
        cy.mount(WhatsNew);

        cy.get('[data-cy="changelogs-next-btn"]').should('be.visible');
        cy.get('[data-cy="changelogs-close-btn"]').should('not.exist');
    });

    it('dispatches "close" event when close button is clicked', () => {
        const onClose = cy.spy();

        cy.mount(WhatsNew).then(({ component }) => {
            component.$on('close', onClose);
        });

        cy.get('[data-cy="changelogs-next-btn"]').click();
        cy.get('[data-cy="changelogs-next-btn"]').click();
        cy.get('[data-cy="changelogs-next-btn"]').click();
        cy.get('[data-cy="changelogs-close-btn"]').click();

        cy.wrap(onClose).should('have.been.called');
    });

    it('updates version data if higher that current version when next button is clicked', () => {
        const onSubscribe = cy.spy();
        version.subscribe(onSubscribe);

        cy.mount(WhatsNew);

        cy.get('[data-cy="changelogs-next-btn"]').click();
        cy.wrap(onSubscribe).should('have.been.calledWith', '1.8.1').should('have.been.calledWith', '1.9.0');
    });

    it('does not update version data when lower than current version when next button is clicked', () => {
        const onSubscribe = cy.spy();
        version.set('2.0.0');
        version.subscribe(onSubscribe);

        cy.mount(WhatsNew);

        cy.get('[data-cy="changelogs-next-btn"]').click();
        cy.wrap(onSubscribe).should('not.have.been.calledWith', '1.8.1').should('not.have.been.calledWith', '1.9.0');
    });
});

import pkg from '../../../package.json';

import { setVersionIfHigher, version } from './store';

describe('changelogs store', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/.netlify/functions/get-version-changelog**', []);
    });

    describe('changelogs.setVersionIfHigher', () => {
        it('updates version data when provided a newer version', () => {
            version.set('1.0.0');
            const onSubscribe = cy.spy();

            version.subscribe(onSubscribe);

            setVersionIfHigher(pkg.version);
            cy.wrap(onSubscribe).should('have.been.calledWith', pkg.version);
        });

        it('does not update version data provided an older version', () => {
            version.set('2.0.0');
            const onSubscribe = cy.spy();

            version.subscribe(onSubscribe);

            setVersionIfHigher(pkg.version);
            cy.wrap(onSubscribe).should('not.have.been.calledWith', pkg.version);
        });
    });
});

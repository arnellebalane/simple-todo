import { version, setVersionIfHigher } from './store';
import pkg from '../../../package.json';

describe('changelogs store', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/.netlify/functions/get-version-changelog**', []);
    });

    it('updates version data when setVersionIfHigher is called with a newer version', () => {
        version.set('1.0.0');
        const onSubscribe = cy.spy();

        version.subscribe(onSubscribe);

        setVersionIfHigher(pkg.version);
        cy.wrap(onSubscribe).should('have.been.calledWith', pkg.version);
    });

    it('does not update version data when setVersionIfHigher is called with an older version', () => {
        version.set('2.0.0');
        const onSubscribe = cy.spy();

        version.subscribe(onSubscribe);

        setVersionIfHigher(pkg.version);
        cy.wrap(onSubscribe).should('not.have.been.calledWith', pkg.version);
    });
});

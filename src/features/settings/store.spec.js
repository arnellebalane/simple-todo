import { THEME_SYSTEM } from '@features/themes/constants';
import { STORAGE_KEY_SETTINGS } from '@lib/constants';
import { settings } from './store';

describe('settings store', () => {
    beforeEach(() => {
        settings.set({});
    });

    it('returns preview flag when settings.preview is called', () => {
        const settingsSpy = cy.spy();
        settings.subscribe(settingsSpy);

        const data = {
            theme: THEME_SYSTEM,
        };
        settings.preview(data);

        cy.wrap(settingsSpy).should('have.been.calledWith', { ...data, preview: true });
    });

    it('restores original settings before preview when settings.restore is called', () => {
        const data = {
            theme: THEME_SYSTEM,
        };
        settings.preview(data);

        const settingsSpy = cy.spy();
        settings.subscribe(settingsSpy);

        settings.restore();

        cy.wrap(settingsSpy).should('have.been.calledWith', {});
    });

    it('picks only allowed fields when settings.save is called', () => {
        const settingsSpy = cy.spy();
        settings.subscribe(settingsSpy);

        const data = {
            theme: THEME_SYSTEM,
            unknown: 'UNKNOWN_VALUE',
        };
        settings.save(data);

        cy.wrap(settingsSpy).should('have.been.calledWith', {
            theme: THEME_SYSTEM,
        });
    });

    it('saves settings in localStorage when settings.saveInStorage is called', () => {
        const data = {
            theme: THEME_SYSTEM,
        };
        settings.saveInStorage(data);

        cy.window().then((win) => {
            cy.getAllLocalStorage().then((localStorage) => {
                const storedSettings = localStorage[win.location.origin][STORAGE_KEY_SETTINGS];
                const expectedSettings = JSON.stringify(data);

                cy.wrap(storedSettings).should('equal', expectedSettings);
            });
        });
    });

    it('toggles privacy mode value when settings.togglePrivacyMode is called', () => {
        const data = {
            enablePrivacyMode: false,
        };
        settings.saveInStorage(data);

        const settingsSpy = cy.spy();
        settings.subscribe(settingsSpy);

        settings.togglePrivacyMode();

        cy.wrap(settingsSpy).should('have.been.calledWith', {
            enablePrivacyMode: true,
        });
    });
});

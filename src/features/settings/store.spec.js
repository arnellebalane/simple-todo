import { THEME_SYSTEM } from '@features/themes/constants';
import { STORAGE_KEY_SETTINGS } from '@lib/constants';

import { settings } from './store';

describe('settings store', () => {
    beforeEach(() => {
        settings.set({});
    });

    describe('settings.preview', () => {
        it('returns preview flag', () => {
            const settingsSpy = cy.spy();
            settings.subscribe(settingsSpy);

            const data = {
                theme: THEME_SYSTEM,
            };
            settings.preview(data);

            cy.wrap(settingsSpy).should('have.been.calledWith', { ...data, preview: true });
        });
    });

    describe('settings.restore', () => {
        it('restores original settings before preview', () => {
            const data = {
                theme: THEME_SYSTEM,
            };
            settings.preview(data);

            const settingsSpy = cy.spy();
            settings.subscribe(settingsSpy);

            settings.restore();

            cy.wrap(settingsSpy).should('have.been.calledWith', {});
        });
    });

    describe('settings.save', () => {
        it('picks only allowed fields', () => {
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
    });

    describe('settings.saveInStorage', () => {
        it('saves settings in localStorage', () => {
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
    });

    describe('settings.togglePrivacyMode', () => {
        it('toggles privacy mode value', () => {
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
});

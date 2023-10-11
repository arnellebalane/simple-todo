import { onSave } from '.';

describe('backgrounds settings', () => {
    it('reports unsplash download on save', () => {
        cy.intercept('POST', '**/.netlify/functions/report-unsplash-download**', {}).as('reportUnsplashDownload');

        cy.fixture('unsplash-image.json').then((backgroundImage) => {
            const currentSettings = {};
            const updatedSettings = {
                background: true,
                backgroundImage,
            };

            onSave(currentSettings, updatedSettings);

            cy.wait('@reportUnsplashDownload');
        });
    });
});

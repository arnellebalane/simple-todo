import { settings } from '@features/settings/store';
import './styles.css';
import './themes.css';

async function lazyLoadExternalStyles() {
    const stylesheets = [...document.querySelectorAll('link[media="print"]')];
    await Promise.all(
        stylesheets.map(
            (stylesheet) =>
                new Promise((resolve) => {
                    if ([...document.styleSheets].includes(stylesheet.sheet)) {
                        stylesheet.media = 'all';
                        return resolve();
                    }

                    stylesheet.addEventListener('load', () => {
                        stylesheet.media = 'all';
                        resolve();
                    });
                }),
        ),
    );
    document.body.classList.remove('fonts-loading');
}

export function initializeThemes() {
    lazyLoadExternalStyles();

    settings.subscribe(({ theme, color }) => {
        document.body.dataset.theme = theme;
        document.body.dataset.color = color;
    });
}

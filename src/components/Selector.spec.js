import Selector from './Selector.svelte';

const choices = [
    { label: 'Option 1', value: 'ONE' },
    { label: 'Option 2', value: 'TWO' },
    { label: 'Option 3', value: 'THREE' },
];
const value = 'ONE';
const newValue = 'TWO';

describe('Selector', () => {
    it('displays selection for each item in the choices prop', () => {
        cy.mount(Selector, {
            props: {
                choices,
            },
        });

        cy.get('label').each((element, i) => {
            cy.wrap(element).should('contain.text', choices[i].label);
        });
    });

    it('selects the option specified in the value prop', () => {
        cy.mount(Selector, {
            props: {
                choices,
                value,
            },
        });

        cy.get(`input[value="${value}"]`).should('be.checked');
    });

    it('enables the selection when disabled prop is false', () => {
        cy.mount(Selector, {
            props: {
                choices,
                disabled: false,
            },
        });

        cy.get('input').each((element) => {
            cy.wrap(element).should('be.enabled');
        });
    });

    it('disables the selection when disabled prop is true', () => {
        cy.mount(Selector, {
            props: {
                choices,
                disabled: true,
            },
        });

        cy.get('input').each((element) => {
            cy.wrap(element).should('be.disabled');
        });
    });

    it('dispatches "change" event when selected option changes', () => {
        const onChange = cy.spy();

        cy.mount(Selector, {
            props: {
                choices,
                value,
            },
        }).then(({ component }) => {
            component.$on('change', onChange);
        });

        cy.get(`input[value="${newValue}"]`).parent().click();
        cy.wrap(onChange).should('have.been.called.with', newValue);
    });
});

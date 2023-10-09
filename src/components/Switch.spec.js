import Switch from './Switch.svelte';

describe('Switch', () => {
    it('does not select the checkbox when value prop is false', () => {
        cy.mount(Switch, {
            props: {
                value: false,
            },
        });

        cy.get('input').should('not.be.checked');
    });

    it('selects the checkbox when value prop is true', () => {
        cy.mount(Switch, {
            props: {
                value: true,
            },
        });

        cy.get('input').should('be.checked');
    });

    it('dispatches "change" event when switch is toggled', () => {
        const onChange = cy.spy();

        cy.mount(Switch).then(({ component }) => {
            component.$on('change', onChange);
        });

        cy.get('label').click();
        cy.wrap(onChange).should('have.been.called');
    });
});

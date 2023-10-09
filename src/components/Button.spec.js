import Button from './Button.svelte';

describe('Button', () => {
    const supportedClasses = ['primary', 'text', 'medium', 'small', 'icon'];

    for (const supportedClass of supportedClasses) {
        it(`omits ${supportedClass} class when ${supportedClass} prop is false`, () => {
            cy.mount(Button, {
                props: {
                    [supportedClass]: false,
                },
            });

            cy.get('button').should('not.have.class', supportedClass);
        });

        it(`includes ${supportedClass} class when ${supportedClass} prop is true`, () => {
            cy.mount(Button, {
                props: {
                    [supportedClass]: true,
                },
            });

            cy.get('button').should('have.class', supportedClass);
        });
    }

    it('dispatches "click" event when clicked', () => {
        const onClick = cy.spy();

        cy.mount(Button).then(({ component }) => {
            component.$on('click', onClick);
        });

        cy.get('button').click();
        cy.wrap(onClick).should('have.been.called');
    });
});

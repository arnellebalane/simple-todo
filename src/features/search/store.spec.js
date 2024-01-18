import { search } from './store';

const todos = [
    {
        id: 'fcd18a8a-e057-4993-88bc-0980ef76d1e1',
        body: 'test todo',
        list: 'TODAY',
        order: 1,
        done: false,
        tags: ['test'],
    },
    {
        body: 'another test todo',
        list: 'EVENTUALLY',
        tags: [],
        id: 'ca1addd5-0909-4d26-ab16-f2e126eb2a49',
        order: 1,
        done: false,
        createdAt: 1698482766655,
    },
];

describe('search store', () => {
    beforeEach(() => {
        search.clear();
    });

    it('clears query and tags filters when search.clear is called', () => {
        search.query.set('test');
        search.tag.set('test');

        const querySpy = cy.spy();
        const tagSpy = cy.spy();
        search.query.subscribe(querySpy);
        search.tag.subscribe(tagSpy);

        search.clear();

        cy.wrap(querySpy).should('have.been.calledWith', '');
        cy.wrap(tagSpy).should('have.been.calledWith', null);
    });

    it('filters todos based on query filter when search.filterTodos is called', () => {
        const result = search.filterTodos(todos);
        const resultSpy = cy.spy();
        result.subscribe(resultSpy);

        search.query.set('another');

        cy.wrap(resultSpy).should('have.been.calledWith', [todos[1]]);
    });

    it('filters todos based on tags filter when search.filterTodos is called', () => {
        const result = search.filterTodos(todos);
        const resultSpy = cy.spy();
        result.subscribe(resultSpy);

        search.tag.set('test');

        cy.wrap(resultSpy).should('have.been.calledWith', [todos[0]]);
    });
});

import { STORAGE_KEY_TAGS } from '@lib/constants';
import { todos } from '@features/todos/store';
import { TODOS_TODAY } from '@features/todos/constants';
import { tags } from './store';

describe('tags store', () => {
    beforeEach(() => {
        tags.set({});
    });

    it('adds tag to store when tags.add is called', () => {
        const tagsSpy = cy.spy();
        tags.subscribe(tagsSpy);

        tags.add(['one', 'two']);

        cy.wrap(tagsSpy).should('have.been.calledWith', {
            one: { label: 'one' },
            two: { label: 'two' },
        });
    });

    it('updates tag data when tags.updateTag is called', () => {
        tags.set({
            one: { label: 'one' },
        });

        const tagsSpy = cy.spy();
        tags.subscribe(tagsSpy);

        tags.updateTag('one', { removed: true });

        cy.wrap(tagsSpy).should('have.been.calledWith', {
            one: { label: 'one', removed: true },
        });
    });

    it('saves only tags that are not removed and their allowed fields when tags.save is called', () => {
        tags.set({
            one: { label: 'one', unknown: 'field' },
            two: { label: 'two', removed: true },
        });

        const tagsSpy = cy.spy();
        tags.subscribe(tagsSpy);

        tags.save();

        cy.wrap(tagsSpy).should('have.been.calledWith', {
            one: { label: 'one' },
        });
    });

    it('updates todos to only include tags that are not removed when tags.save is called', () => {
        const todo = {
            id: 1,
            body: 'todo',
            list: TODOS_TODAY,
            order: 1,
            done: false,
            tags: ['one', 'two'],
        };
        todos.set([todo]);

        const todosSpy = cy.spy();
        todos.subscribe(todosSpy);

        tags.set({
            one: { label: 'one' },
            two: { label: 'two', removed: true },
        });
        tags.save();

        cy.wrap(todosSpy).should('have.been.calledWith', [{ ...todo, tags: ['one'] }]);
    });

    it('saves data in localStorage when tags.saveInStorage is called', () => {
        const data = {
            one: { label: 'one' },
        };
        tags.saveInStorage(data);

        cy.window().then((win) => {
            cy.getAllLocalStorage().then((localStorage) => {
                const storedTags = localStorage[win.location.origin][STORAGE_KEY_TAGS];
                const expectedTags = JSON.stringify(data);

                cy.wrap(storedTags).should('equal', expectedTags);
            });
        });
    });
});

import { linkify } from './linkify';

describe('linkify', () => {
    it('converts urls in text into links', () => {
        const input = 'hello https://simple-todo.arnelle.dev world';
        const expected = 'hello <a href="https://simple-todo.arnelle.dev">https://simple-todo.arnelle.dev</a> world';
        const result = linkify(input);

        expect(result).to.equal(expected);
    });
});

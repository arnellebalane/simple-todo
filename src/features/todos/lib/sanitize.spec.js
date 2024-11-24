import { describe, expect, it } from 'vitest';

import { escapeText, sanitizeText, unescapeText, unsanitizeText } from './sanitize';

describe('sanitizeText', () => {
    it('turns div contents into multiple lines', () => {
        const input = '<div>hello</div><div>world</div>';
        const expected = 'hello\nworld';
        const result = sanitizeText(input);

        expect(result).to.equal(expected);
    });

    it('removes tags and non-breaking spaces', () => {
        const input = '<strong>hello&nbsp;world</strong>';
        const expected = 'helloworld';
        const result = sanitizeText(input);

        expect(result).to.equal(expected);
    });
});

describe('unsanitizeText', () => {
    it('wraps lines inside div elements', () => {
        const input = 'hello\nworld';
        const expected = 'hello<div>world</div>';
        const result = unsanitizeText(input);

        expect(result).to.equal(expected);
    });

    it('turns extra newlines into <br> elements', () => {
        const input = 'hello\n\nworld';
        const expected = 'hello<div><br></div><div>world</div>';
        const result = unsanitizeText(input);

        expect(result).to.equal(expected);
    });
});

describe('escapeText', () => {
    it('converts actual characters into escaped characters', () => {
        const input = '&<>"\'';
        const expected = '&amp;&lt;&gt;&quot;&#39;';
        const result = escapeText(input);

        expect(result).to.equal(expected);
    });
});

describe('unescapeText', () => {
    it('converts escaped characters into actual characters', () => {
        const input = '&amp;&lt;&gt;&quot;&#39;';
        const expected = '&<>"\'';
        const result = unescapeText(input);

        expect(result).to.equal(expected);
    });
});

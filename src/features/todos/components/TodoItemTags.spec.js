import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import TodoItemTags from './TodoItemTags.svelte';

describe('TodoItemTags', () => {
    it('displays the provided list of tags', () => {
        const tags = ['one', 'two', 'three'];

        render(TodoItemTags, {
            props: { tags },
        });

        for (const tag of tags) {
            expect(screen.getByText(tag)).toBeInTheDocument();
        }
    });
});

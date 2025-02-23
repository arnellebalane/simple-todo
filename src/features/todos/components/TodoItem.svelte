<script>
import { SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';

import Checkbox from '@components/Checkbox.svelte';
import TodoItemDate from './TodoItemDate.svelte';
import TodoItemMenu from './TodoItemMenu.svelte';
import TodoItemTags from './TodoItemTags.svelte';

import { settings } from '@features/settings/store';
import { linkify } from '../lib/linkify';
import { escapeText } from '../lib/sanitize';

let { todo, class: componentClass, onChange, onEdit, onDelete } = $props();

const hasTags = $derived((todo.tags?.length ?? 0) > 0);
const hasDate = $derived(Boolean(todo.date));
const hasBadges = $derived(hasTags || hasDate);
const todoBody = $derived(linkify(escapeText(todo.body)));

const toggleTodoDone = (done) => onChange?.({ id: todo.id, done });
</script>

<li
    class={componentClass}
    class:done={todo.done}
    class:private={$settings.enablePrivacyMode}
    ondblclick={onEdit}
    data-testid="todo-item"
>
    <Checkbox checked={todo.done} onChange={toggleTodoDone} data-testid="todo-item-done" />
    <div class="TodoDetails" data-testid="todo-item-details">
        <p><span>{@html todoBody}</span></p>

        {#if hasBadges}
            <ol class="TodoBadges">
                {#if hasDate}
                    <TodoItemDate date={todo.date} />
                {/if}
                {#if hasTags}
                    <TodoItemTags tags={todo.tags} />
                {/if}
            </ol>
        {/if}
    </div>
    <TodoItemMenu class="TodoItemMenu" {onEdit} {onDelete} />

    {#if todo[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
        <div class="TodoItemShadow" data-testid="todo-item-shadow"></div>
    {/if}
</li>

<style>
li {
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: 1.6rem;

    padding: 1.6rem;
    border-radius: 8px;
    background-color: var(--main);
    box-shadow:
        rgba(0, 0, 0, 0) 0px 0px 0px 0px,
        rgba(0, 0, 0, 0) 0px 0px 0px 0px,
        rgba(0, 0, 0, 0.05) 0px 4px 6px -1px,
        rgba(0, 0, 0, 0.01) 0px 2px 4px -1px;
}

li.done {
    opacity: 0.6;
}

li.private {
    pointer-events: none;
}

li.private > :global(*) {
    opacity: 0;
}

@supports (filter: blur(1px)) {
    li.private > :global(*) {
        opacity: initial;
        filter: blur(1rem);
    }
}

p {
    flex-grow: 1;
    line-height: 2rem;
    word-break: break-word;
}

p span {
    white-space: pre-line;
}

li.done p {
    text-decoration: line-through;
    color: var(--dimmed-400);
}

.TodoBadges {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    padding: 0;
    margin-top: 1.6rem;
    list-style: none;
}

.TodoItemShadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px dashed var(--dimmed-300);
    border-radius: 8px;
    background-color: var(--dimmed-200);
    visibility: visible;
}

li :global(.TodoItemMenu) {
    position: absolute;
    top: 1px;
    right: 1px;
    height: calc(100% - 2px);
}

li:not(:hover) :global(.TodoItemMenu) {
    display: none;
}
</style>

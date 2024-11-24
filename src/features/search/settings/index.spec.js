import { beforeEach, describe, expect, it, vi } from 'vitest';

import { search } from '../store';

import { onSave } from '.';

describe('search settings', () => {
    beforeEach(() => {
        // Setting an initial value to the search filters so that when it is cleared the change is properly propagated
        // to the subscribers.
        search.query.set('test');
        search.tag.set('test');
    });

    it('clears search filters when enableTextFilter setting is changed', () => {
        const querySpy = vi.fn();
        search.query.subscribe(querySpy);

        const settings = { enableTextFilter: false, enableTagsFilter: false };
        const updated = { enableTextFilter: true, enableTagsFilter: false };
        onSave(settings, updated);

        expect(querySpy).toHaveBeenCalledWith('');
    });

    it('clears search filters when enableTagsFilter setting is changed', () => {
        const querySpy = vi.fn();
        search.query.subscribe(querySpy);

        const settings = { enableTextFilter: false, enableTagsFilter: false };
        const updated = { enableTextFilter: false, enableTagsFilter: true };
        onSave(settings, updated);

        expect(querySpy).toHaveBeenCalledWith('');
    });

    it('does not clear filters when enableTextFilter and enableTagsFilter settings did not change', () => {
        const querySpy = vi.fn();
        search.query.subscribe(querySpy);

        const settings = { enableTextFilter: false, enableTagsFilter: false };
        const updated = { enableTextFilter: false, enableTagsFilter: false };
        onSave(settings, updated);

        expect(querySpy).not.toHaveBeenCalledWith('');
    });
});

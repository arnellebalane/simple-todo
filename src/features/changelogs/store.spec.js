import { describe, expect, it, vi } from 'vitest';

import pkg from '../../../package.json';

import { setVersionIfHigher, version } from './store';

describe('changelogs store', () => {
    describe('changelogs.setVersionIfHigher', () => {
        it('updates version data when provided a newer version', () => {
            version.set('1.0.0');
            const onSubscribe = vi.fn();

            version.subscribe(onSubscribe);
            setVersionIfHigher(pkg.version);

            expect(onSubscribe).toHaveBeenCalledWith(pkg.version);
        });

        it('does not update version data provided an older version', () => {
            version.set('2.0.0');
            const onSubscribe = vi.fn();

            version.subscribe(onSubscribe);
            setVersionIfHigher(pkg.version);

            expect(onSubscribe).not.toHaveBeenCalledWith(pkg.version);
        });
    });
});

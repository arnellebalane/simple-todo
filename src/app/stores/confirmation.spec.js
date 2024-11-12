import { describe, expect, it, vi } from 'vitest';

import { confirmation } from '@app/stores/confirmation';

const message = 'Confirmation message';
const confirmLabel = 'Custom confirm';
const cancelLabel = 'Custom cancel';

describe('confirmation store', () => {
    it('sets confirmation state when confirmation.show is called', () => {
        const subscribe = vi.fn();
        confirmation.subscribe(subscribe);

        confirmation.show({ message, confirmLabel, cancelLabel });

        expect(subscribe).toHaveBeenCalledWith({ message, confirmLabel, cancelLabel });
    });

    it('resolves confirmation to true when confirmation.confirm is called', async () => {
        const promise = confirmation.show();
        confirmation.confirm();

        expect(await promise).toEqual(true);
    });

    it('resolves confirmation to false when confirmation.cancel is called', async () => {
        const promise = confirmation.show();
        confirmation.cancel();

        expect(await promise).toEqual(false);
    });
});
